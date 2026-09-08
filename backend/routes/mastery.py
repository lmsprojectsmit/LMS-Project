from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from config.database import get_db
from models.mastery import Mastery
from models.micro_unit import MicroUnit
from schemas.learning import MasterySchema

router = APIRouter(prefix="/api/students", tags=["students"])

@router.get("/me/mastery", response_model=List[MasterySchema])
def get_student_mastery(student_id: int = Query(...), db: Session = Depends(get_db)):
    # Assuming student_id is passed as query param since auth is mocked
    mastery_records = db.query(Mastery).filter(Mastery.student_id == student_id).all()
    return mastery_records

@router.get("/me/remediation/{unit_code}")
def get_remediation_info(unit_code: str, student_id: int = Query(...), db: Session = Depends(get_db)):
    unit = db.query(MicroUnit).filter(MicroUnit.unit_code == unit_code).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Micro unit not found")
        
    mastery = db.query(Mastery).filter(
        Mastery.student_id == student_id,
        Mastery.micro_unit_id == unit.id
    ).first()
    
    if not mastery or not mastery.remediation_required:
        return {"remediation_needed": False, "message": "No remediation required."}
        
    return {
        "remediation_needed": True,
        "message": "You scored below 80%. Please review the reference video and try again.",
        "recommended_action": "Review U1-M01 Learning Resources",
        "mastery_score": mastery.mastery_score
    }

