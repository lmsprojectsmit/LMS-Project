from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from config.database import get_db
from models.micro_unit import MicroUnit
from models.learning_resource import LearningResource
from models.question import Question
from models.prerequisite import Prerequisite
from schemas.learning import MicroUnitSchema, LearningResourceSchema, QuestionSchema, QuestionDetailSchema

router = APIRouter(prefix="/api/micro-units", tags=["micro-units"])

@router.get("/{unit_code}", response_model=MicroUnitSchema)
def get_micro_unit(unit_code: str, db: Session = Depends(get_db)):
    unit = db.query(MicroUnit).filter(MicroUnit.unit_code == unit_code).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Micro unit not found")
    return unit

@router.get("/{unit_code}/resources", response_model=List[LearningResourceSchema])
def get_resources(unit_code: str, db: Session = Depends(get_db)):
    unit = db.query(MicroUnit).filter(MicroUnit.unit_code == unit_code).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Micro unit not found")
    resources = db.query(LearningResource).filter(LearningResource.micro_unit_id == unit.id).all()
    return resources

@router.get("/{unit_code}/questions", response_model=List[QuestionSchema])
def get_questions(unit_code: str, difficulty: Optional[str] = None, db: Session = Depends(get_db)):
    unit = db.query(MicroUnit).filter(MicroUnit.unit_code == unit_code).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Micro unit not found")
    
    query = db.query(Question).filter(Question.micro_unit_id == unit.id)
    if difficulty:
        query = query.filter(Question.difficulty == difficulty)
        
    questions = query.all()
    return questions

@router.get("/{unit_code}/prerequisites")
def get_prerequisites(unit_code: str, db: Session = Depends(get_db)):
    unit = db.query(MicroUnit).filter(MicroUnit.unit_code == unit_code).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Micro unit not found")
    
    prereqs = db.query(Prerequisite).filter(Prerequisite.micro_unit_id == unit.id).all()
    result = []
    for p in prereqs:
        req_unit = db.query(MicroUnit).filter(MicroUnit.id == p.required_micro_unit_id).first()
        if req_unit:
            result.append({"unit_code": req_unit.unit_code, "title": req_unit.title})
    return result

@router.get("/{unit_code}/activity")
def get_activity(unit_code: str, db: Session = Depends(get_db)):
    # Placeholder for activity if needed
    return {"status": "available", "activities": ["Watch Video", "Practice MCQs"]}

