from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from config.database import get_db
from models.user import User
from schemas.auth import UserCreate, UserLogin, UserResponse, Token
from core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_current_user
)

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    import time
    t_start = time.time()
    
    t0 = time.time()
    user = db.query(User).filter(User.email == login_data.email).first()
    t_db = time.time() - t0
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    t1 = time.time()
    is_valid = verify_password(login_data.password, user.hashed_password)
    t_bcrypt = time.time() - t1
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    t2 = time.time()
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role, "id": user.id}, expires_delta=access_token_expires
    )
    t_jwt = time.time() - t2
    
    t_total = time.time() - t_start
    print(f"\n--- TIMING LOG ---")
    print(f"DB Lookup Time: {t_db*1000:.2f} ms")
    print(f"Bcrypt Verification Time: {t_bcrypt*1000:.2f} ms")
    print(f"JWT Creation Time: {t_jwt*1000:.2f} ms")
    print(f"Total Processing Time: {t_total*1000:.2f} ms")
    print(f"------------------\n")
    
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
