from sqlalchemy.orm import Session
from config.database import SessionLocal, engine, Base
from models import micro_unit, learning_resource, question

# Create tables
Base.metadata.create_all(bind=engine)

def seed_u1_m01():
    db = SessionLocal()
    try:
        # Check if already seeded
        unit = db.query(micro_unit.MicroUnit).filter(micro_unit.MicroUnit.unit_code == "U1-M01").first()
        if not unit:
            unit = micro_unit.MicroUnit(
                unit_code="U1-M01",
                title="Understanding Vectors",
                description="Introduction to vectors, their representation, and basic properties.",
                learning_objectives=[
                    "Define a vector and its components.",
                    "Understand geometric representation of vectors.",
                    "Identify zero and unit vectors."
                ]
            )
            db.add(unit)
            db.commit()
            db.refresh(unit)
            
            # Add reference video
            resource = learning_resource.LearningResource(
                micro_unit_id=unit.id,
                type="video",
                url="https://youtu.be/vtPuz4iKdTg?si=-UavicpLZBmud88w",
                title="Reference Video: Understanding Vectors"
            )
            db.add(resource)
            db.commit()
            
            print("Successfully seeded U1-M01 and learning resources.")
        else:
            print("U1-M01 already seeded.")
            
        # Seed questions
        questions_data = [
            {
                "question_text": "Given u = (3, 2) and v = (1, 4), what is u + v?",
                "option_a": "(4, 6)", "option_b": "(3, 8)", "option_c": "(2, 6)", "option_d": "(4, 2)",
                "correct_answer": "A",
                "explanation": "u + v = (3, 2) + (1, 4) = (3 + 1, 2 + 4) = (4, 6)",
                "hint": "Vector addition requires finding the sum of the corresponding coordinates.",
                "difficulty": "Easy", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "B": "MULTIPLICATION_INSTEAD_OF_ADDITION",
                    "C": "VECTOR_SUBTRACTION_CONFUSION",
                    "D": "VECTOR_SUBTRACTION_CONFUSION"
                }
            },
            {
                "question_text": "Given a = (5, -2) what is 2a?",
                "option_a": "(7, 0)", "option_b": "(10, -4)", "option_c": "(10, -2)", "option_d": "(5, -4)",
                "correct_answer": "B",
                "explanation": "2a = 2(5, -2) = (2 × 5, 2 × (-2)) = (10, -4)",
                "hint": "Scalar multiplication requires multiplying every component by the scalar factor.",
                "difficulty": "Easy", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "A": "SCALAR_ADDITION_INSTEAD_OF_MULTIPLICATION",
                    "C": "PARTIAL_SCALAR_MULTIPLICATION",
                    "D": "PARTIAL_SCALAR_MULTIPLICATION"
                }
            },
            {
                "question_text": "Which of the following represents a vector in R³?",
                "option_a": "(2, 5)", "option_b": "(1, -3, 4)", "option_c": "(7)", "option_d": "(2, 4, 6, 8)",
                "correct_answer": "B",
                "explanation": "A vector in R² has 2 components. A vector in R³ has 3 components. (1, -3, 4) has three components. Therefore: (1, -3, 4) ∈ R³",
                "hint": "Count the number of components.",
                "difficulty": "Easy", "bloom_level": "Understand", "co_mapping": "CO1",
                "error_mappings": {
                    "A": "DIMENSIONALITY_ERROR",
                    "C": "DIMENSIONALITY_ERROR",
                    "D": "DIMENSIONALITY_ERROR"
                }
            },
            {
                "question_text": "Given p = (2, -1, 3) and q = (4, 2, -1) find p + q.",
                "option_a": "(6, 1, 2)", "option_b": "(6, -3, 4)", "option_c": "(2, 1, 2)", "option_d": "(8, 1, -3)",
                "correct_answer": "A",
                "explanation": "p + q = (2, -1, 3) + (4, 2, -1) = (2 + 4, -1 + 2, 3 + (-1)) = (6, 1, 2)",
                "hint": "Perform component-wise addition across all three components.",
                "difficulty": "Medium", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "B": "VECTOR_SUBTRACTION_CONFUSION",
                    "C": "PARTIAL_ADDITION",
                    "D": "MULTIPLICATION_INSTEAD_OF_ADDITION"
                }
            },
            {
                "question_text": "Given x = (-2, 3), what is -3x?",
                "option_a": "(-6, 9)", "option_b": "(6, -9)", "option_c": "(-6, -9)", "option_d": "(6, 9)",
                "correct_answer": "B",
                "explanation": "-3x = -3(-2, 3) = (-3 × -2, -3 × 3) = (6, -9)",
                "hint": "Pay close attention to the signs when multiplying by a negative scalar.",
                "difficulty": "Medium", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "A": "SIGN_ERROR",
                    "C": "SIGN_ERROR",
                    "D": "SIGN_ERROR"
                }
            },
            {
                "question_text": "Given u = (2, 1) and v = (-3, 4) find 2u + v.",
                "option_a": "(2, 5)", "option_b": "(4, 6)", "option_c": "(1, 6)", "option_d": "(-1, 6)",
                "correct_answer": "C",
                "explanation": "First calculate 2u: 2u = 2(2, 1) = (4, 2) Now add v: 2u + v = (4, 2) + (-3, 4) = (4 - 3, 2 + 4) = (1, 6)",
                "hint": "Follow order of operations: calculate scalar multiplication before adding.",
                "difficulty": "Medium", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "A": "ORDER_OF_OPERATIONS_ERROR",
                    "B": "COMPONENT_OMISSION",
                    "D": "PARTIAL_SCALAR_MULTIPLICATION"
                }
            },
            {
                "question_text": "Given a = (1, -2, 3) and b = (2, 4, -1) find 3a - 2b.",
                "option_a": "(-1, -14, 11)", "option_b": "(-1, -14, 9)", "option_c": "(1, -14, 11)", "option_d": "(7, 2, 8)",
                "correct_answer": "A",
                "explanation": "First calculate 3a = (3, -6, 9). Next 2b = (4, 8, -2). Then 3a - 2b = (3 - 4, -6 - 8, 9 - (-2)) = (-1, -14, 11)",
                "hint": "Subtracting a negative number becomes addition.",
                "difficulty": "Hard", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "B": "SIGN_ERROR",
                    "C": "ARITHMETIC_ERROR",
                    "D": "ADDITION_INSTEAD_OF_SUBTRACTION"
                }
            },
            {
                "question_text": "A vector starts at P = (2, 1) and ends at Q = (7, 5) What is the vector PQ?",
                "option_a": "(9, 6)", "option_b": "(5, 4)", "option_c": "(-5, -4)", "option_d": "(7, 5)",
                "correct_answer": "B",
                "explanation": "Vector PQ = Q - P = (7, 5) - (2, 1) = (7 - 2, 5 - 1) = (5, 4)",
                "hint": "Vector displacement is calculated as Terminal Point - Initial Point (Q - P).",
                "difficulty": "Hard", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "A": "ADDITION_INSTEAD_OF_SUBTRACTION",
                    "C": "INCORRECT_DIRECTION",
                    "D": "IGNORED_INITIAL_POINT"
                }
            },
            {
                "question_text": "Given v = (2, -1, 4), find 2v + (-3, 2, 1).",
                "option_a": "(1, 0, 9)", "option_b": "(4, -2, 8)", "option_c": "(-1, 0, 7)", "option_d": "(1, 2, 9)",
                "correct_answer": "A",
                "explanation": "First calculate 2v = (4, -2, 8). Now add (-3, 2, 1) = (4 - 3, -2 + 2, 8 + 1) = (1, 0, 9)",
                "hint": "Double v first before adding the second vector.",
                "difficulty": "Hard", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "B": "COMPONENT_OMISSION",
                    "C": "ORDER_OF_OPERATIONS_ERROR",
                    "D": "ARITHMETIC_ERROR"
                }
            },
            {
                "question_text": "Given u = (1, 2, 3) and v = (-2, 1, 4), calculate 2u + 3v.",
                "option_a": "(-4, 7, 18)", "option_b": "(0, 7, 15)", "option_c": "(4, 5, 18)", "option_d": "(-2, 5, 12)",
                "correct_answer": "A",
                "explanation": "2u = (2, 4, 6) and 3v = (-6, 3, 12). 2u + 3v = (2 - 6, 4 + 3, 6 + 12) = (-4, 7, 18)",
                "hint": "Perform scalar multiplication on both vectors before adding.",
                "difficulty": "Hard", "bloom_level": "Apply", "co_mapping": "CO1",
                "error_mappings": {
                    "B": "ARITHMETIC_ERROR",
                    "C": "SIGN_ERROR",
                    "D": "ORDER_OF_OPERATIONS_ERROR"
                }
            }
        ]

        count = 0
        for qd in questions_data:
            existing = db.query(question.Question).filter(
                question.Question.micro_unit_id == unit.id,
                question.Question.question_text == qd["question_text"]
            ).first()
            if not existing:
                q = question.Question(
                    micro_unit_id=unit.id,
                    question_text=qd["question_text"],
                    option_a=qd["option_a"],
                    option_b=qd["option_b"],
                    option_c=qd["option_c"],
                    option_d=qd["option_d"],
                    correct_answer=qd["correct_answer"],
                    explanation=qd["explanation"],
                    hint=qd["hint"],
                    difficulty=qd["difficulty"],
                    bloom_level=qd["bloom_level"],
                    co_mapping=qd["co_mapping"],
                    error_mappings=qd["error_mappings"]
                )
                db.add(q)
                count += 1
        
        db.commit()
        print(f"Successfully seeded {count} new questions for U1-M01.")

    finally:
        db.close()

if __name__ == "__main__":
    seed_u1_m01()
