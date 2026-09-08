from pydantic import BaseModel
from typing import List


class DiagnosticAnswer(BaseModel):
    question_number: int
    selected_answer: str


class DiagnosticSubmitRequest(BaseModel):
    student_id: int
    answers: List[DiagnosticAnswer]