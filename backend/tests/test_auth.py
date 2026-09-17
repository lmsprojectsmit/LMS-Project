import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config.database import Base
from models.user import User
from core.security import get_password_hash

# Create isolated SQLite DB for tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Removed main app import to avoid triggering Base.metadata.create_all(bind=engine) on Neon DB
from routes.auth import login, register_user
from schemas.auth import UserLogin, UserCreate
from fastapi import HTTPException
from pydantic import ValidationError

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    # Seed a test user
    db.add(User(
        email="teststudent@example.com",
        hashed_password=get_password_hash("testpassword123"),
        full_name="Test Student",
        role="student"
    ))
    db.commit()
    db.close()
    yield

def test_correct_credentials_success():
    db = TestingSessionLocal()
    login_data = UserLogin(email="teststudent@example.com", password="testpassword123")
    response = login(login_data, db)
    assert "access_token" in response
    assert response["token_type"] == "bearer"
    db.close()

def test_correct_email_wrong_password():
    db = TestingSessionLocal()
    login_data = UserLogin(email="teststudent@example.com", password="wrongpassword")
    with pytest.raises(HTTPException) as excinfo:
        login(login_data, db)
    assert excinfo.value.status_code == 401
    assert excinfo.value.detail == "Invalid email or password"
    db.close()

def test_unknown_email():
    db = TestingSessionLocal()
    login_data = UserLogin(email="unknown@example.com", password="password123")
    with pytest.raises(HTTPException) as excinfo:
        login(login_data, db)
    assert excinfo.value.status_code == 401
    assert excinfo.value.detail == "Invalid email or password"
    db.close()

def test_registration():
    db = TestingSessionLocal()
    user_data = UserCreate(
        email="newuser@example.com",
        password="newpassword123",
        full_name="New User",
        role="student"
    )
    new_user = register_user(user_data, db)
    assert new_user.email == "newuser@example.com"
    
    # Check that plain password is not accessible but hashed_password is created
    # new_user is a User SQLAlchemy object
    assert new_user.hashed_password != "newpassword123"
    db.close()
