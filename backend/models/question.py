from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from config.database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    micro_unit_id = Column(Integer, ForeignKey("micro_units.id"), nullable=False)
    question_text = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    explanation = Column(String)
    hint = Column(String)
    difficulty = Column(String, nullable=False)
    bloom_level = Column(String)
    co_mapping = Column(String)
    error_mappings = Column(JSON, default=dict)

