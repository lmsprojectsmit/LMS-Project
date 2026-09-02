import { useState, useEffect } from "react";
import "./Assessment.css";

// 20 Questions (1 mark each, Total: 20 marks)
// Divided across 4 core domains (5 questions per domain)
export const ASSESSMENT_QUESTIONS = [
  // -------------------------------------------------------------
  // Domain 1: Matrix Algebra & Properties (Q1 - Q5)
  // -------------------------------------------------------------
  {
    id: 1,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A is any square matrix of order n, which of the following expressions is always guaranteed to be a symmetric matrix?",
    options: [
      { id: "A", text: "A - Aᵀ" },
      { id: "B", text: "A + Aᵀ" },
      { id: "C", text: "A² - A" },
      { id: "D", text: "A A⁻¹" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "(A + Aᵀ)ᵀ = Aᵀ + (Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ. Since the transpose equals the matrix itself, it is always symmetric."
  },
  {
    id: 2,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A is an m × n matrix and B is an n × p matrix, what is the order (dimension) of the product matrix (AB)ᵀ?",
    options: [
      { id: "A", text: "m × p" },
      { id: "B", text: "p × m" },
      { id: "C", text: "n × n" },
      { id: "D", text: "p × n" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "The product AB has order m × p. Taking the transpose (AB)ᵀ swaps rows and columns, giving dimension p × m."
  },
  {
    id: 3,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "The trace of an n × n square matrix A, denoted as Tr(A), is defined as:",
    options: [
      { id: "A", text: "The product of its main diagonal elements" },
      { id: "B", text: "The sum of all elements in the first row" },
      { id: "C", text: "The sum of its principal diagonal elements: ∑ aᵢᵢ" },
      { id: "D", text: "The determinant of the matrix" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "Trace is defined as the sum of elements lying along the main (principal) diagonal from top-left to bottom-right."
  },
  {
    id: 4,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A is a real skew-symmetric matrix (Aᵀ = -A), what can always be concluded about its principal diagonal elements?",
    options: [
      { id: "A", text: "All diagonal elements must be strictly 0" },
      { id: "B", text: "All diagonal elements must be equal to 1" },
      { id: "C", text: "All diagonal elements must be strictly negative" },
      { id: "D", text: "They can be any arbitrary non-zero real numbers" }
    ],
    correctAnswer: "A",
    marks: 1,
    explanation: "For diagonal elements, aᵢᵢ = -aᵢᵢ implies 2aᵢᵢ = 0, which requires aᵢᵢ = 0 for all i."
  },
  {
    id: 5,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A and B are invertible square matrices of the same order, what does the reversal law state for (AB)⁻¹?",
    options: [
      { id: "A", text: "(AB)⁻¹ = A⁻¹ B⁻¹" },
      { id: "B", text: "(AB)⁻¹ = B⁻¹ A⁻¹" },
      { id: "C", text: "(AB)⁻¹ = (BA)⁻¹" },
      { id: "D", text: "(AB)⁻¹ = A B⁻¹" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "By the reversal law of matrix inverses: (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = A I A⁻¹ = AA⁻¹ = I. Hence, (AB)⁻¹ = B⁻¹ A⁻¹."
  },

  // -------------------------------------------------------------
  // Domain 2: Determinants & Invertibility (Q6 - Q10)
  // -------------------------------------------------------------
  {
    id: 6,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "If A is an n × n square matrix and k is any scalar, what is the determinant of kA?",
    options: [
      { id: "A", text: "k · det(A)" },
      { id: "B", text: "kⁿ · det(A)" },
      { id: "C", text: "nᵏ · det(A)" },
      { id: "D", text: "(1/k) · det(A)" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Factoring out scalar k from each of the n rows in an n × n matrix results in k · k · ... · k = kⁿ times det(A)."
  },
  {
    id: 7,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "A square matrix A is invertible (non-singular) if and only if:",
    options: [
      { id: "A", text: "det(A) = 0" },
      { id: "B", text: "det(A) ≠ 0" },
      { id: "C", text: "Trace(A) ≠ 0" },
      { id: "D", text: "A is a symmetric matrix" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "A matrix is invertible if and only if its columns/rows are linearly independent, which is true if and only if det(A) ≠ 0."
  },
  {
    id: 8,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "Evaluate the determinant of the 2 × 2 matrix A = [[3, 4], [2, 5]]:",
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "23" },
      { id: "C", text: "-7" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "A",
    marks: 1,
    explanation: "det(A) = (3)(5) - (4)(2) = 15 - 8 = 7."
  },
  {
    id: 9,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "If any two identical rows (or columns) exist in a square matrix A, what is det(A)?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "-1" },
      { id: "C", text: "0" },
      { id: "D", text: "Equal to the sum of the elements in that row" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "Swapping two identical rows gives det(A) = -det(A) ⟹ 2·det(A) = 0 ⟹ det(A) = 0."
  },
  {
    id: 10,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "For an invertible matrix A with det(A) = 4, what is the determinant of its inverse A⁻¹?",
    options: [
      { id: "A", text: "-4" },
      { id: "B", text: "0.25 (1/4)" },
      { id: "C", text: "16" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Since det(A · A⁻¹) = det(I) = 1, det(A⁻¹) = 1 / det(A) = 1/4 = 0.25."
  },

  // -------------------------------------------------------------
  // Domain 3: Systems of Linear Equations & Rank (Q11 - Q15)
  // -------------------------------------------------------------
  {
    id: 11,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "By the Rouché–Capelli theorem, a non-homogeneous system AX = B is consistent if and only if:",
    options: [
      { id: "A", text: "Rank(A) > Rank([A|B])" },
      { id: "B", text: "Rank(A) = Rank([A|B])" },
      { id: "C", text: "Rank(A) = 0" },
      { id: "D", text: "det(A) = 0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "A linear system has solutions if and only if adding the constant vector B does not increase the rank: Rank(A) = Rank([A|B])."
  },
  {
    id: 12,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "If a consistent system of m equations in n unknowns has Rank(A) = r, with r < n, then the system has:",
    options: [
      { id: "A", text: "A unique solution" },
      { id: "B", text: "No solution" },
      { id: "C", text: "Infinitely many solutions with (n - r) free variables" },
      { id: "D", text: "Exactly (n - r) solutions" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "When rank r is less than the number of unknowns n, there are (n - r) free parameters, yielding an infinite family of solutions."
  },
  {
    id: 13,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "What is the maximum possible rank of a real matrix of size 3 × 5?",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "3" },
      { id: "C", text: "8" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "For an m × n matrix, Rank(A) ≤ min(m, n). Thus, Rank(A) ≤ min(3, 5) = 3."
  },
  {
    id: 14,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "According to the fundamental Rank-Nullity Theorem for an n-dimensional vector space V (T: V → W):",
    options: [
      { id: "A", text: "Rank(T) - Nullity(T) = n" },
      { id: "B", text: "Rank(T) · Nullity(T) = n" },
      { id: "C", text: "Rank(T) + Nullity(T) = n = dim(Domain)" },
      { id: "D", text: "Rank(T) + Nullity(T) = dim(Codomain W)" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "The Rank-Nullity Theorem states: dim(Image(T)) + dim(Kernel(T)) = dim(Domain V), i.e., Rank + Nullity = n."
  },
  {
    id: 15,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "A homogeneous system of linear equations AX = 0:",
    options: [
      { id: "A", text: "Is always inconsistent" },
      { id: "B", text: "Always has at least the trivial solution X = 0" },
      { id: "C", text: "Never possesses non-trivial solutions" },
      { id: "D", text: "Can only have solutions if det(A) ≠ 0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Setting all variables to zero gives A · 0 = 0, so the zero vector (trivial solution) is guaranteed to satisfy the system."
  },

  // -------------------------------------------------------------
  // Domain 4: Vector Spaces, Eigenvalues & Eigenvectors (Q16 - Q20)
  // -------------------------------------------------------------
  {
    id: 16,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "The sum of all eigenvalues (λ₁ + λ₂ + ... + λₙ) of an n × n square matrix A is always equal to:",
    options: [
      { id: "A", text: "det(A)" },
      { id: "B", text: "Trace(A)" },
      { id: "C", text: "Rank(A)" },
      { id: "D", text: "Nullity(A)" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "The sum of the roots of the characteristic polynomial det(A - λI) = 0 equals the sum of diagonal elements, which is Trace(A)."
  },
  {
    id: 17,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "The product of all eigenvalues (λ₁ · λ₂ · ... · λₙ) of a square matrix A is equal to:",
    options: [
      { id: "A", text: "Trace(A)" },
      { id: "B", text: "det(A)" },
      { id: "C", text: "Rank(A)" },
      { id: "D", text: "Zero" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Setting λ = 0 in the characteristic polynomial det(A - λI) shows that the constant term equals det(A) = ∏ λᵢ."
  },
  {
    id: 18,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "If λ is a non-zero eigenvalue of an invertible matrix A with eigenvector v, what is the eigenvalue of A⁻¹ corresponding to v?",
    options: [
      { id: "A", text: "-λ" },
      { id: "B", text: "λ²" },
      { id: "C", text: "1 / λ" },
      { id: "D", text: "1 - λ" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "Av = λv ⟹ A⁻¹(Av) = A⁻¹(λv) ⟹ v = λ(A⁻¹v) ⟹ A⁻¹v = (1/λ)v. Thus 1/λ is the eigenvalue."
  },
  {
    id: 19,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "A set of vectors {v₁, v₂, ..., vₖ} in vector space V is defined as linearly dependent if:",
    options: [
      { id: "A", text: "c₁v₁ + c₂v₂ + ... + cₖvₖ = 0 only when every cᵢ = 0" },
      { id: "B", text: "There exist scalars cᵢ not all zero such that c₁v₁ + ... + cₖvₖ = 0" },
      { id: "C", text: "All vectors have identical magnitude" },
      { id: "D", text: "The dot product between any two vectors is strictly zero" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Linear dependence requires at least one non-trivial linear combination of the vectors to equal the zero vector."
  },
  {
    id: 20,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "The characteristic equation of a 2 × 2 matrix A is λ² - 5λ + 6 = 0. What are its eigenvalues?",
    options: [
      { id: "A", text: "λ = 1 and λ = 6" },
      { id: "B", text: "λ = 2 and λ = 3" },
      { id: "C", text: "λ = -2 and λ = -3" },
      { id: "D", text: "λ = 5 and λ = 6" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Factoring λ² - 5λ + 6 = 0 gives (λ - 2)(λ - 3) = 0, so the eigenvalues are λ = 2 and λ = 3."
  }
];

function Assessment({ onNavigate, studentInfo }) {
  // Test state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: "A" | "B" | ... }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes countdown (1200 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSolutionReview, setShowSolutionReview] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isTimerRunning, isSubmitted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId) => {
    if (isSubmitted) return;
    const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleClearAnswer = () => {
    const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleAutoSubmit = () => {
    setShowSubmitModal(false);
    setIsSubmitted(true);
    setIsTimerRunning(false);
  };

  const handleFinalSubmit = () => {
    setShowSubmitModal(false);
    setIsSubmitted(true);
    setIsTimerRunning(false);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(20 * 60);
    setCurrentQIndex(0);
    setIsSubmitted(false);
    setShowSolutionReview(false);
    setIsTimerRunning(true);
  };

  // Compute Analytics
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  let score = 0;
  const domainBreakdown = {
    unit1: { name: "Matrix Algebra & Properties", correct: 0, total: 5 },
    unit2: { name: "Determinants & Invertibility", correct: 0, total: 5 },
    unit3: { name: "Linear Systems & Rank", correct: 0, total: 5 },
    unit4: { name: "Eigenvalues & Vector Spaces", correct: 0, total: 5 },
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
    if (isCorrect) {
      score += 1;
      if (domainBreakdown[q.domainCode]) {
        domainBreakdown[q.domainCode].correct += 1;
      }
    }
  });

  const percentage = Math.round((score / totalQuestions) * 100);

  // Capability Assessment Level
  let capabilityTier = {
    title: "Advanced Mastery",
    badgeClass: "badge-advanced",
    icon: "🌟",
    summary: "Outstanding foundational grasp! You demonstrate high readiness for higher-level applications like SVD and Orthogonal Projections.",
    actionRecommendation: "Directly begin Unit III (Eigenvalues) & Unit V (Inner Product Spaces) advanced practice modules in EduVerse LMS.",
  };

  if (percentage < 50) {
    capabilityTier = {
      title: "Foundational Need (Concept Remediation)",
      badgeClass: "badge-foundational",
      icon: "📚",
      summary: "Needs guided conceptual support in basic matrix transformations, determinants, and linear combinations.",
      actionRecommendation: "Recommended to complete the 'Unit I: Matrix Algebra Bootcamp' video lessons before attempting university mock tests.",
    };
  } else if (percentage < 70) {
    capabilityTier = {
      title: "Developing Capability",
      badgeClass: "badge-developing",
      icon: "📈",
      summary: "Decent awareness of core terminology, but needs structured problem practice in Rank-Nullity and matrix invertibility.",
      actionRecommendation: "Work through step-by-step matrix row-reduction tutorials and practice 2025 question bank problems in EduVerse.",
    };
  } else if (percentage < 85) {
    capabilityTier = {
      title: "Proficient / Solid Foundation",
      badgeClass: "badge-proficient",
      icon: "🚀",
      summary: "Solid analytical capability! Good understanding of determinants, consistency conditions, and characteristic equations.",
      actionRecommendation: "Ready for standard course pace. Focus on Unit IV (Diagonalization & Cayley-Hamilton) to secure top grades.",
    };
  }

  const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];

  return (
    <div className="assessment-page">
      {/* Decorative math chalk background */}
      <div className="assessment-math-bg" aria-hidden="true">
        <span className="floating-math m1">A x = b</span>
        <span className="floating-math m2">det(A - λI) = 0</span>
        <span className="floating-math m3">dim(V) = rank(T) + nullity(T)</span>
        <span className="floating-math m4">λ₁ + λ₂ = Tr(A)</span>
        <span className="floating-math m5">(AB)⁻¹ = B⁻¹ A⁻¹</span>
      </div>

      {/* Top Header Bar */}
      <header className="assessment-header">
        <div className="assessment-brand" onClick={() => onNavigate && onNavigate("home")}>
          <span className="brand-icon">📐</span>
          <div>
            <h1 className="brand-title">EduVerse LMS • Diagnostic Assessment</h1>
            <p className="brand-subtitle">Linear Algebra (MA25C02) • Student Capability Profiler</p>
          </div>
        </div>

        <div className="header-meta">
          {studentInfo && studentInfo.fullName && (
            <div className="student-badge">
              <span className="student-avatar">👤</span>
              <span className="student-name">{studentInfo.fullName}</span>
              {studentInfo.rollNo && <span className="student-roll">({studentInfo.rollNo})</span>}
            </div>
          )}

          {!isSubmitted && (
            <div className={`timer-box ${timeLeft < 300 ? "timer-warning" : ""}`}>
              <span className="timer-icon">⏱️</span>
              <span className="timer-clock">{formatTime(timeLeft)}</span>
            </div>
          )}

          <div className="header-actions">
            <button
              type="button"
              className="exit-btn"
              onClick={() => {
                if (isSubmitted || window.confirm("Are you sure you want to leave the assessment? Your progress will be reset.")) {
                  onNavigate && onNavigate("home");
                }
              }}
            >
              Exit to Home
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* VIEW A: RESULT & CAPABILITY ANALYSIS SCREEN               */}
      {/* ========================================================= */}
      {isSubmitted ? (
        <main className="assessment-result-container">
          <div className="result-hero-card">
            <div className="result-badge-cluster">
              <span className="result-supertag">CAPABILITY ANALYSIS REPORT</span>
              <span className={`capability-pill ${capabilityTier.badgeClass}`}>
                {capabilityTier.icon} {capabilityTier.title}
              </span>
            </div>

            <h2 className="result-heading">
              Student Capability Diagnostic Result
            </h2>
            <p className="result-subheading">
              Course: <strong>Linear Algebra (MA25C02)</strong> • Regulation 2025 Syllabus Diagnostic
            </p>

            {/* Score Showcase Grid */}
            <div className="score-showcase-grid">
              <div className="score-card primary-score">
                <span className="card-lbl">Overall Score</span>
                <div className="big-score">
                  <span className="score-num">{score}</span>
                  <span className="score-total">/ 20</span>
                </div>
                <div className="score-percentage-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="score-pct-text">{percentage}% Marks Scored</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Correct Answers</span>
                <span className="stat-value stat-green">{score}</span>
                <span className="stat-sub">1 mark per question</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Incorrect / Unanswered</span>
                <span className="stat-value stat-red">{totalQuestions - score}</span>
                <span className="stat-sub">{unansweredCount} skipped</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Time Taken</span>
                <span className="stat-value stat-blue">
                  {formatTime(20 * 60 - timeLeft)}
                </span>
                <span className="stat-sub">20 min duration</span>
              </div>
            </div>

            {/* Competency Breakdown across the 4 units */}
            <div className="competency-section">
              <h3 className="section-title">
                📊 Capability Matrix by Core Mathematical Domain
              </h3>
              <div className="competency-grid">
                {Object.entries(domainBreakdown).map(([code, item]) => {
                  const unitPct = Math.round((item.correct / item.total) * 100);
                  return (
                    <div key={code} className="competency-card">
                      <div className="comp-header">
                        <span className="comp-name">{item.name}</span>
                        <span className="comp-marks">
                          <strong>{item.correct}</strong> / {item.total} marks ({unitPct}%)
                        </span>
                      </div>
                      <div className="comp-bar">
                        <div
                          className={`comp-fill ${unitPct >= 80 ? "fill-high" : unitPct >= 60 ? "fill-med" : "fill-low"}`}
                          style={{ width: `${unitPct}%` }}
                        ></div>
                      </div>
                      <span className="comp-status">
                        {unitPct >= 80
                          ? "✓ Strong Foundation"
                          : unitPct >= 60
                          ? "⚡ Moderate Familiarity"
                          : "⚠️ High Priority for Revision"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="recommendation-box">
              <div className="rec-header">
                <span className="rec-icon">🎯</span>
                <h4>EduVerse Personalized LMS Recommendation</h4>
              </div>
              <p className="rec-summary">{capabilityTier.summary}</p>
              <div className="rec-action">
                <strong>Recommended Next Action: </strong>
                {capabilityTier.actionRecommendation}
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="result-actions-toolbar">
              <button
                type="button"
                className="btn-review-answers"
                onClick={() => setShowSolutionReview(!showSolutionReview)}
              >
                {showSolutionReview ? "▲ Hide Detailed Solutions" : "▼ Review All 20 Questions & Explanations"}
              </button>

              <button
                type="button"
                className="btn-print-report"
                onClick={() => window.print()}
              >
                🖨️ Print / Save Diagnostic Slip
              </button>

              <button
                type="button"
                className="btn-retake"
                onClick={handleRetake}
              >
                🔄 Retake Assessment
              </button>

              <button
                type="button"
                className="btn-proceed-login"
                onClick={() => onNavigate && onNavigate("login")}
              >
                Proceed to Student Portal Login →
              </button>
            </div>

            {/* Detailed Question Review Section */}
            {showSolutionReview && (
              <div className="solutions-review-section">
                <h3 className="review-title">
                  Detailed Solutions & Mathematical Rationales (Questions 1 - 20)
                </h3>
                <div className="solutions-list">
                  {ASSESSMENT_QUESTIONS.map((q, idx) => {
                    const studentAns = selectedAnswers[q.id];
                    const isCorrect = studentAns === q.correctAnswer;
                    const isSkipped = !studentAns;

                    return (
                      <div
                        key={q.id}
                        className={`solution-card ${isCorrect ? "sol-correct" : isSkipped ? "sol-skipped" : "sol-wrong"}`}
                      >
                        <div className="sol-card-top">
                          <span className="sol-qnum">Question {idx + 1} • {q.domain}</span>
                          <span className={`sol-status-pill ${isCorrect ? "pill-correct" : isSkipped ? "pill-skipped" : "pill-wrong"}`}>
                            {isCorrect ? "✓ Correct (+1 Mark)" : isSkipped ? "○ Skipped (0 Marks)" : "✕ Incorrect (0 Marks)"}
                          </span>
                        </div>

                        <p className="sol-qtext">{q.question}</p>

                        <div className="sol-options-grid">
                          {q.options.map((opt) => {
                            const isSelected = studentAns === opt.id;
                            const isTheCorrectOne = q.correctAnswer === opt.id;

                            let optClass = "sol-option";
                            if (isTheCorrectOne) optClass += " opt-correct";
                            if (isSelected && !isTheCorrectOne) optClass += " opt-wrong-selected";

                            return (
                              <div key={opt.id} className={optClass}>
                                <span className="opt-key">{opt.id}</span>
                                <span className="opt-body">{opt.text}</span>
                                {isTheCorrectOne && <span className="opt-tag tag-correct">Correct Answer</span>}
                                {isSelected && !isTheCorrectOne && <span className="opt-tag tag-wrong">Your Choice</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div className="sol-explanation-box">
                          <strong>Step-by-Step Explanation: </strong>
                          <span>{q.explanation}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        /* ========================================================= */
        /* VIEW B: ACTIVE ASSESSMENT TEST WORKSPACE                  */
        /* ========================================================= */
        <main className="assessment-workspace">
          {/* Main Question Card Area */}
          <section className="question-workspace-area">
            <div className="q-meta-strip">
              <div className="q-domain-tag">
                <span className="domain-label">Section:</span>
                <span className="domain-val">{currentQ.domain}</span>
              </div>
              <div className="q-marks-tag">
                <span>1 Mark</span>
              </div>
            </div>

            <div className="question-card">
              <div className="q-card-header">
                <span className="q-index-pill">Question {currentQIndex + 1} of {totalQuestions}</span>
                <button
                  type="button"
                  className={`flag-btn ${flaggedQuestions[currentQ.id] ? "flagged" : ""}`}
                  onClick={handleToggleFlag}
                  title="Mark for review"
                >
                  {flaggedQuestions[currentQ.id] ? "🚩 Marked for Review" : "🏳️ Mark for Review"}
                </button>
              </div>

              <h2 className="q-title-text">{currentQ.question}</h2>

              {/* Options List */}
              <div className="q-options-container" role="radiogroup">
                {currentQ.options.map((option) => {
                  const isSelected = selectedAnswers[currentQ.id] === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`q-option-row ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <span className="q-opt-marker">{option.id}</span>
                      <span className="q-opt-text">{option.text}</span>
                      <span className="q-opt-radio">
                        <input
                          type="radio"
                          name={`q-${currentQ.id}`}
                          checked={isSelected}
                          onChange={() => handleSelectOption(option.id)}
                        />
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Bottom Question Controls */}
              <div className="q-card-footer">
                <div className="footer-left">
                  {selectedAnswers[currentQ.id] && (
                    <button
                      type="button"
                      className="clear-selection-btn"
                      onClick={handleClearAnswer}
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="footer-nav-btns">
                  <button
                    type="button"
                    className="nav-arrow-btn"
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  >
                    ← Previous
                  </button>

                  {currentQIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      className="nav-arrow-btn primary"
                      onClick={() => setCurrentQIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="nav-submit-prompt-btn"
                      onClick={() => setShowSubmitModal(true)}
                    >
                      Submit Assessment ➔
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Question Palette */}
          <aside className="question-palette-sidebar">
            <div className="palette-card">
              <h3 className="palette-title">Question Palette (20 Qs)</h3>

              {/* Legend */}
              <div className="palette-legend">
                <div className="legend-item">
                  <span className="legend-dot dot-answered"></span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot dot-flagged"></span>
                  <span>Flagged ({flaggedCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot dot-unanswered"></span>
                  <span>Unanswered ({unansweredCount})</span>
                </div>
              </div>

              {/* Numbers Grid (1 - 20) */}
              <div className="numbers-grid" role="navigation" aria-label="Question Navigation">
                {ASSESSMENT_QUESTIONS.map((q, idx) => {
                  const isCurrent = currentQIndex === idx;
                  const isAns = !!selectedAnswers[q.id];
                  const isFlag = !!flaggedQuestions[q.id];

                  let btnClass = "q-num-btn";
                  if (isAns) btnClass += " answered";
                  if (isFlag) btnClass += " flagged";
                  if (isCurrent) btnClass += " current";

                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={btnClass}
                      onClick={() => setCurrentQIndex(idx)}
                      title={`Go to Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Quick Summary */}
              <div className="palette-progress-summary">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {answeredCount} of {totalQuestions} answered ({Math.round((answeredCount / totalQuestions) * 100)}%)
                </span>
              </div>

              <div className="sidebar-submit-container">
                <button
                  type="button"
                  className="sidebar-submit-btn"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit & Analyze Capability
                </button>
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* Confirmation Submission Modal */}
      {showSubmitModal && (
        <div
          className="assessment-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSubmitModal(false);
          }}
        >
          <div className="assessment-confirm-modal">
            <div className="modal-icon-badge">📝</div>
            <h3>Ready to Submit Assessment?</h3>
            <p>
              You have answered <strong>{answeredCount}</strong> out of <strong>{totalQuestions}</strong> questions.
            </p>

            {unansweredCount > 0 && (
              <div className="modal-warning-box">
                ⚠️ You have <strong>{unansweredCount}</strong> unanswered questions. Each correct question awards 1 mark (Total: 20 marks).
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={() => setShowSubmitModal(false)}
              >
                Review Answers
              </button>
              <button
                type="button"
                className="modal-btn-confirm"
                onClick={handleFinalSubmit}
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessment;
