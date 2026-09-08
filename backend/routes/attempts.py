from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any

from config.database import get_db
from models.attempt import Attempt
from models.response import Response
from models.question import Question
from models.micro_unit import MicroUnit
from models.mastery import Mastery
from schemas.learning import ResponseCreate

router = APIRouter(prefix="/api/attempts", tags=["attempts"])

@router.post("/micro-units/{unit_code}/attempts")
def create_attempt(unit_code: str, student_id: int, db: Session = Depends(get_db)):
    unit = db.query(MicroUnit).filter(MicroUnit.unit_code == unit_code).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Micro unit not found")
        
    attempt = Attempt(
        student_id=student_id,
        micro_unit_id=unit.id,
        score=0.0,
        percentage=0.0,
        is_completed=False
    )
    db.add(attempt)
    db.commit()
    db.refresh(attempt)
    return {"attempt_id": attempt.id, "status": "started"}

@router.post("/{attempt_id}/responses")
def submit_response(attempt_id: int, response_data: ResponseCreate, db: Session = Depends(get_db)):
    attempt = db.query(Attempt).filter(Attempt.id == attempt_id).first()
    if not attempt or attempt.is_completed:
        raise HTTPException(status_code=400, detail="Invalid or completed attempt")
        
    question = db.query(Question).filter(Question.id == response_data.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
        
    is_correct = (response_data.selected_answer == question.correct_answer)
    
    error_type = None
    if not is_correct:
        if question.error_mappings and response_data.selected_answer in question.error_mappings:
            error_type = question.error_mappings[response_data.selected_answer]
        else:
            error_type = "GENERAL_ERROR"
            
    resp = Response(
        attempt_id=attempt.id,
        question_id=question.id,
        selected_answer=response_data.selected_answer,
        is_correct=is_correct,
        error_type=error_type,
        time_seconds=response_data.time_seconds,
        hint_used=response_data.hint_used
    )
    db.add(resp)
    db.commit()
    
    return {
        "is_correct": is_correct,
        "correct_answer": question.correct_answer,
        "explanation": question.explanation,
        "error_type": error_type
    }

@router.post("/{attempt_id}/complete")
def complete_attempt(attempt_id: int, db: Session = Depends(get_db)):
    attempt = db.query(Attempt).filter(Attempt.id == attempt_id).first()
    if not attempt or attempt.is_completed:
        raise HTTPException(status_code=400, detail="Invalid or completed attempt")
        
    responses = db.query(Response).filter(Response.attempt_id == attempt.id).all()
    total = len(responses)
    correct = sum(1 for r in responses if r.is_correct)
    
    score = float(correct)
    percentage = (score / total * 100.0) if total > 0 else 0.0
    
    attempt.score = score
    attempt.percentage = percentage
    attempt.is_completed = True
    attempt.completed_at = datetime.utcnow()
    db.commit()
    
    # Update mastery
    mastery = db.query(Mastery).filter(
        Mastery.student_id == attempt.student_id,
        Mastery.micro_unit_id == attempt.micro_unit_id
    ).first()
    
    if not mastery:
        mastery = Mastery(
            student_id=attempt.student_id,
            micro_unit_id=attempt.micro_unit_id,
            mastery_score=percentage,
            attempts_count=1
        )
        db.add(mastery)
    else:
        mastery.attempts_count += 1
        # Update mastery score if higher (or moving average, depending on rules. We'll use max for now)
        if percentage > mastery.mastery_score:
            mastery.mastery_score = percentage
            
    if mastery.mastery_score >= 80.0:
        mastery.mastery_status = "Mastered"
        mastery.remediation_required = False
    else:
        mastery.mastery_status = "Remediation Required"
        mastery.remediation_required = True
        
    db.commit()
    db.refresh(mastery)
    
    return {
        "attempt_id": attempt.id,
        "score": score,
        "percentage": percentage,
        "mastery_status": mastery.mastery_status,
        "remediation_required": mastery.remediation_required
    }

