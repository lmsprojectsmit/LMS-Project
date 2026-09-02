from sqlalchemy import Column, Integer, String, Text

from config.database import Base


class DiagnosticQuestion(Base):
    __tablename__ = "diagnostic_questions"

    id = Column(Integer, primary_key=True, index=True)

    question_number = Column(Integer, unique=True, nullable=False)

    question_text = Column(Text, nullable=False)

    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    option_d = Column(Text, nullable=False)

    correct_answer = Column(String(1), nullable=False)

    topic = Column(String(100), nullable=False)

    difficulty = Column(String(20), nullable=False, default="Medium")