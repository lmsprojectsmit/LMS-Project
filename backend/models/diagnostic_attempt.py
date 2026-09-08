from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.sql import func

from config.database import Base


class DiagnosticAttempt(Base):
    __tablename__ = "diagnostic_attempts"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, nullable=False)

    total_questions = Column(Integer, nullable=False, default=30)

    correct_answers = Column(Integer, nullable=False, default=0)

    score = Column(Float, nullable=False, default=0.0)

    percentage = Column(Float, nullable=False, default=0.0)

    completed_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False,
    )