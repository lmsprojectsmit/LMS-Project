import { useState, useEffect } from "react";
import { API_BASE_URL, getStudentId } from "./api";
import "./Assessment.css";

// =============================================================
// THREE STUDENT ACADEMIC CATEGORIES & ASSIGNED LESSONS
// =============================================================
export const STUDENT_CATEGORIES = {
  category1: {
    id: "category1",
    name: "Foundational Track",
    title: "Category 1: Foundational Track (Remediation & Core Basics)",
    tag: "Category 1 (0 – 14 Marks)",
    minMarks: 0,
    maxMarks: 14,
    badgeClass: "badge-cat-1",
    themeColor: "#b45309",
    icon: "🥉",
    level: "Beginner / Remedial Support",
    scoreRangeLabel: "0 – 14 Marks (< 50%)",
    summary: "This track is designed for students requiring foundational support and remediation in core Linear Algebra concepts.",
    targetOutcome: "Rebuild core computational confidence through guided video proofs, formula sheets, and remedial row-reduction drills.",
    lessons: [
      {
        id: "L1.1",
        code: "LA-F101",
        unit: "Unit I: Matrix Algebra",
        title: "Matrix Basics, Properties & Arithmetic Operations",
        duration: "40 mins",
        problems: "8 Guided Exercises",
        difficulty: "Beginner",
        objectives: "Master row-column dimensions, conditions for valid matrix multiplication, and transpose symmetry properties.",
        keyFormula: "(AB)_{ij} = \\sum_{k=1}^n a_{ik} b_{kj} \\quad \\text{and} \\quad (AB)^T = B^T A^T",
        notes: "Matrix multiplication AB is valid only when the number of columns in A matches the number of rows in B. In general, matrix multiplication is NOT commutative (AB ≠ BA). Symmetric matrices satisfy Aᵀ = A, whereas skew-symmetric matrices satisfy Aᵀ = -A with all diagonal entries strictly equal to 0.",
        practiceProblem: "If matrix A has size 2×3 and B has size 3×4, what is the order of (AB)ᵀ? Does A + B exist? (Solution: (AB)ᵀ has dimension 4×2; A + B is undefined because dimensions 2×3 and 3×4 do not match)."
      },
      {
        id: "L1.2",
        code: "LA-F102",
        unit: "Unit II: Determinants",
        title: "Determinant Computation & Invertibility Fundamentals",
        duration: "50 mins",
        problems: "10 Step-by-Step Drills",
        difficulty: "Beginner",
        objectives: "Compute 2×2 and 3×3 determinants via cofactor expansion and understand why det(A) = 0 prevents matrix inversion.",
        keyFormula: "\\det\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix} = ad - bc \\quad \\text{and} \\quad A^{-1} = \\frac{1}{\\det(A)}\\text{adj}(A)",
        notes: "If det(A) = 0, the matrix is singular and has no inverse because division by zero is undefined. Multiplying an n×n matrix by scalar k scales the determinant by kⁿ. If any two rows are identical, det(A) = 0.",
        practiceProblem: "Calculate det(A) for A = [[3, 4], [2, 5]], and verify if A is invertible. (Solution: det(A) = 15 - 8 = 7 ≠ 0, so A is invertible and det(A⁻¹) = 1/7 = 0.25)."
      },
      {
        id: "L1.3",
        code: "LA-F103",
        unit: "Unit I: Echelon Forms",
        title: "Elementary Row Operations & Row Echelon Form (REF)",
        duration: "60 mins",
        problems: "12 Worked Problems",
        difficulty: "Beginner / Intermediate",
        objectives: "Perform row switching, scaling, and addition without arithmetic errors to reduce augmented matrices to row echelon form.",
        keyFormula: "R_i \\leftrightarrow R_j, \\quad R_i \\leftarrow k R_i, \\quad R_i \\leftarrow R_i + k R_j",
        notes: "Row echelon form requires all non-zero rows to be placed above all-zero rows, and the leading coefficient (pivot) of each row must be strictly to the right of the row above it.",
        practiceProblem: "Reduce the matrix [[1, 2, 3], [2, 5, 8], [3, 8, 14]] to row echelon form and determine its rank. (Solution: Rank is 2 because row 3 is a linear combination of rows 1 and 2)."
      },
      {
        id: "L1.4",
        code: "LA-F104",
        unit: "Unit III: Linear Equations",
        title: "Introduction to Linear Systems & Consistency Checks",
        duration: "45 mins",
        problems: "6 Application Problems",
        difficulty: "Beginner",
        objectives: "Set up the augmented matrix [A|B] and identify consistent systems versus inconsistent systems.",
        keyFormula: "\\text{Consistent if } \\text{Rank}(A) = \\text{Rank}([A|B])",
        notes: "If Gaussian reduction produces an impossible row like [0 0 0 | c] with c ≠ 0, the system is inconsistent and has no solution. Homogeneous systems AX = 0 are always consistent (trivial solution X = 0).",
        practiceProblem: "State whether 2x + 3y = 5 and 4x + 6y = 12 has a solution. (Solution: Inconsistent because Rank(A) = 1 while Rank([A|B]) = 2)."
      }
    ]
  },
  category2: {
    id: "category2",
    name: "Core Engineering Track",
    title: "Category 2: Core Engineering Track (Standard University Level)",
    tag: "Category 2 (15 – 22 Marks)",
    minMarks: 15,
    maxMarks: 22,
    badgeClass: "badge-cat-2",
    themeColor: "#4338ca",
    icon: "🥈",
    level: "Intermediate / Standard University Pace",
    scoreRangeLabel: "15 – 22 Marks (50% – 75%)",
    summary: "This track focuses on mastering standard university exam problem sets and core linear algebra theorems.",
    targetOutcome: "Master the standard MA25C02 syllabus to secure top university grades (A / A+) through structured problem-solving drills and theorem applications.",
    lessons: [
      {
        id: "L2.1",
        code: "LA-C201",
        unit: "Unit III: Rank & Linear Systems",
        title: "Rank-Nullity Theorem & Parametric Solutions",
        duration: "55 mins",
        problems: "10 Exam Problems",
        difficulty: "Intermediate",
        objectives: "Apply the Rank-Nullity theorem to linear transformations and write general parametric solutions for systems with infinite solutions.",
        keyFormula: "\\text{Rank}(T) + \\text{Nullity}(T) = \\dim(V) = n, \\quad \\text{Free Variables} = n - r",
        notes: "When Rank(A) = r < n in a consistent system of n unknowns, there are (n - r) linearly independent free parameters. Nullity represents the dimension of the solution space of the homogeneous system AX = 0.",
        practiceProblem: "A linear transformation T: R⁵ -> R³ has Rank(T) = 3. What is the dimension of the null space (Nullity)? (Solution: Nullity = 5 - 3 = 2)."
      },
      {
        id: "L2.2",
        code: "LA-C202",
        unit: "Unit IV: Eigenvalues",
        title: "Characteristic Polynomials & Eigenvector Computation",
        duration: "65 mins",
        problems: "12 University Problems",
        difficulty: "Intermediate",
        objectives: "Solve det(A - λI) = 0 for 2×2 and 3×3 matrices, compute non-trivial eigenvectors, and verify roots using trace and determinant.",
        keyFormula: "\\det(A - \\lambda I) = 0, \\quad \\sum \\lambda_i = \\text{Tr}(A), \\quad \\prod \\lambda_i = \\det(A)",
        notes: "Always double-check eigenvalues using the two essential invariants: their sum must equal Trace(A), and their product must equal det(A). If λ is an eigenvalue of A, then 1/λ is an eigenvalue of A⁻¹.",
        practiceProblem: "Find the eigenvalues of A = [[4, 1], [2, 3]]. Verify using trace and determinant. (Solution: λ = 5 and λ = 2. Trace = 7, Det = 10)."
      },
      {
        id: "L2.3",
        code: "LA-C203",
        unit: "Unit IV: Cayley-Hamilton",
        title: "Cayley-Hamilton Theorem & High-Power Inverses",
        duration: "50 mins",
        problems: "8 Exam Proofs",
        difficulty: "Intermediate",
        objectives: "Verify that every square matrix satisfies its own characteristic equation and compute A⁻¹ and A⁴ using polynomial identities.",
        keyFormula: "A^n + c_{n-1} A^{n-1} + \\dots + c_0 I = 0 \\implies A^{-1} = -\\frac{1}{c_0}(A^{n-1} + \\dots + c_1 I)",
        notes: "Cayley-Hamilton allows finding inverse matrices without calculating adjugates and determinants of large sizes. It also enables expressing high powers Aᵏ as linear combinations of lower powers.",
        practiceProblem: "If the characteristic equation of A is A² - 5A + 6I = 0, express A⁻¹ and A³ in terms of A and I. (Solution: A⁻¹ = (5I - A)/6; A³ = 19A - 30I)."
      },
      {
        id: "L2.4",
        code: "LA-C204",
        unit: "Unit III: Vector Spaces",
        title: "Vector Spaces, Linear Independence & Basis Finding",
        duration: "50 mins",
        problems: "8 Vector Sets",
        difficulty: "Intermediate",
        objectives: "Test sets of vectors for linear independence and construct bases for column spaces and null spaces.",
        keyFormula: "c_1 v_1 + c_2 v_2 + \\dots + c_k v_k = 0 \\iff c_1 = c_2 = \\dots = c_k = 0",
        notes: "A set of vectors is a basis if it is both linearly independent and spans the vector space. The number of vectors in any basis is the unique dimension of that space.",
        practiceProblem: "Determine whether v1 = (1, 2, 3), v2 = (2, 4, 6), v3 = (0, 1, 1) are linearly independent. (Solution: Dependent, because v2 = 2 · v1)."
      }
    ]
  },
  category3: {
    id: "category3",
    name: "Advanced Scholars Track",
    title: "Category 3: Advanced Scholars Track (Honors & Applications)",
    tag: "Category 3 (23 – 30 Marks)",
    minMarks: 23,
    maxMarks: 30,
    badgeClass: "badge-cat-3",
    themeColor: "#059669",
    icon: "🥇",
    level: "Advanced / Honors & Research",
    scoreRangeLabel: "23 – 30 Marks (> 75%)",
    summary: "This track is designed for students with exceptional analytical proficiency, focusing on advanced applications and rigorous proofs.",
    targetOutcome: "Prepare for engineering research, graduate-level machine learning linear algebra, and top academic honors (O Grade).",
    lessons: [
      {
        id: "L3.1",
        code: "LA-A301",
        unit: "Unit IV: Diagonalization",
        title: "Matrix Diagonalization & Orthogonal Similarity",
        duration: "60 mins",
        problems: "8 Advanced Proofs",
        difficulty: "Advanced",
        objectives: "Determine if a matrix is diagonalizable (algebraic = geometric multiplicity) and construct modal matrix P such that P⁻¹ A P = D.",
        keyFormula: "A = P D P^{-1} \\implies A^k = P D^k P^{-1}, \\quad \\text{where } D = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)",
        notes: "Symmetric real matrices are always orthogonally diagonalizable with real eigenvalues and orthogonal eigenvectors. Diagonalization dramatically simplifies evaluating dynamic systems and discrete differential equations.",
        practiceProblem: "Orthogonally diagonalize the symmetric matrix A = [[3, 1], [1, 3]]. Construct the orthogonal matrix P. (Solution: D = diag(4, 2), P = [[1/√2, -1/√2], [1/√2, 1/√2]])."
      },
      {
        id: "L3.2",
        code: "LA-A302",
        unit: "Unit V: Inner Product Spaces",
        title: "Gram-Schmidt Orthogonalization & Projections",
        duration: "65 mins",
        problems: "8 Vector Computations",
        difficulty: "Advanced",
        objectives: "Transform an arbitrary vector basis into an orthonormal basis using the Gram-Schmidt process and compute orthogonal projection operators.",
        keyFormula: "u_k = v_k - \\sum_{j=1}^{k-1} \\frac{\\langle v_k, u_j \\rangle}{\\langle u_j, u_j \\rangle} u_j, \\quad e_k = \\frac{u_k}{\\|u_k\\|}",
        notes: "Orthonormal bases eliminate cross-terms in vector projections and facilitate QR decomposition (A = QR), which forms the basis for modern computer algorithms computing eigenvalues.",
        practiceProblem: "Apply Gram-Schmidt to convert v1 = (1, 1, 0) and v2 = (1, 2, 0) into an orthonormal set in R³. (Solution: e1 = (1/√2, 1/√2, 0), e2 = (-1/√2, 1/√2, 0))."
      },
      {
        id: "L3.3",
        code: "LA-A303",
        unit: "Unit V: SVD & Applications",
        title: "Singular Value Decomposition (SVD) & Data Compression",
        duration: "75 mins",
        problems: "6 Case Studies",
        difficulty: "Advanced",
        objectives: "Decompose rectangular matrices into A = U Σ Vᵀ and understand low-rank approximations used in PCA and machine learning.",
        keyFormula: "A = U \\Sigma V^T = \\sum_{i=1}^r \\sigma_i u_i v_i^T, \\quad \\sigma_i = \\sqrt{\\lambda_i(A^T A)}",
        notes: "SVD works for ANY matrix (even non-square and singular). Singular values are the square roots of the eigenvalues of Aᵀ A. The Moore-Penrose pseudo-inverse A⁺ = V Σ⁺ Uᵀ provides optimal least-squares solutions.",
        practiceProblem: "Compute the non-zero singular values of A = [[3, 0], [0, -4]]. (Solution: Singular values are | -4 | = 4 and 3)."
      },
      {
        id: "L3.4",
        code: "LA-A304",
        unit: "Unit IV: Quadratic Forms",
        title: "Quadratic Forms, Canonical Reductions & Definiteness",
        duration: "60 mins",
        problems: "10 Analytical Tasks",
        difficulty: "Advanced",
        objectives: "Represent quadratic forms as Xᵀ A X, apply orthogonal transformations to find canonical forms, and classify definiteness via eigenvalues.",
        keyFormula: "Q(X) = X^T A X = \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\dots + \\lambda_n y_n^2",
        notes: "A quadratic form is positive definite if all eigenvalues are strictly positive (>0); positive semi-definite if all eigenvalues ≥ 0; and indefinite if eigenvalues have mixed signs.",
        practiceProblem: "Classify the quadratic form Q(x1, x2) = 2x1² + 2x1 x2 + 2x2². (Solution: Symmetric matrix is [[2, 1], [1, 2]]. Eigenvalues are 3 and 1 > 0, so it is strictly Positive Definite)."
      }
    ]
  }
};

