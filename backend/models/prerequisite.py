from sqlalchemy import Column, Integer, ForeignKey
from config.database import Base

class Prerequisite(Base):
    __tablename__ = "prerequisites"

    id = Column(Integer, primary_key=True, index=True)
    micro_unit_id = Column(Integer, ForeignKey("micro_units.id"), nullable=False)
    required_micro_unit_id = Column(Integer, ForeignKey("micro_units.id"), nullable=False)

