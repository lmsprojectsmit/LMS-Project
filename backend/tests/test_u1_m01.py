import pytest
from sqlalchemy.orm import sessionmaker
from config.database import Base, engine
from models.micro_unit import MicroUnit
from models.learning_resource import LearningResource
from models.question import Question
from models.attempt import Attempt
from models.mastery import Mastery
from models.response import Response

from routes.micro_units import get_micro_unit, get_resources, get_questions
from routes.attempts import create_attempt, submit_response, complete_attempt
from routes.mastery import get_student_mastery, get_remediation_info
from schemas.learning import ResponseCreate
from seed_u1_m01 import seed_u1_m01

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Cleanup before test
    db.query(Response).delete()
    db.query(Attempt).delete()
    db.query(Mastery).delete()
    db.query(Question).delete()
    db.query(LearningResource).delete()
    db.query(MicroUnit).delete()
    db.commit()
    db.close()

    # Seed exactly the 10 authoritative questions
    seed_u1_m01()
    
    yield
    # Cleanup after
    db = TestingSessionLocal()
    db.query(Response).delete()
    db.query(Attempt).delete()
    db.query(Mastery).delete()
    db.query(Question).delete()
    db.query(LearningResource).delete()
    db.query(MicroUnit).delete()
    db.commit()
    db.close()

def test_seeded_data_exists():
    db = TestingSessionLocal()
    unit = get_micro_unit("U1-M01", db)
    assert unit.unit_code == "U1-M01"
    
    resources = get_resources("U1-M01", db)
    assert len(resources) == 1
    
    questions = get_questions("U1-M01", db=db)
    assert len(questions) == 10
    
    # Check difficulty spread
    easy_q = get_questions("U1-M01", difficulty="Easy", db=db)
    medium_q = get_questions("U1-M01", difficulty="Medium", db=db)
    hard_q = get_questions("U1-M01", difficulty="Hard", db=db)
    
    assert len(easy_q) == 3
    assert len(medium_q) == 3
    assert len(hard_q) == 4
    
    # Verify exact answers and metadata
    expected_answers = ["A", "B", "B", "A", "B", "C", "A", "B", "A", "A"]
    for i, q in enumerate(questions):
        assert q.correct_answer == expected_answers[i]
        assert q.option_a and q.option_b and q.option_c and q.option_d
        
    # Verify error mappings exist
    assert len(questions[0].error_mappings) > 0
    
    db.close()

def test_full_attempt_flow_mastery():
    db = TestingSessionLocal()
    # 1. Create Attempt
    res = create_attempt("U1-M01", 101, db)
    attempt_id = res["attempt_id"]

    # 2. Get questions
    questions = get_questions("U1-M01", db=db)
    
    # 3. Submit responses (80% correct -> 8/10)
    for i, q in enumerate(questions):
        ans = q.correct_answer if i < 8 else "D"  # 8 correct, 2 wrong
        resp = submit_response(attempt_id, ResponseCreate(question_id=q.id, selected_answer=ans), db)
        assert resp["is_correct"] == (i < 8)

    # 4. Complete attempt
    data = complete_attempt(attempt_id, db)
    assert data["score"] == 8.0
    assert data["percentage"] == 80.0
    assert data["mastery_status"] == "Mastered"
    assert data["remediation_required"] is False
    db.close()

def test_remediation_flow():
    db = TestingSessionLocal()
    res = create_attempt("U1-M01", 102, db)
    attempt_id = res["attempt_id"]
    questions = get_questions("U1-M01", db=db)
    
    # Get 7/10 correct, which is 70% -> Remediation Required
    for i, q in enumerate(questions):
        ans = q.correct_answer if i < 7 else "D"
        submit_response(attempt_id, ResponseCreate(question_id=q.id, selected_answer=ans), db)

    data = complete_attempt(attempt_id, db)
    assert data["percentage"] == 70.0
    assert data["mastery_status"] == "Remediation Required"
    assert data["remediation_required"] is True
    
    # Check remediation endpoint
    rem_data = get_remediation_info("U1-M01", 102, db)
    assert rem_data["remediation_needed"] is True
    assert "scored below 80%" in rem_data["message"]
    db.close()
