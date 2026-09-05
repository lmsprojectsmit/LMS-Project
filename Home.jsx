import { useEffect } from "react";
import "./Home.css";
import ThemeToggle from "./ThemeToggle";

function Home({ onNavigate, currentUser, onLogout, theme, onToggleTheme }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRegistrationButton = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const btn =
      document.getElementById("dedicated-student-register-btn") ||
      document.getElementById("register-now");

    if (btn) {
      // 1. Center the button in view smoothly
      btn.scrollIntoView({ behavior: "smooth", block: "center" });

      // 2. Fallback window-level smooth scroll calculation to guarantee exact center landing
      const rect = btn.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      const targetY = absoluteTop - window.innerHeight / 2 + rect.height / 2;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });

      // 3. Highlight pulse effect so the student's eyes are immediately drawn to the button
      btn.classList.remove("btn-highlight-pulse");
      void btn.offsetWidth;
      btn.classList.add("btn-highlight-pulse");

      // 4. Safely apply focus after scroll completes without disrupting smooth scroll
      setTimeout(() => {
        try {
          btn.focus({ preventScroll: true });
        } catch {}
      }, 700);

      setTimeout(() => {
        btn.classList.remove("btn-highlight-pulse");
      }, 3000);
    }
  };

  useEffect(() => {
    if (currentUser?.scrollTo) {
      const timer = setTimeout(() => {
        scrollToSection(currentUser.scrollTo);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  return (
    <div className="home-page">
      {/* Background Chalk & Math Accents - Linear Algebra Formulas */}
      <div className="home-math-bg" aria-hidden="true">
        <span className="floating-sym fs-1">A x = b</span>
        <span className="floating-sym fs-2">det(A - λI) = 0</span>
        <span className="floating-sym fs-3">A = U Σ Vᵀ (SVD)</span>
        <span className="floating-sym fs-4">dim(V) = rank(T) + nullity(T)</span>
        <span className="floating-sym fs-5">⟨u, v⟩ = uᵀ v</span>
        <span className="floating-sym fs-6">A = Q R • Av = λv</span>
      </div>

      {/* Navigation Bar */}
      <header className="home-nav">
        <div className="nav-brand-container">
          <div className="brand-titles">
            <span className="brand-name">EduVerse LMS</span>
            <span className="brand-tagline">Academic Learning Management System</span>
          </div>
        </div>

        <nav className="nav-links">
          <button type="button" className="nav-link-btn" onClick={() => scrollToSection("overview")}>
            Platform Overview
          </button>
          <button type="button" className="nav-link-btn" onClick={() => scrollToSection("training")}>
            How We Train
          </button>
          <button type="button" className="nav-link-btn" onClick={() => scrollToSection("usefulness")}>
            Student Benefits
          </button>
          <button type="button" className="nav-link-btn" onClick={() => scrollToSection("linear-algebra")}>
            Linear Algebra (MA25C02)
          </button>
        </nav>

        <div className="nav-buttons">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                className="nav-btn-secondary"
                style={{ borderColor: "#6366f1", color: "#4338ca", fontWeight: "700", background: "#f5f3ff" }}
                onClick={() => onNavigate("syllabus", currentUser)}
              >
                Unit-Wise Syllabus
              </button>
              <span style={{
                background: "#ecfdf5",
                color: "#065f46",
                border: "1.5px solid #a7f3d0",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <span>👤</span>
                <span>{currentUser.fullName || "Student"}</span>
              </span>
              <button
                type="button"
                className="nav-btn-secondary"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                className="nav-btn-secondary"
                onClick={() => onNavigate("login")}
                style={{ fontWeight: "700", color: "#4338ca", borderColor: "#c7d2fe" }}
              >
                Login
              </button>
              <button
                type="button"
                className="nav-btn-primary"
                onClick={() => onNavigate("register")}
              >
                Student Registration
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="overview">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-sparkle">✨</span>
            <span>Accredited Higher Education Engineering Portal • Regulation 2025</span>
          </div>

          <h1 className="hero-headline">
            Master Engineering Science & <span className="highlight-text">Linear Algebra (MA25C02)</span> With Guided Interactive Learning
          </h1>

          <div className="hero-cta-group">
            {currentUser ? (
              <button
                type="button"
                className="hero-primary-cta"
                onClick={() => onNavigate("syllabus", currentUser)}
              >
                <span>Continue to Syllabus & Lessons</span>
                <span className="cta-arrow">→</span>
              </button>
            ) : (
              <a
                href="#dedicated-student-register-btn"
                className="hero-primary-cta"
                onClick={scrollToRegistrationButton}
              >
                <span>Student Registration</span>
                <span className="cta-arrow">↓</span>
              </a>
            )}

            <button
              type="button"
              className="hero-secondary-cta"
              onClick={() => scrollToSection("linear-algebra")}
            >
              <span>Explore MA25C02 Syllabus & Book</span>
              <span className="cta-down">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: In Which Ways The Website Trains Students */}
      <section className="training-section" id="training">
        <div className="section-header-block">
          <span className="section-pill">PRACTICE-FIRST PEDAGOGY</span>
          <h2 className="section-title">In Which Ways Does EduVerse Train Students?</h2>
          <p className="section-subtitle">
            Active training methods designed to build strong problem-solving skills and exam confidence.
          </p>
        </div>

        <div className="training-grid">
          {/* Pillar 1 */}
          <div className="training-card">
            <h3 className="card-heading">1. Diagnostic Quizzes & Weak-Spot Detection</h3>
            <p className="card-body">
              Automated assessments identify your weak areas and generate targeted practice questions before midterms and semester finals.
            </p>
            <ul className="card-feature-list">
              <li>Unit-wise accuracy breakdown & error analysis</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="training-card">
            <h3 className="card-heading">2. HD Video Archives & Micro-Lectures</h3>
            <p className="card-body">
              Recorded classroom lectures and 10-minute micro-videos focusing on key proofs and university exam problem patterns.
            </p>
            <ul className="card-feature-list">
              <li>Downloadable digital handwritten PDF notes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: How Useful The Website Is To Students */}
      <section className="usefulness-section" id="usefulness">
        <div className="section-header-block">
          <span className="section-pill accent-pill">STUDENT ADVANTAGE</span>
          <h2 className="section-title">How Useful Will This Website Be to Students?</h2>
          <p className="section-subtitle">
            Key academic advantages designed to help engineering students master Linear Algebra (MA25C02) with confidence.
          </p>
        </div>

        <div className="usefulness-grid">
          {/* Benefit 1 */}
          <div className="usefulness-item">
            <div className="use-badge">01</div>
            <div className="use-content">
              <h3>Boost GPA & Clear Exams</h3>
              <p>
                Master past university questions, step-by-step derivations, and scoring rubrics to secure top grades without backlogs.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="usefulness-item">
            <div className="use-badge">02</div>
            <div className="use-content">
              <h3>24/7 Self-Paced Access</h3>
              <p>
                Study anytime with instant access to recorded micro-lectures, formula cheat sheets, and practice workouts around your schedule.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="usefulness-item">
            <div className="use-badge">03</div>
            <div className="use-content">
              <h3>Centralized Study Notes</h3>
              <p>
                Access official G. Balaji textbook notes, syllabus guides, and previous 5-year question papers organized cleanly by unit.
              </p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="usefulness-item">
            <div className="use-badge">04</div>
            <div className="use-content">
              <h3>Track Progress in Real Time</h3>
              <p>
                Monitor completed units, attendance thresholds, and internal assessment readiness with intuitive visual progress bars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Course Spotlight - Linear Algebra (MA25C02) Syllabus & Book Details */}
      <section className="course-spotlight-section" id="linear-algebra">
        <div className="spotlight-card">
          <div className="spotlight-header">
            <div>
              <span className="spotlight-tag">OFFICIAL PRESCRIBED CURRICULUM</span>
              <h2 className="spotlight-title">Linear Algebra (MA25C02)</h2>
              <p className="spotlight-desc">
                Core Engineering Mathematics • 4.0 Credits (3-1-0) • Regulation 2025 • Semester II / III
              </p>
            </div>

            <div className="spotlight-status">
              <span className="live-pulse"></span>
              <span>Course Active & Enrolment Open</span>
            </div>
          </div>

          {/* 4 Units Syllabus for MA25C02 */}
          <div className="syllabus-section-header">
            <h3>Course Syllabus Units (MA25C02)</h3>
            <p>4-unit curriculum aligned with university standards and engineering applications.</p>
          </div>

          <div className="syllabus-pill-cluster">
            {/* Unit 1 */}
            <div className="syllabus-card">
              <span className="syllabus-unit">UNIT I</span>
              <h4>Vector Spaces</h4>
              <p>
                Vector spaces, subspaces, linear span, independence, basis, and dimension.
              </p>
            </div>

            {/* Combined Unit 2: Linear Transformations & Diagonalization */}
            <div className="syllabus-card">
              <span className="syllabus-unit">UNIT II</span>
              <h4>Linear Transformations & Diagonalization</h4>
              <p>
                Linear mappings, null space, Rank-Nullity Theorem, eigenvalues, eigenvectors, and diagonalization.
              </p>
            </div>

            {/* Unit 3 */}
            <div className="syllabus-card">
              <span className="syllabus-unit">UNIT III</span>
              <h4>Inner Product Spaces</h4>
              <p>
                Inner products, norms, Cauchy-Schwarz inequality, Gram-Schmidt process, and orthonormal bases.
              </p>
            </div>

            {/* Unit 4 */}
            <div className="syllabus-card">
              <span className="syllabus-unit">UNIT IV</span>
              <h4>Matrix Decomposition</h4>
              <p>
                Symmetric matrices, positive definite matrices, QR decomposition, SVD, and least-squares.
              </p>
            </div>
          </div>

          {/* Referred Book Section: G. Balaji Publishers Book Only */}
          <div className="course-books-container">
            <div className="books-header">
              <span className="books-tag">OFFICIAL REFERRED BOOK</span>
              <h3>Referred Book for Linear Algebra (MA25C02)</h3>
              <p>Official recommended curriculum textbook by G. Balaji Publishers for university examinations.</p>
            </div>

            <div className="books-grid single-book">
              {/* G. Balaji Publishers Book */}
              <div className="book-card primary-book featured-book">
                <div className="book-badge">REFERRED BOOK</div>
                <div className="book-icon">📚</div>
                <div className="book-info">
                  <h4>Linear Algebra</h4>
                  <span className="book-authors">Dr. G. Balaji</span>
                  <span className="book-meta">G. Balaji Publishers (Chennai) • Anna University Regulation 2025</span>
                  <p className="book-coverage">
                    <strong>Complete 4-Unit Coverage:</strong> Covers all 4 syllabus units with solved university questions, two-mark short Q&As, and step-by-step derivations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED SEPARATE REGISTRATION BUTTON & CALL TO ACTION */}
      <section className="registration-callout-section" id="register-now">
        <div className="callout-card">
          <span className="callout-badge">JOIN EDUVERSE TODAY</span>
          <h2 className="callout-headline">
            Ready to Master Linear Algebra (MA25C02)?
          </h2>
          <p className="callout-subtitle">
            Register now to access the 4-unit syllabus, G. Balaji textbook notes, and practice problem sets.
          </p>

          {/* THE SEPARATE DEDICATED BUTTON: STUDENT REGISTRATION ONLY */}
          <div className="callout-action-row">
            <button
              id="dedicated-student-register-btn"
              type="button"
              className="dedicated-register-btn"
              onClick={() => onNavigate("register")}
            >
              <span>Student Registration</span>
            </button>
          </div>

          <div className="callout-footer-links">
            <span>Already enrolled in the portal?</span>
            <button
              type="button"
              className="login-sublink-btn"
              onClick={() => onNavigate("login")}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-title">EduVerse LMS</span>
            <p className="footer-tag">Department of Engineering Mathematics • Academic Portal</p>
          </div>

          <div className="footer-nav-col">
            <span className="col-heading">Quick Links</span>
            <button type="button" onClick={() => scrollToSection("overview")}>Overview</button>
            <button type="button" onClick={() => scrollToSection("training")}>Training Methodology</button>
            <button type="button" onClick={() => scrollToSection("usefulness")}>Student Benefits</button>
            <button type="button" onClick={() => scrollToSection("linear-algebra")}>MA25C02 Syllabus & Book</button>
          </div>

          <div className="footer-nav-col">
            <span className="col-heading">Portal Access</span>
            <button type="button" onClick={() => onNavigate("register")}>Student Registration</button>
            <button type="button" onClick={() => onNavigate("login")}>Student Login</button>
            <button type="button" onClick={() => onNavigate("faculty")}>Faculty Dashboard (Dr. K. Senthil Kumar)</button>
            <a href="#help" onClick={(e) => { e.preventDefault(); alert("For LMS support contact: support@eduverse.ac.in"); }}>LMS Helpdesk</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025–2026 EduVerse LMS. Linear Algebra (MA25C02) Academic Curriculum.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
