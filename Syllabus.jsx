import React, { useState } from "react";
import "./Syllabus.css";

const SYLLABUS_UNITS = [
  {
    id: "unit1",
    unitNumber: "UNIT I",
    title: "Vector Spaces",
    shortTitle: "Vector Spaces & Subspaces",
    hours: "12 Hours",
    lectureWeight: "25%",
    themeColor: "#4f46e5",
    badgeClass: "badge-unit1",
    icon: "📐",
    bookReference: "Dr. G. Balaji, Chapter 1 (Pages 1.1 – 1.84)",
    overview:
      "Foundations of modern linear algebra covering abstract vector spaces, subspace verification, linear combinations, spanning sets, independence testing, basis construction, dimension theorems, and coordinate transformations.",
    learningOutcomes: [
      "Verify whether a given algebraic set and operations form a valid Vector Space over ℝ.",
      "Determine if a subset forms a subspace using the two-step closure test.",
      "Test sets of vectors for linear independence or dependence via matrix rank and determinants.",
      "Construct a minimal basis for subspaces and calculate the precise vector space dimension.",
      "Compute coordinate representations and transition matrices for change of basis."
    ],
    topics: [
      {
        code: "1.1",
        name: "Vector Spaces & Axioms",
        desc: "Definition of vector spaces over ℝ, 10 fundamental axioms (addition & scalar multiplication closures, commutativity, associativity, zero element, additive inverse, distributive laws), standard examples ℝⁿ, Pₙ(t), Mₘ×ₙ(ℝ)."
      },
      {
        code: "1.2",
        name: "Subspaces & Criteria",
        desc: "Definition of subspace, two-step test (closure under addition and scalar multiplication), examples of subspaces in ℝ³ (lines and planes through the origin), intersection and sum of subspaces."
      },
      {
        code: "1.3",
        name: "Linear Combinations & Spanning Sets",
        desc: "Linear combinations of vectors, Span(S), geometric meaning of span, spanning sets, verifying if a vector belongs to Span{v₁, v₂, ..., vₖ} using augmented matrices."
      },
      {
        code: "1.4",
        name: "Linear Independence & Dependence",
        desc: "Formal definitions, testing independence of vector sets via homogeneous systems Ax = 0, Wronskian method for function spaces, geometric interpretation of collinearity and coplanarity."
      },
      {
        code: "1.5",
        name: "Basis & Dimension",
        desc: "Definition of a Basis (linearly independent + spanning set), standard bases for ℝⁿ and polynomial spaces, Dimension theorem, dimension of sum of subspaces: dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)."
      },
      {
        code: "1.6",
        name: "Coordinates & Change of Basis",
        desc: "Coordinate vector relative to an ordered basis [v]ᵦ, transition matrices P_{B→B'}, invertible basis transformation formulas, and coordinate change in ℝ² and ℝ³."
      }
    ],
    examQuestions: [
      "Prove that the set of all 2×2 symmetric matrices forms a subspace of M₂×₂(ℝ) and find its dimension.",
      "Determine whether the vectors v₁ = (1, 2, 1), v₂ = (2, 1, 0), v₃ = (1, -1, -1) form a basis for ℝ³.",
      "Find the coordinate vector of p(x) = 2x² - 3x + 5 with respect to standard basis {1, x, x²}."
    ]
  },
  {
    id: "unit2",
    unitNumber: "UNIT II",
    title: "Linear Transformations & Diagonalization",
    shortTitle: "Transformations & Eigenvalues",
    hours: "11 Hours",
    lectureWeight: "25%",
    themeColor: "#0284c7",
    badgeClass: "badge-unit2",
    icon: "🔄",
    bookReference: "Dr. G. Balaji, Chapter 2 (Pages 2.1 – 2.112)",
    overview:
      "Mathematical mappings preserving linear operations, matrix representations, Kernel (Null space) and Range (Image), the foundational Rank-Nullity Theorem, characteristic equations, eigenvalues, eigenvectors, Cayley-Hamilton theorem, and matrix diagonalization.",
    learningOutcomes: [
      "Represent linear transformations between finite-dimensional spaces using standard matrices.",
      "Compute the Kernel (Null space) and Range (Image) of a linear transformation.",
      "Apply the Rank-Nullity Theorem: dim(V) = rank(T) + nullity(T) to check invertibility and solvability.",
      "Find eigenvalues and corresponding eigenvectors for square matrices.",
      "Verify the Cayley-Hamilton theorem and compute inverse and higher matrix powers.",
      "Diagonalize diagonalizable matrices using similarity transformations P⁻¹AP = D."
    ],
    topics: [
      {
        code: "2.1",
        name: "Linear Transformations & Properties",
        desc: "Definition T(u + v) = T(u) + T(v) and T(c·u) = c·T(u), preservation of zero vector and linear combinations, geometric transformations in ℝ² (rotations, reflections, shears, scalings)."
      },
      {
        code: "2.2",
        name: "Matrix Representation of Transformations",
        desc: "Constructing matrix [T]_{B,C} using column images of basis vectors, composite transformations and matrix multiplication, inverse transformations."
      },
      {
        code: "2.3",
        name: "Kernel, Range & Rank-Nullity Theorem",
        desc: "Null space Ker(T) = {v : T(v) = 0}, Range space Im(T) = {T(v)}, dimension of null space (nullity) and dimension of range (rank), Dimension theorem / Rank-Nullity Theorem: dim(V) = rank(T) + nullity(T)."
      },
      {
        code: "2.4",
        name: "Eigenvalues & Eigenvectors",
        desc: "Characteristic equation det(A - λI) = 0, algebraic and geometric multiplicity of eigenvalues, properties: trace(A) = sum of eigenvalues, det(A) = product of eigenvalues, eigenvalues of triangular matrices."
      },
      {
        code: "2.5",
        name: "Cayley-Hamilton Theorem",
        desc: "Statement: Every square matrix satisfies its own characteristic equation, practical applications: finding A⁻¹ without determinants, evaluating high-degree matrix polynomials A⁴, A⁵."
      },
      {
        code: "2.6",
        name: "Diagonalization of Matrices",
        desc: "Condition for diagonalizability (n linearly independent eigenvectors), modal matrix P and spectral diagonal matrix D = P⁻¹AP, powers of diagonalized matrices Aᵏ = P Dᵏ P⁻¹."
      }
    ],
    examQuestions: [
      "Verify the Rank-Nullity theorem for the linear operator T: ℝ³ → ℝ³ defined by T(x, y, z) = (x + y, y + z, x - z).",
      "Using Cayley-Hamilton Theorem, find A⁻¹ and A³ for A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]].",
      "Diagonalize the symmetric matrix A = [[3, 1], [1, 3]] and hence compute A⁴."
    ]
  },
  {
    id: "unit3",
    unitNumber: "UNIT III",
    title: "Inner Product Spaces",
    shortTitle: "Inner Products & Orthogonality",
    hours: "11 Hours",
    lectureWeight: "25%",
    themeColor: "#059669",
    badgeClass: "badge-unit3",
    icon: "⚡",
    bookReference: "Dr. G. Balaji, Chapter 3 (Pages 3.1 – 3.76)",
    overview:
      "Extending geometry and angle concepts to abstract spaces with inner products, vector norms, distance metrics, Cauchy-Schwarz and triangle inequalities, orthogonal vectors and complements, the Gram-Schmidt orthogonalization process, orthonormal bases, and best approximation projection theory.",
    learningOutcomes: [
      "Define and evaluate inner products for Euclidean ℝⁿ, function spaces C[a, b], and matrix spaces.",
      "Calculate norms, distances, and angles between vectors in an inner product space.",
      "Prove and apply Cauchy-Schwarz inequality |⟨u, v⟩| ≤ ||u|| ||v|| and Triangle inequality.",
      "Convert any linearly independent basis into an orthonormal basis using the Gram-Schmidt process.",
      "Determine orthogonal complements W^⊥ and compute projection vectors proj_W(v) for least-squares approximation."
    ],
    topics: [
      {
        code: "3.1",
        name: "Inner Products & Norms",
        desc: "Axioms of Inner Product (conjugate/real symmetry, linearity in first argument, positive definiteness), induced norm ||v|| = √⟨v, v⟩, unit vectors, metric distance d(u, v) = ||u - v||."
      },
      {
        code: "3.2",
        name: "Angle & Orthogonality",
        desc: "Cosine angle formula cos θ = ⟨u, v⟩ / (||u|| ||v||), orthogonality condition ⟨u, v⟩ = 0, generalized Pythagorean theorem ||u + v||² = ||u||² + ||v||² for orthogonal vectors."
      },
      {
        code: "3.3",
        name: "Cauchy-Schwarz & Triangle Inequalities",
        desc: "Rigorous derivation of Cauchy-Schwarz inequality |⟨u, v⟩| ≤ ||u|| ||v||, equality conditions, Minkowski/Triangle inequality ||u + v|| ≤ ||u|| + ||v||, applications to data analysis."
      },
      {
        code: "3.4",
        name: "Gram-Schmidt Orthogonalization Process",
        desc: "Step-by-step constructive algorithm: u₁ = v₁, u₂ = v₂ - proj_{u₁}(v₂), u₃ = v₃ - proj_{u₁}(v₃) - proj_{u₂}(v₃), normalizing to produce orthonormal basis {e₁, e₂, e₃} where ⟨eᵢ, eⱼ⟩ = δᵢⱼ."
      },
      {
        code: "3.5",
        name: "Orthogonal Complement & Projections",
        desc: "Definition and properties of W^⊥, fundamental subspace direct sum V = W ⊕ W^⊥, orthogonal projection theorem, minimum distance property and least-squares best approximation."
      }
    ],
    examQuestions: [
      "Apply the Gram-Schmidt process to transform the basis {(1, 0, 1), (1, 1, 1), (0, 1, 1)} of ℝ³ into an orthonormal basis.",
      "State and prove the Cauchy-Schwarz inequality in an inner product space V.",
      "Find the orthogonal projection of vector v = (2, 1, 3) onto the subspace W spanned by {(1, 1, 0), (0, 1, 1)}."
    ]
  },
  {
    id: "unit4",
    unitNumber: "UNIT IV",
    title: "Matrix Decomposition & Quadratic Forms",
    shortTitle: "Decompositions, SVD & Quadratic Forms",
    hours: "11 Hours",
    lectureWeight: "25%",
    themeColor: "#d97706",
    badgeClass: "badge-unit4",
    icon: "🔬",
    bookReference: "Dr. G. Balaji, Chapter 4 (Pages 4.1 – 4.98)",
    overview:
      "Advanced matrix factorizations and applications in engineering computation. Covers orthogonal diagonalization of symmetric matrices, quadratic forms, classification of definiteness, QR decomposition via Gram-Schmidt, and Singular Value Decomposition (SVD) for data science and image processing.",
    learningOutcomes: [
      "Orthogonally diagonalize real symmetric matrices using normalized eigenvectors.",
      "Express quadratic forms in matrix notation Q(x) = xᵀAx and eliminate cross-product terms.",
      "Classify quadratic forms into positive definite, negative definite, semi-definite, or indefinite using eigenvalues.",
      "Factorize full-rank matrices into QR decomposition A = QR with orthogonal Q and upper triangular R.",
      "Compute Singular Value Decomposition (SVD) A = U Σ Vᵀ and apply it to low-rank approximation and image compression."
    ],
    topics: [
      {
        code: "4.1",
        name: "Symmetric Matrices & Orthogonal Diagonalization",
        desc: "Spectral Theorem: Real symmetric matrices have real eigenvalues and orthogonal eigenvectors, constructing orthogonal matrix Q such that QᵀAQ = D where Q⁻¹ = Qᵀ."
      },
      {
        code: "4.2",
        name: "Quadratic Forms & Canonical Reduction",
        desc: "General quadratic form Q(x₁, x₂, ..., xₙ) = xᵀAx, symmetric matrix representation, Principal Axes Theorem, canonical reduction via orthogonal coordinate transformation x = Py to remove cross terms."
      },
      {
        code: "4.3",
        name: "Definiteness of Quadratic Forms",
        desc: "Classification criteria: Positive definite (all λᵢ > 0), Negative definite (all λᵢ < 0), Positive semi-definite (all λᵢ ≥ 0), Indefinite (mixed signs), Sylvester's Criterion of leading principal minors."
      },
      {
        code: "4.4",
        name: "QR Decomposition",
        desc: "Theorem: Any m×n matrix with linearly independent columns can be factored as A = QR, where Q has orthonormal columns and R is invertible upper-triangular, computing R = QᵀA, applications in solving least-squares systems."
      },
      {
        code: "4.5",
        name: "Singular Value Decomposition (SVD)",
        desc: "Foundations: Singular values σᵢ = √λᵢ of AᵀA, factorization A = U Σ Vᵀ with left singular vectors U, singular values matrix Σ, right singular vectors V, Moore-Penrose pseudoinverse A⁺, engineering applications in Principal Component Analysis (PCA) and image compression."
      }
    ],
    examQuestions: [
      "Reduce the quadratic form Q = 2x₁² + 2x₂² + 2x₃² - 2x₁x₂ - 2x₂x₃ + 2x₁x₃ to canonical form through orthogonal transformation and find its nature.",
      "Find the QR decomposition of the matrix A = [[1, 1], [1, 2], [0, 1]] using Gram-Schmidt orthogonalization.",
      "Compute the Singular Value Decomposition (SVD) for the rectangular matrix A = [[3, 2, 2], [2, 3, -2]]."
    ]
  }
];

