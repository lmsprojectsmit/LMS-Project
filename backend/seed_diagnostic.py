from config.database import SessionLocal
from models.diagnostic_question import DiagnosticQuestion

# diagnostic file to edit and update 

diagnostic_questions = [
    # Algebraic Manipulation
    {
        "question_number": 1,
        "question_text": "Simplify: 3x + 5x − 2x",
        "option_a": "6x",
        "option_b": "8x",
        "option_c": "10x",
        "option_d": "4x",
        "correct_answer": "A",
        "topic": "Algebraic Manipulation",
        "difficulty": "Easy",
    },
    {
        "question_number": 2,
        "question_text": "Expand: (x + 3)(x − 2)",
        "option_a": "x² + x − 6",
        "option_b": "x² − x + 6",
        "option_c": "x² + 5x − 6",
        "option_d": "x² − 6",
        "correct_answer": "A",
        "topic": "Algebraic Manipulation",
        "difficulty": "Easy",
    },
    {
        "question_number": 3,
        "question_text": "Factorize: x² − 9",
        "option_a": "(x − 3)(x + 3)",
        "option_b": "(x − 9)(x + 1)",
        "option_c": "(x − 3)²",
        "option_d": "(x + 9)(x − 1)",
        "correct_answer": "A",
        "topic": "Algebraic Manipulation",
        "difficulty": "Easy",
    },
    {
        "question_number": 4,
        "question_text": "Solve: 2x + 7 = 15",
        "option_a": "2",
        "option_b": "4",
        "option_c": "6",
        "option_d": "8",
        "correct_answer": "B",
        "topic": "Algebraic Manipulation",
        "difficulty": "Easy",
    },
    {
        "question_number": 5,
        "question_text": "Simplify: (x² − 4)/(x − 2), x ≠ 2",
        "option_a": "x − 2",
        "option_b": "x + 2",
        "option_c": "x² + 2",
        "option_d": "2x",
        "correct_answer": "B",
        "topic": "Algebraic Manipulation",
        "difficulty": "Medium",
    },

    # Simultaneous Equations
    {
        "question_number": 6,
        "question_text": "Solve: x + y = 10, x − y = 2",
        "option_a": "x=4, y=6",
        "option_b": "x=6, y=4",
        "option_c": "x=5, y=5",
        "option_d": "x=8, y=2",
        "correct_answer": "B",
        "topic": "Simultaneous Equations",
        "difficulty": "Easy",
    },
    {
        "question_number": 7,
        "question_text": "Solve: 2x + y = 7, x − y = 1",
        "option_a": "x=2, y=3",
        "option_b": "x=3, y=1",
        "option_c": "x=1, y=3",
        "option_d": "x=4, y=−1",
        "correct_answer": "B",
        "topic": "Simultaneous Equations",
        "difficulty": "Easy",
    },
    {
        "question_number": 8,
        "question_text": "Solve: 3x + 2y = 12, x + 2y = 8",
        "option_a": "x=2, y=3",
        "option_b": "x=3, y=2",
        "option_c": "x=4, y=2",
        "option_d": "x=2, y=4",
        "correct_answer": "A",
        "topic": "Simultaneous Equations",
        "difficulty": "Medium",
    },
    {
        "question_number": 9,
        "question_text": "Solve: 2x + 3y = 13, 3x − y = 3",
        "option_a": "x=2, y=3",
        "option_b": "x=3, y=2",
        "option_c": "x=1, y=4",
        "option_d": "x=4, y=1",
        "correct_answer": "A",
        "topic": "Simultaneous Equations",
        "difficulty": "Medium",
    },
    {
        "question_number": 10,
        "question_text": "The equations 2x + 4y = 8 and x + 2y = 4 have:",
        "option_a": "No solution",
        "option_b": "Unique solution",
        "option_c": "Infinitely many solutions",
        "option_d": "Two solutions",
        "correct_answer": "C",
        "topic": "Simultaneous Equations",
        "difficulty": "Medium",
    },

    # Matrices
    {
        "question_number": 11,
        "question_text": "What is the order of A = [[2,3,4],[1,5,6]]?",
        "option_a": "2×2",
        "option_b": "2×3",
        "option_c": "3×2",
        "option_d": "3×3",
        "correct_answer": "B",
        "topic": "Matrices",
        "difficulty": "Easy",
    },
    {
        "question_number": 12,
        "question_text": "Which is a 2×2 matrix?",
        "option_a": "[[1,2,3],[4,5,6]]",
        "option_b": "[[1,2],[3,4]]",
        "option_c": "[[1],[2],[3]]",
        "option_d": "[[1,2,3,4]]",
        "correct_answer": "B",
        "topic": "Matrices",
        "difficulty": "Easy",
    },
    {
        "question_number": 13,
        "question_text": "Find [[1,2],[3,4]] + [[5,6],[7,8]].",
        "option_a": "[[6,8],[10,12]]",
        "option_b": "[[5,8],[9,12]]",
        "option_c": "[[4,4],[4,4]]",
        "option_d": "[[6,7],[8,9]]",
        "correct_answer": "A",
        "topic": "Matrices",
        "difficulty": "Easy",
    },
    {
        "question_number": 14,
        "question_text": "If A = [[2,−1],[3,4]], then 2A =",
        "option_a": "[[2,−2],[6,4]]",
        "option_b": "[[4,−2],[6,8]]",
        "option_c": "[[4,−1],[3,8]]",
        "option_d": "[[2,−1],[6,8]]",
        "correct_answer": "B",
        "topic": "Matrices",
        "difficulty": "Easy",
    },
    {
        "question_number": 15,
        "question_text": "Find AB, where A=[[1,2],[3,4]] and B=[[2,0],[1,3]].",
        "option_a": "[[4,6],[10,12]]",
        "option_b": "[[2,6],[6,12]]",
        "option_c": "[[4,3],[10,9]]",
        "option_d": "[[3,6],[7,12]]",
        "correct_answer": "A",
        "topic": "Matrices",
        "difficulty": "Medium",
    },

    # Determinants
    {
        "question_number": 16,
        "question_text": "Find |2 3; 1 4|.",
        "option_a": "5",
        "option_b": "8",
        "option_c": "11",
        "option_d": "−5",
        "correct_answer": "A",
        "topic": "Determinants",
        "difficulty": "Easy",
    },
    {
        "question_number": 17,
        "question_text": "Find |5 2; 3 1|.",
        "option_a": "−1",
        "option_b": "1",
        "option_c": "5",
        "option_d": "11",
        "correct_answer": "B",
        "topic": "Determinants",
        "difficulty": "Easy",
    },
    {
        "question_number": 18,
        "question_text": "A square matrix is singular when its determinant is:",
        "option_a": "1",
        "option_b": "−1",
        "option_c": "0",
        "option_d": "2",
        "correct_answer": "C",
        "topic": "Determinants",
        "difficulty": "Easy",
    },
    {
        "question_number": 19,
        "question_text": "Find x: |x 2; 3 4| = 10.",
        "option_a": "2",
        "option_b": "3",
        "option_c": "4",
        "option_d": "5",
        "correct_answer": "C",
        "topic": "Determinants",
        "difficulty": "Medium",
    },
    {
        "question_number": 20,
        "question_text": "Find det([[1,2,3],[0,4,5],[1,0,6]]).",
        "option_a": "10",
        "option_b": "20",
        "option_c": "22",
        "option_d": "24",
        "correct_answer": "C",
        "topic": "Determinants",
        "difficulty": "Medium",
    },

    # Vectors
    {
        "question_number": 21,
        "question_text": "Which of the following represents a vector?",
        "option_a": "5",
        "option_b": "x+2",
        "option_c": "(3,4)",
        "option_d": "x²",
        "correct_answer": "C",
        "topic": "Vectors",
        "difficulty": "Easy",
    },
    {
        "question_number": 22,
        "question_text": "Find the magnitude of a = (3,4).",
        "option_a": "3",
        "option_b": "4",
        "option_c": "5",
        "option_d": "7",
        "correct_answer": "C",
        "topic": "Vectors",
        "difficulty": "Easy",
    },
    {
        "question_number": 23,
        "question_text": "If a=(2,3) and b=(4,−1), then a+b =",
        "option_a": "(6,2)",
        "option_b": "(2,4)",
        "option_c": "(6,4)",
        "option_d": "(−2,2)",
        "correct_answer": "A",
        "topic": "Vectors",
        "difficulty": "Easy",
    },
    {
        "question_number": 24,
        "question_text": "Find the dot product of (2,3) and (4,5).",
        "option_a": "10",
        "option_b": "15",
        "option_c": "23",
        "option_d": "25",
        "correct_answer": "C",
        "topic": "Vectors",
        "difficulty": "Medium",
    },
    {
        "question_number": 25,
        "question_text": "The vectors (1,2) and (2,4) are:",
        "option_a": "Linearly independent",
        "option_b": "Linearly dependent",
        "option_c": "Perpendicular",
        "option_d": "Unit vectors",
        "correct_answer": "B",
        "topic": "Vectors",
        "difficulty": "Medium",
    },

    # Functions
    {
        "question_number": 26,
        "question_text": "If f(x)=x²+3x+1, find f(2).",
        "option_a": "7",
        "option_b": "9",
        "option_c": "11",
        "option_d": "13",
        "correct_answer": "C",
        "topic": "Functions",
        "difficulty": "Easy",
    },
    {
        "question_number": 27,
        "question_text": "The domain of f(x)=1/(x−3) is:",
        "option_a": "All real numbers",
        "option_b": "x>3",
        "option_c": "x<3",
        "option_d": "All real numbers except 3",
        "correct_answer": "D",
        "topic": "Functions",
        "difficulty": "Easy",
    },

    # Coordinate Geometry
    {
        "question_number": 28,
        "question_text": "Find the distance between (2,3) and (5,7).",
        "option_a": "3",
        "option_b": "4",
        "option_c": "5",
        "option_d": "7",
        "correct_answer": "C",
        "topic": "Coordinate Geometry",
        "difficulty": "Easy",
    },
    {
        "question_number": 29,
        "question_text": "Find the slope of the line passing through (1,2) and (3,6).",
        "option_a": "1",
        "option_b": "2",
        "option_c": "3",
        "option_d": "4",
        "correct_answer": "B",
        "topic": "Coordinate Geometry",
        "difficulty": "Easy",
    },

    # Logical Reasoning
    {
        "question_number": 30,
        "question_text": "If all matrices are mathematical objects and some mathematical objects are vectors, can we conclude that some matrices are vectors?",
        "option_a": "Yes, always",
        "option_b": "No, not necessarily",
        "option_c": "Yes, because all vectors are matrices",
        "option_d": "None of the above",
        "correct_answer": "B",
        "topic": "Logical Reasoning",
        "difficulty": "Medium",
    },
]


def seed_diagnostic_questions():
    db = SessionLocal()

    try:
        existing_count = db.query(DiagnosticQuestion).count()

        if existing_count > 0:
            print(f"Diagnostic questions already exist: {existing_count}")
            return

        questions = [
            DiagnosticQuestion(**question)
            for question in diagnostic_questions
        ]

        db.add_all(questions)
        db.commit()

        print(f"SUCCESS: {len(questions)} diagnostic questions inserted.")

    except Exception as e:
        db.rollback()
        print(f"ERROR: {e}")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_diagnostic_questions()