from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db

from models.diagnostic_question import DiagnosticQuestion
from models.diagnostic_attempt import DiagnosticAttempt
from models.diagnostic_response import DiagnosticResponse

from schemas.diagnostic import DiagnosticSubmitRequest
from services.diagnostic_service import submit_diagnostic as process_diagnostic_submission


router = APIRouter(
    prefix="/api/diagnostic",
    tags=["Diagnostic"],
)


# ============================================================
# GET ALL DIAGNOSTIC QUESTIONS
# ============================================================

@router.get("/questions")
def get_diagnostic_questions(
    db: Session = Depends(get_db),
):
    """
    Return all diagnostic questions.

    Important:
    The correct answer is NOT returned to the frontend.
    """

    questions = (
        db.query(DiagnosticQuestion)
        .order_by(DiagnosticQuestion.question_number)
        .all()
    )

    return [
        {
            "question_number": question.question_number,
            "question_text": question.question_text,
            "options": {
                "A": question.option_a,
                "B": question.option_b,
                "C": question.option_c,
                "D": question.option_d,
            },
            "topic": question.topic,
            "difficulty": question.difficulty,
        }
        for question in questions
    ]


# ============================================================
# SUBMIT DIAGNOSTIC TEST
# ============================================================

@router.post("/submit")
def submit_diagnostic(
    request: DiagnosticSubmitRequest,
    db: Session = Depends(get_db),
):
    """
    Submit a student's diagnostic answers using the dedicated service.
    """
    try:
        result = process_diagnostic_submission(
            db=db,
            student_id=request.student_id,
            submitted_answers=request.answers
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))