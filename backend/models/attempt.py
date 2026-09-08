from sqlalchemy import Column, Integer, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from config.database import Base

class Attempt(Base):
    __tablename__ = "attempts"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    micro_unit_id = Column(Integer, ForeignKey("micro_units.id"), nullable=False)
    score = Column(Float, default=0.0)
    percentage = Column(Float, default=0.0)
    is_completed = Column(Boolean, default=False)
    started_at = Column(DateTime, server_default=func.now())
    completed_at = Column(DateTime)

