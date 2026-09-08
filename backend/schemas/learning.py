from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class LearningResourceSchema(BaseModel):
    id: int
    type: str
    url: str
    title: str

    class Config:
        orm_mode = True

class MicroUnitSchema(BaseModel):
    id: int
    unit_code: str
    title: str
    description: Optional[str] = None
    learning_objectives: List[str] = []

    class Config:
        orm_mode = True

class QuestionSchema(BaseModel):
    id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    difficulty: str
    bloom_level: Optional[str] = None
    co_mapping: Optional[str] = None
    
    class Config:
        orm_mode = True

class QuestionDetailSchema(QuestionSchema):
    correct_answer: str
    explanation: Optional[str] = None
    hint: Optional[str] = None
    error_mappings: Dict[str, str] = {}

class ResponseCreate(BaseModel):
    question_id: int
    selected_answer: str
    time_seconds: Optional[int] = None
    hint_used: Optional[bool] = False

class AttemptComplete(BaseModel):
    pass

class MasterySchema(BaseModel):
    micro_unit_id: int
    mastery_score: float
    mastery_status: str
    attempts_count: int
    remediation_required: bool
    last_attempt_at: Optional[datetime] = None

    class Config:
        orm_mode = True