function Syllabus({ onNavigate, student, onLogout }) {
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [expandedUnit, setExpandedUnit] = useState("unit1");
  const [activeTab, setActiveTab] = useState("topics"); // "topics" | "outcomes" | "questions"

  const studentName = student?.fullName || student?.name || "Student";

  const displayUnits =
    selectedUnit === "all"
      ? SYLLABUS_UNITS
      : SYLLABUS_UNITS.filter((u) => u.id === selectedUnit);

  const toggleExpand = (unitId) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  return (
    <div className="syllabus-portal-page">
      {/* Top Header Navbar */}
      <header className="syllabus-nav">
        <div className="syllabus-nav-left">
          <div className="syllabus-logo-badge">📐</div>
          <div>
            <span className="syllabus-platform-name">EduVerse LMS</span>
            <span className="syllabus-nav-tag">Student Course Portal</span>
          </div>
        </div>

        <div className="syllabus-nav-center">
          <span className="course-code-pill">MA25C02</span>
          <span className="course-title-txt">Linear Algebra • Regulation 2025</span>
        </div>

        <div className="syllabus-nav-right">
          <div className="student-logged-pill">
            <span className="user-icon">👤</span>
            <div className="student-logged-info">
              <span className="student-display-name">{studentName}</span>
              <span className="student-display-role">
                {student?.categoryLabel ? student.categoryLabel.split(":")[0] : "Enrolled Student"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="syllabus-nav-btn secondary"
            onClick={() => onNavigate("assessment", student)}
            title="Open Diagnostic Assessment & Capability Profiler"
          >
            📝 Diagnostic Test
          </button>

          <button
            type="button"
            className="syllabus-nav-btn secondary"
            onClick={() => onNavigate("home")}
          >
            ← Platform Home
          </button>

          {onLogout && (
            <button
              type="button"
              className="syllabus-nav-btn logout"
              onClick={onLogout}
              title="Sign out of student portal"
            >
              Sign Out
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="syllabus-main-content">
        {/* Welcome Banner */}
        <section className="syllabus-hero-banner">
          <div className="banner-left-content">
            <div className="banner-supertag">
              <span className="pulse-dot"></span>
              <span>STUDENT DASHBOARD • UNIT-WISE SYLLABUS</span>
            </div>
            <h1 className="banner-title">
              Welcome, <span className="highlight-student">{studentName}</span>!
            </h1>
            <p className="banner-subtitle">
              Here is your official <strong>Unit-Wise Syllabus</strong> for <strong>Linear Algebra (MA25C02)</strong>.
              Review core learning outcomes, chapter breakdowns, and university exam questions aligned with the prescribed <strong>Dr. G. Balaji</strong> textbook.
            </p>

            {student?.hasTakenAssessment && (
              <div style={{
                marginTop: "10px",
                marginBottom: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#f0fdf4",
                border: "1.5px solid #86efac",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "13.5px",
                color: "#166534",
                fontWeight: "600",
                boxShadow: "0 2px 6px rgba(22, 101, 52, 0.08)"
              }}>
                <span>🎯 Assessed Pathway:</span>
                <span style={{ color: "#047857", fontWeight: "700" }}>{student.categoryLabel || "Assigned Track"}</span>
                <span style={{ background: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: "12px", fontWeight: "700" }}>
                  Score: {student.score} / {student.maxScore || 30} Marks
                </span>
              </div>
            )}

            <div className="banner-chips-row">
              <span className="b-chip">📚 4 Comprehensive Units</span>
              <span className="b-chip">⏱️ 45 Contact Hours</span>
              <span className="b-chip">⭐ 4.0 Credits (3-1-0)</span>
              <span className="b-chip">📖 Ref: Dr. G. Balaji (G. Balaji Publishers)</span>
            </div>
          </div>

          <div className="banner-right-card">
            <div className="quick-book-card">
              <div className="qbc-header">
                <span className="qbc-icon">📖</span>
                <div>
                  <h4>Prescribed Course Textbook</h4>
                  <span className="qbc-sub">Anna University Regulation 2025</span>
                </div>
              </div>
              <div className="qbc-body">
                <p className="qbc-title"><strong>Linear Algebra</strong></p>
                <p className="qbc-author">by Dr. G. Balaji</p>
                <p className="qbc-publisher">G. Balaji Publishers, Chennai</p>
                <div className="qbc-status-tag">✓ Covers 100% of Units I to IV</div>
              </div>
              <button
                type="button"
                className="btn-print-syllabus"
                onClick={() => window.print()}
              >
                🖨️ Print / Save Syllabus PDF
              </button>
            </div>
          </div>
        </section>

        {/* Units Navigation Filter Bar */}
        <section className="syllabus-controls-bar">
          <div className="unit-filter-tabs">
            <button
              type="button"
              className={`unit-tab-btn ${selectedUnit === "all" ? "active" : ""}`}
              onClick={() => setSelectedUnit("all")}
            >
              <span>📑 All Units (4)</span>
            </button>
            {SYLLABUS_UNITS.map((u) => (
              <button
                key={u.id}
                type="button"
                className={`unit-tab-btn ${selectedUnit === u.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedUnit(u.id);
                  setExpandedUnit(u.id);
                }}
              >
                <span>{u.unitNumber}: {u.shortTitle}</span>
              </button>
            ))}
          </div>

          <div className="view-mode-tabs">
            <span className="vmt-lbl">View Detail:</span>
            <button
              type="button"
              className={`vmt-btn ${activeTab === "topics" ? "active" : ""}`}
              onClick={() => setActiveTab("topics")}
            >
              📖 Detailed Topics
            </button>
            <button
              type="button"
              className={`vmt-btn ${activeTab === "outcomes" ? "active" : ""}`}
              onClick={() => setActiveTab("outcomes")}
            >
              🎯 Outcomes
            </button>
            <button
              type="button"
              className={`vmt-btn ${activeTab === "questions" ? "active" : ""}`}
              onClick={() => setActiveTab("questions")}
            >
              📝 Exam Questions
            </button>
          </div>
        </section>

        {/* Units List */}
        <section className="units-list-section">
          {displayUnits.map((unit) => {
            const isExpanded = expandedUnit === unit.id || selectedUnit !== "all";

            return (
              <div
                key={unit.id}
                className={`unit-accordion-card ${isExpanded ? "expanded" : ""}`}
                style={{ "--theme-color": unit.themeColor }}
              >
                {/* Accordion Header */}
                <div
                  className="unit-accordion-header"
                  onClick={() => toggleExpand(unit.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleExpand(unit.id);
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="uah-left">
                    <span className="unit-icon-bubble">{unit.icon}</span>
                    <div>
                      <div className="unit-badge-row">
                        <span className={`unit-num-pill ${unit.badgeClass}`}>
                          {unit.unitNumber}
                        </span>
                        <span className="unit-hours-badge">⏱️ {unit.hours}</span>
                        <span className="unit-weight-badge">Weightage: {unit.lectureWeight}</span>
                      </div>
                      <h3 className="unit-main-title">{unit.title}</h3>
                      <p className="unit-book-ref">
                        <strong>Textbook Reference:</strong> {unit.bookReference}
                      </p>
                    </div>
                  </div>

                  <div className="uah-right">
                    <span className="expand-indicator">
                      {isExpanded ? "▲ Collapse Unit" : "▼ Expand Syllabus"}
                    </span>
                  </div>
                </div>

                {/* Accordion Body Content */}
                {isExpanded && (
                  <div className="unit-accordion-body">
                    <div className="unit-overview-box">
                      <strong>Unit Synopsis:</strong> {unit.overview}
                    </div>

                    {/* Tab 1: Detailed Topics */}
                    {activeTab === "topics" && (
                      <div className="tab-pane-topics">
                        <h4 className="tab-pane-title">
                          📋 Detailed Syllabus Breakdown ({unit.topics.length} Sections)
                        </h4>
                        <div className="topics-grid">
                          {unit.topics.map((t) => (
                            <div key={t.code} className="topic-card">
                              <div className="topic-header">
                                <span className="topic-code">{t.code}</span>
                                <h5 className="topic-name">{t.name}</h5>
                              </div>
                              <p className="topic-desc">{t.desc}</p>
                              <div className="topic-card-actions">
                                <button
                                  type="button"
                                  className="btn-open-topic-lesson"
                                  onClick={() =>
                                    onNavigate("lesson", {
                                      code: t.code,
                                      name: t.name,
                                      unitNumber: unit.unitNumber,
                                      unitTitle: unit.title,
                                      desc: t.desc,
                                      student,
                                    })
                                  }
                                >
                                  <span>▶️ Watch Video & Written Notes</span>
                                  <span>➔</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Course Outcomes */}
                    {activeTab === "outcomes" && (
                      <div className="tab-pane-outcomes">
                        <h4 className="tab-pane-title">
                          🎯 Course Learning Outcomes for {unit.unitNumber}
                        </h4>
                        <p className="tab-pane-sub">
                          Upon successful completion of this unit, you will be proficient in:
                        </p>
                        <ul className="outcomes-list">
                          {unit.learningOutcomes.map((co, i) => (
                            <li key={i} className="outcome-item">
                              <span className="co-check">✓</span>
                              <span>{co}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tab 3: Model University Questions */}
                    {activeTab === "questions" && (
                      <div className="tab-pane-questions">
                        <h4 className="tab-pane-title">
                          📝 Prescribed Dr. G. Balaji University Exam Questions
                        </h4>
                        <p className="tab-pane-sub">
                          Frequently repeated 8-mark & 16-mark university questions for {unit.unitNumber}:
                        </p>
                        <div className="questions-list">
                          {unit.examQuestions.map((q, i) => (
                            <div key={i} className="exam-question-item">
                              <span className="eq-num">Q{i + 1}.</span>
                              <p className="eq-text">{q}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Unit Footer Actions */}
                    <div className="unit-card-footer">
                      <span className="ucf-note">
                        📖 Prescribed study chapter: <strong>{unit.bookReference}</strong>
                      </span>
                      <button
                        type="button"
                        className="btn-practice-unit"
                        onClick={() =>
                          alert(
                            `Opening Practice Workout & Key Formula Summary for ${unit.unitNumber}: ${unit.title}. Refer to Dr. G. Balaji textbook.`
                          )
                        }
                      >
                        ⚡ Practice {unit.unitNumber} Problems
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Prescribed Textbook Detailed Card */}
        <section className="syllabus-book-spotlight">
          <div className="sbs-header">
            <span className="sbs-supertag">OFFICIAL RECOMMENDED LITERATURE</span>
            <h2>Linear Algebra Prescribed Study Material</h2>
            <p>Single recommended textbook for Anna University Engineering Examinations.</p>
          </div>

          <div className="sbs-book-card">
            <div className="sbs-book-cover">
              <span className="cover-icon">📘</span>
              <span className="cover-badge">REGULATION 2025</span>
            </div>
            <div className="sbs-book-details">
              <div className="sbs-title-row">
                <h3>Linear Algebra (MA25C02)</h3>
                <span className="sbs-author-pill">Author: Dr. G. Balaji</span>
              </div>
              <p className="sbs-pub">
                <strong>Publisher:</strong> G. Balaji Publishers, Chennai • First / Revised Edition
              </p>
              <p className="sbs-desc">
                Engineered specifically for engineering students with systematic derivations, extensive step-by-step solved problems, 2-mark question banks with complete answers, and past university examination papers.
              </p>
              <div className="sbs-chapters-grid">
                <div className="sbs-ch-item">
                  <strong>Chapter 1:</strong> Vector Spaces & Bases (Unit I)
                </div>
                <div className="sbs-ch-item">
                  <strong>Chapter 2:</strong> Transformations & Diagonalization (Unit II)
                </div>
                <div className="sbs-ch-item">
                  <strong>Chapter 3:</strong> Inner Product Spaces (Unit III)
                </div>
                <div className="sbs-ch-item">
                  <strong>Chapter 4:</strong> Decompositions & SVD (Unit IV)
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Syllabus;
