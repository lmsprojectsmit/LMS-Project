from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from config.settings import settings


# Add connection pool resilience for Neon / PostgreSQL
connect_args = {}
if settings.DATABASE_URL.startswith("postgresql"):
    if "sslmode=" not in settings.DATABASE_URL:
        connect_args["sslmode"] = "require"

engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=300, # Recycle connections after 5 minutes to prevent stale Neon connections
    connect_args=connect_args,
)


SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()