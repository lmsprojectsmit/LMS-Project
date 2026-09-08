from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from config.database import Base

class Mastery(Base):
    __tablename__ = "mastery"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    micro_unit_id = Column(Integer, ForeignKey("micro_units.id"), nullable=False)
    mastery_score = Column(Float, default=0.0)
    mastery_status = Column(String, default="Not Attempted")
    attempts_count = Column(Integer, default=0)
    remediation_required = Column(Boolean, default=False)
    last_attempt_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

