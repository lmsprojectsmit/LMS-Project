from sqlalchemy.orm import Session

from models.diagnostic_question import DiagnosticQuestion
from models.diagnostic_attempt import DiagnosticAttempt
from models.diagnostic_response import DiagnosticResponse


def get_diagnostic_band(percentage: float) -> str:
    """
    Determine the overall diagnostic performance band.

    Diagnostic bands:
        80-100 -> Green
        50-79  -> Amber
        <50    -> Red
    """

    if percentage >= 80:
        return "Green"

    if percentage >= 50:
        return "Amber"

    return "Red"


def calculate_topic_analysis(
    questions,
    submitted_answers,
):
    """
    Calculate performance for each diagnostic topic.

    Returns a dictionary containing:
        total questions
        correct answers
        percentage
    for every topic represented in the diagnostic.
    """

    topic_data = {}

    # Create a lookup for submitted answers
    answer_map = {
        answer.question_number: answer.selected_answer.upper().strip()
        for answer in submitted_answers
    }

    for question in questions:

        topic = question.topic

        if topic not in topic_data:
            topic_data[topic] = {
                "total_questions": 0,
                "correct_answers": 0,
            }

        topic_data[topic]["total_questions"] += 1

        selected_answer = answer_map.get(
            question.question_number
        )

        if selected_answer == question.correct_answer.upper().strip():
            topic_data[topic]["correct_answers"] += 1

    # Calculate percentages
    for topic, data in topic_data.items():

        total = data["total_questions"]
        correct = data["correct_answers"]

        percentage = (
            (correct / total) * 100
            if total > 0
            else 0
        )

        data["percentage"] = round(percentage, 2)

    return topic_data


def submit_diagnostic(
    db: Session,
    student_id: int,
    submitted_answers,
):
    """
    Process a complete diagnostic attempt.

    Steps:
        1. Load diagnostic questions.
        2. Validate the submitted answers.
        3. Calculate correct answers.
        4. Calculate percentage.
        5. Analyse topic-wise performance.
        6. Determine overall diagnostic band.
        7. Store the attempt.
        8. Store every question response.
        9. Return the complete diagnostic result.
    """

    # --------------------------------------------------------
    # 1. Load all diagnostic questions
    # --------------------------------------------------------

    questions = (
        db.query(DiagnosticQuestion)
        .order_by(DiagnosticQuestion.question_number)
        .all()
    )

    if not questions:
        raise ValueError(
            "No diagnostic questions are available."
        )

    # --------------------------------------------------------
    # 2. Validate the diagnostic
    # --------------------------------------------------------

    expected_question_numbers = {
        question.question_number
        for question in questions
    }

    submitted_question_numbers = [
        answer.question_number
        for answer in submitted_answers
    ]

    submitted_question_set = set(
        submitted_question_numbers
    )

    # Check for duplicate answers
    if len(submitted_question_numbers) != len(
        submitted_question_set
    ):
        raise ValueError(
            "Duplicate question numbers were submitted."
        )

    # Check that all questions were answered
    if submitted_question_set != expected_question_numbers:
        missing_questions = sorted(
            expected_question_numbers
            - submitted_question_set
        )

        extra_questions = sorted(
            submitted_question_set
            - expected_question_numbers
        )

        message_parts = []

        if missing_questions:
            message_parts.append(
                f"Missing questions: {missing_questions}"
            )

        if extra_questions:
            message_parts.append(
                f"Invalid questions: {extra_questions}"
            )

        raise ValueError(
            "Diagnostic must contain exactly all questions. "
            + " ".join(message_parts)
        )

    # --------------------------------------------------------
    # 3. Validate answer choices
    # --------------------------------------------------------

    valid_options = {"A", "B", "C", "D"}

    for answer in submitted_answers:

        selected_answer = (
            answer.selected_answer.upper().strip()
        )

        if selected_answer not in valid_options:
            raise ValueError(
                f"Invalid answer '{answer.selected_answer}' "
                f"for question {answer.question_number}. "
                "Use A, B, C, or D."
            )

    # --------------------------------------------------------
    # 4. Create question lookup
    # --------------------------------------------------------

    question_map = {
        question.question_number: question
        for question in questions
    }

    # --------------------------------------------------------
    # 5. Calculate correct answers
    # --------------------------------------------------------

    correct_count = 0

    for answer in submitted_answers:

        question = question_map[
            answer.question_number
        ]

        selected_answer = (
            answer.selected_answer.upper().strip()
        )

        if selected_answer == (
            question.correct_answer.upper().strip()
        ):
            correct_count += 1

    # --------------------------------------------------------
    # 6. Calculate score
    # --------------------------------------------------------

    total_questions = len(questions)

    percentage = (
        (correct_count / total_questions) * 100
        if total_questions > 0
        else 0
    )

    percentage = round(percentage, 2)

    # --------------------------------------------------------
    # 7. Determine diagnostic band
    # --------------------------------------------------------

    diagnostic_band = get_diagnostic_band(
        percentage
    )

    # --------------------------------------------------------
    # 8. Topic-wise analysis
    # --------------------------------------------------------

    topic_analysis = calculate_topic_analysis(
        questions,
        submitted_answers,
    )

    # --------------------------------------------------------
    # 9. Create diagnostic attempt
    # --------------------------------------------------------

    attempt = DiagnosticAttempt(
        student_id=student_id,
        total_questions=total_questions,
        correct_answers=correct_count,
        score=correct_count,
        percentage=percentage,
    )

    db.add(attempt)

    # Generate attempt ID
    db.flush()

    # --------------------------------------------------------
    # 10. Store every diagnostic response
    # --------------------------------------------------------

    for answer in submitted_answers:

        question = question_map[
            answer.question_number
        ]

        selected_answer = (
            answer.selected_answer.upper().strip()
        )

        is_correct = (
            selected_answer
            == question.correct_answer.upper().strip()
        )

        response = DiagnosticResponse(
            attempt_id=attempt.id,
            question_id=question.id,
            selected_answer=selected_answer,
            is_correct=is_correct,
        )

        db.add(response)

    # --------------------------------------------------------
    # 11. Save transaction
    # --------------------------------------------------------

    try:
        db.commit()
        db.refresh(attempt)

    except Exception:
        db.rollback()
        raise

    # --------------------------------------------------------
    # 12. Return result
    # --------------------------------------------------------

    return {
        "message": "Diagnostic submitted successfully.",
        "attempt_id": attempt.id,
        "student_id": attempt.student_id,
        "total_questions": attempt.total_questions,
        "correct_answers": attempt.correct_answers,
        "score": attempt.score,
        "percentage": attempt.percentage,
        "diagnostic_band": diagnostic_band,
        "topic_analysis": topic_analysis,
    }