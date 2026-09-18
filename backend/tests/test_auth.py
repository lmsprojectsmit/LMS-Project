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
    assert "user" in response
    user_obj = response["user"]
    assert user_obj.email == "teststudent@example.com"
    assert user_obj.full_name == "Test Student"
    assert user_obj.role == "student"
    assert hasattr(user_obj, "id")
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

def test_registration_duplicate_email():
    db = TestingSessionLocal()
    user_data = UserCreate(
        email="teststudent@example.com", # already seeded
        password="newpassword123",
        full_name="Duplicate User",
        role="student"
    )
    with pytest.raises(HTTPException) as excinfo:
        register_user(user_data, db)

    assert excinfo.value.status_code == 400
    assert excinfo.value.detail == "Email already registered"
    db.close()

def test_bcrypt_cost_verification():
    from core.security import verify_password, get_password_hash
    from config.settings import settings
    import bcrypt
    
    # 1. Test newly generated hash uses configured cost
    # Default is 12, but it might be overridden in environment, so we check against settings
    test_pass = "mysecretpassword"
    new_hash = get_password_hash(test_pass)
    # Extract cost from hash (e.g. $2b$12$...)
    cost_str = new_hash.split("$")[2]
    assert int(cost_str) == settings.BCRYPT_ROUNDS
    
    # 2. Test cost-12 hash verifies successfully
    hash_12 = bcrypt.hashpw(test_pass.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')
    assert verify_password(test_pass, hash_12) is True
    assert verify_password("wrong", hash_12) is False
    
    # 3. Test cost-10 hash verifies successfully
    hash_10 = bcrypt.hashpw(test_pass.encode('utf-8'), bcrypt.gensalt(10)).decode('utf-8')
    assert verify_password(test_pass, hash_10) is True
    assert verify_password("wrong", hash_10) is False

