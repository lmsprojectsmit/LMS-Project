from sqlalchemy import Column, Integer, String, ForeignKey
from config.database import Base

class LearningResource(Base):
    __tablename__ = "learning_resources"

    id = Column(Integer, primary_key=True, index=True)
    micro_unit_id = Column(Integer, ForeignKey("micro_units.id"), nullable=False)
    type = Column(String, nullable=False)
    url = Column(String, nullable=False)
    title = Column(String, nullable=False)

