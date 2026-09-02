from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from config.database import Base


class DiagnosticResponse(Base):
    __tablename__ = "diagnostic_responses"

    id = Column(Integer, primary_key=True, index=True)

    attempt_id = Column(
        Integer,
        ForeignKey("diagnostic_attempts.id"),
        nullable=False,
    )

    question_id = Column(
        Integer,
        ForeignKey("diagnostic_questions.id"),
        nullable=False,
    )

    selected_answer = Column(String(1), nullable=False)

    is_correct = Column(Boolean, nullable=False, default=False)