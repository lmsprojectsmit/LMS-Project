from sqlalchemy import Column, Integer, String, JSON
from config.database import Base

class MicroUnit(Base):
    __tablename__ = "micro_units"

    id = Column(Integer, primary_key=True, index=True)
    unit_code = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    learning_objectives = Column(JSON, default=list)