function Assessment({ onNavigate, studentInfo }) {
  // Data state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Fetch questions from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/diagnostic/questions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((q) => ({
          id: q.question_number,
          domain: q.topic,
          domainCode: q.topic,
          question: q.question_text,
          options: [
            { id: "A", text: q.options.A },
            { id: "B", text: q.options.B },
            { id: "C", text: q.options.C },
            { id: "D", text: q.options.D },
          ],
          difficulty: q.difficulty,
        }));
        setQuestions(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to connect to the learning server. Please try again.");
        setLoading(false);
      });
  }, []);

  // Test state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: "A" | "B" | ... }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes countdown (1500 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Solutions review filter: "all" | "false" | "correct"
  const [solutionFilter, setSolutionFilter] = useState("all");

  // Track exploration tab state
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);

  // Lesson notes modal state
  const [activeLessonModal, setActiveLessonModal] = useState(null);

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
    const currentQ = questions[currentQIndex];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    const currentQ = questions[currentQIndex];
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleClearAnswer = () => {
    const currentQ = questions[currentQIndex];
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

  const handleFinalSubmit = async () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        student_id: getStudentId(studentInfo),
        answers: Object.entries(selectedAnswers).map(([qNum, ans]) => ({
          question_number: parseInt(qNum, 10),
          selected_answer: ans,
        })),
      };

      const res = await fetch(`${API_BASE_URL}/api/diagnostic/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || errData.message || "Submission failed");
      }

      const result = await res.json();
      setDiagnosticResult(result);

      setShowSubmitModal(false);
      setIsSubmitted(true);
      setIsTimerRunning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(25 * 60);
    setCurrentQIndex(0);
    setIsSubmitted(false);
    setSolutionFilter("all");
    setActiveCategoryTab(null);
    setActiveLessonModal(null);
    setIsTimerRunning(true);
    setDiagnosticResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compute Analytics
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  let score = 0;
  let percentage = 0;
  let assignedCategoryId = "category1";
  let domainBreakdown = {};
  let weakTopics = [];
  
  if (diagnosticResult) {
    score = diagnosticResult.score;
    percentage = diagnosticResult.percentage;
    const band = diagnosticResult.diagnostic_band;
    if (band === "Green") assignedCategoryId = "category3";
    else if (band === "Amber") assignedCategoryId = "category2";
    else assignedCategoryId = "category1";

    Object.entries(diagnosticResult.topic_analysis).forEach(([topic, data]) => {
      domainBreakdown[topic] = {
        name: topic,
        correct: data.correct_answers,
        total: data.total_questions,
      };
      
      // Data-Driven Weak Topic Identification (< 60%)
      if (data.percentage < 60) {
        weakTopics.push(topic);
      }
    });
  }

  const incorrectCount = totalQuestions - score;
  const assignedCategory = STUDENT_CATEGORIES[assignedCategoryId] || STUDENT_CATEGORIES.category1;

  // Active viewed category tab defaults to assigned category
  const currentViewedCategoryId = activeCategoryTab || assignedCategoryId;
  const currentViewedCategory = STUDENT_CATEGORIES[currentViewedCategoryId] || STUDENT_CATEGORIES.category1;

  const currentQ = questions[currentQIndex];

  if (loading) return <div className="assessment-page" style={{padding: '50px', color: 'white', textAlign: 'center'}}><h2>Loading diagnostic questions...</h2></div>;
  if (error) return <div className="assessment-page" style={{padding: '50px', color: 'red', textAlign: 'center'}}><h2>{error}</h2></div>;
  if (questions.length === 0) return <div className="assessment-page" style={{padding: '50px', color: 'white', textAlign: 'center'}}><h2>No questions found.</h2></div>;

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
            {/* Supertag */}
            <div className="result-badge-cluster">
              <span className="result-supertag">ASSESSMENT COMPLETED • CAPABILITY REPORT</span>
            </div>

            <h2 className="result-heading">
              Student Capability Profiling & Assigned Curriculum
            </h2>
            <p className="result-subheading">
              Course: <strong>Linear Algebra (MA25C02)</strong> • Evaluated on {totalQuestions} Questions (1 Mark Each) • 25 Minutes Duration
            </p>

            {/* Score Showcase Grid */}
            <div className="score-showcase-grid">
              <div className="score-card primary-score">
                <span className="card-lbl">Overall Score</span>
                <div className="big-score">
                  <span className="score-num">{score}</span>
                  <span className="score-total">/ {totalQuestions}</span>
                </div>
                <div className="score-percentage-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="score-pct-text">{percentage}% Total Marks</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Correct Answers</span>
                <span className="stat-value stat-green">✅ {score}</span>
                <span className="stat-sub">{score} marks earned</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">False / Incorrect Answers</span>
                <span className="stat-value stat-red">❌ {incorrectCount}</span>
                <span className="stat-sub">{unansweredCount} skipped, {answeredCount - score} wrong</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Assigned Academic Track</span>
                <span className="stat-value" style={{ color: assignedCategory.themeColor }}>
                  {assignedCategory.icon} {assignedCategory.name}
                </span>
                <span className="stat-sub">{assignedCategory.level}</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3 STUDENT CATEGORIES & DYNAMIC LESSON ASSIGNMENT HUB      */}
            {/* ========================================================= */}
            <section className="category-assignment-hub">
              {/* Category Track Switcher Tabs */}
              <div className="category-track-tabs">
                {Object.values(STUDENT_CATEGORIES).map((cat) => {
                  const isAssigned = cat.id === assignedCategoryId;
                  const isViewing = cat.id === currentViewedCategoryId;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cat-tab-btn ${cat.badgeClass} ${isViewing ? "active-tab" : ""}`}
                      onClick={() => setActiveCategoryTab(cat.id)}
                    >
                      <span className="cat-tab-icon">{cat.icon}</span>
                      <div className="cat-tab-info">
                        <span className="cat-tab-title">{cat.name}</span>
                        <span className="cat-tab-range">{cat.scoreRangeLabel}</span>
                      </div>
                      {isAssigned && (
                        <span className="cat-assigned-marker">
                          🎯 YOUR TRACK
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Category Information Card */}
              <div className={`active-category-card ${currentViewedCategory.badgeClass}`}>
                <div className="acc-header">
                  <div className="acc-title-cluster">
                    <span className="acc-icon">{currentViewedCategory.icon}</span>
                    <div>
                      <h4 className="acc-name">{currentViewedCategory.title}</h4>
                      <p className="acc-summary">{currentViewedCategory.summary}</p>
                    </div>
                  </div>
                  {currentViewedCategory.id === assignedCategoryId ? (
                    <span className="acc-status-tag assigned">
                      ✓ Assigned to You Based on Your Score
                    </span>
                  ) : (
                    <span className="acc-status-tag view-only">
                      Previewing Other Track
                    </span>
                  )}
                </div>

                <div className="acc-target-box">
                  <strong>Target Academic Objective: </strong>
                  <span>{currentViewedCategory.targetOutcome}</span>
                </div>

                {currentViewedCategory.id === assignedCategoryId && (
                  <div className="acc-weak-topics-box" style={{ marginTop: '15px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #f87171' }}>
                    <h5 style={{ margin: '0 0 8px 0', color: '#fca5a5', fontSize: '15px' }}>
                      ⚠️ Identified Focus Areas (Data-Driven)
                    </h5>
                    {weakTopics.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '22px', color: '#e5e7eb', fontSize: '14px', lineHeight: '1.5' }}>
                        {weakTopics.map((topic, i) => (
                          <li key={i}><strong>{topic}</strong> — Recommended for remediation</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: 0, color: '#6ee7b7', fontSize: '14px' }}>
                        🌟 Great job! No critical weak topics identified. Keep up the good work.
                      </p>
                    )}
                  </div>
                )}

                {/* Assigned Lessons Grid */}
                <div className="assigned-lessons-grid">
                  {currentViewedCategory.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className="lesson-card">
                      <div className="lesson-card-top">
                        <span className="lesson-unit-badge">{lesson.unit}</span>
                        <span className="lesson-code-pill">{lesson.code}</span>
                        <span className="lesson-diff-pill">{lesson.difficulty}</span>
                      </div>

                      <h4 className="lesson-title">
                        {lIdx + 1}. {lesson.title}
                      </h4>

                      <p className="lesson-objectives">
                        {lesson.objectives}
                      </p>

                      <div className="lesson-meta-row">
                        <span className="l-meta">⏱️ {lesson.duration}</span>
                        <span className="l-meta">📝 {lesson.problems}</span>
                      </div>

                      <button
                        type="button"
                        className="btn-open-lesson"
                        onClick={() => setActiveLessonModal(lesson)}
                      >
                        <span>📖 Open Lesson Notes & Exercises</span>
                        <span className="l-arrow">➔</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Competency Breakdown across the 4 units */}
            <div className="competency-section">
              <h3 className="section-title">
                📊 Detailed Performance by Mathematical Domain
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

            {/* Actions Toolbar */}
            <div className="result-actions-toolbar">
              <button
                type="button"
                className="btn-print-report"
                onClick={() => window.print()}
              >
                🖨️ Print / Save Diagnostic Report
              </button>

              <button
                type="button"
                className="btn-proceed-home"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  const studentPayload = {
                    ...(studentInfo || {}),
                    fullName: studentInfo?.fullName || "Enrolled Student",
                    email: studentInfo?.email || "student@institution.edu",
                    role: "student",
                    score,
                    maxScore: totalQuestions,
                    category: assignedCategoryId,
                    categoryLabel: assignedCategory.title,
                    categoryBadge: assignedCategory.badgeClass,
                    hasTakenAssessment: true,
                    domainScores: domainBreakdown,
                    scrollTo: "linear-algebra",
                  };
                  if (onNavigate) onNavigate("home", studentPayload);
                }}
              >
                <span>🏠 Go to Home Page</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="btn-proceed-syllabus"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  const studentPayload = {
                    ...(studentInfo || {}),
                    fullName: studentInfo?.fullName || "Enrolled Student",
                    email: studentInfo?.email || "student@institution.edu",
                    role: "student",
                    score,
                    maxScore: totalQuestions,
                    category: assignedCategoryId,
                    categoryLabel: assignedCategory.title,
                    categoryBadge: assignedCategory.badgeClass,
                    hasTakenAssessment: true,
                    domainScores: domainBreakdown,
                  };
                  if (onNavigate) onNavigate("syllabus", studentPayload);
                }}
              >
                <span>📖 Go to Unit-Wise Syllabus</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="btn-proceed-login"
                onClick={() => {
                  const studentPayload = {
                    ...(studentInfo || {}),
                    role: "student",
                    score,
                    maxScore: totalQuestions,
                    category: assignedCategoryId,
                    categoryLabel: assignedCategory.title,
                    categoryBadge: assignedCategory.badgeClass,
                    hasTakenAssessment: true,
                    domainScores: domainBreakdown,
                  };
                  if (onNavigate) onNavigate("login", studentPayload);
                }}
              >
                Proceed to Student Portal Login →
              </button>
            </div>

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
              <h3 className="palette-title">Question Palette ({totalQuestions} Qs)</h3>

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
                {questions.map((q, idx) => {
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
                  Submit & View Explanations
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
                ⚠️ You have <strong>{unansweredCount}</strong> unanswered questions. Each correct question awards 1 mark (Total: {totalQuestions} marks).
              </div>
            )}

            <p style={{ fontSize: "13px", color: "#4338ca", fontWeight: "600", marginBottom: "20px" }}>
              💡 Upon submission, you will be grouped into 1 of 3 academic tracks and assigned customized lessons based on your marks.
            </p>

            <div className="modal-actions">
              {submitError && <div style={{color: 'red', width: '100%', marginBottom: '10px'}}>{submitError}</div>}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Yes, Submit Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE LESSON READER MODAL                           */}
      {/* ========================================================= */}
      {activeLessonModal && (
        <div
          className="assessment-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveLessonModal(null);
          }}
        >
          <div className="lesson-study-reader-modal">
            <div className="reader-header">
              <div>
                <span className="reader-unit-pill">{activeLessonModal.unit} • {activeLessonModal.code}</span>
                <h3 className="reader-title">{activeLessonModal.title}</h3>
                <span className="reader-meta">⏱️ {activeLessonModal.duration} • 📝 {activeLessonModal.problems} • {activeLessonModal.difficulty}</span>
              </div>
              <button
                type="button"
                className="reader-close-btn"
                onClick={() => setActiveLessonModal(null)}
                aria-label="Close lesson reader"
              >
                ✕
              </button>
            </div>

            <div className="reader-body">
              <div className="reader-block">
                <h4 className="reader-sec-title">🎯 Core Learning Objectives</h4>
                <p>{activeLessonModal.objectives}</p>
              </div>

              <div className="reader-block">
                <h4 className="reader-sec-title">📖 Comprehensive Study Notes & Principles</h4>
                <p className="reader-notes-text">{activeLessonModal.notes}</p>
              </div>

              <div className="reader-block practice-highlight">
                <h4 className="reader-sec-title">✏️ Recommended University Practice Drill</h4>
                <p className="reader-practice-text">{activeLessonModal.practiceProblem}</p>
              </div>
            </div>

            <div className="reader-footer">
              <button
                type="button"
                className="btn-mark-ready"
                style={{ background: "linear-gradient(135deg, #4f46e5, #4338ca)", color: "#ffffff", border: "none" }}
                onClick={() => {
                  setActiveLessonModal(null);
                  if (onNavigate) {
                    onNavigate("lesson", {
                      code: activeLessonModal.code,
                      name: activeLessonModal.title,
                      unitNumber: activeLessonModal.unit ? activeLessonModal.unit.split(":")[0] : "UNIT",
                      unitTitle: activeLessonModal.unit || "Linear Algebra",
                      desc: activeLessonModal.notes,
                      student: { ...(studentInfo || {}), role: "student" },
                    });
                  }
                }}
              >
                ▶️ Open Interactive Video & Notes
              </button>
              <button
                type="button"
                className="btn-mark-ready"
                onClick={() => {
                  alert(`Lesson "${activeLessonModal.title}" recorded as In-Progress in your EduVerse LMS Profile.`);
                  setActiveLessonModal(null);
                }}
              >
                ✓ Mark as Read
              </button>
              <button
                type="button"
                className="btn-close-reader"
                onClick={() => setActiveLessonModal(null)}
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessment;
