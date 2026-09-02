import { useState, useId, useEffect } from "react";
import "./Register.css";

const DEPARTMENTS = [
  "Computer Science & Engineering (CSE)",
  "Information Technology (IT)",
  "Artificial Intelligence & Data Science (AI&DS)",
  "Electronics & Communication Engineering (ECE)",
  "Electrical & Electronics Engineering (EEE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
];

function Register({ onNavigate, onRegistrationSuccess, isEmbedded = false }) {
  // Form State containing all requested properties
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    rollNo: "",
    department: "Computer Science & Engineering (CSE)",
    year: "2nd Year",
    sem: "Sem 3",
    section: "Section A",
    phone: "",
    gender: "male",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEnrolmentModal, setShowEnrolmentModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Today's date string for maximum DOB constraint
  const todayStr = new Date().toISOString().split("T")[0];

  // Field ID generators for accessibility
  const nameId = useId();
  const emailId = useId();
  const dobId = useId();
  const rollNoId = useId();
  const deptId = useId();
  const yearId = useId();
  const semId = useId();
  const secId = useId();
  const phoneId = useId();
  const genderId = useId();
  const passId = useId();
  const confirmPassId = useId();

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showEnrolmentModal) {
        setShowEnrolmentModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showEnrolmentModal]);

  // Compute Password Strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "Enter password", color: "#94a3b8" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: "Weak (needs 8+ chars, mixed case & numbers)", color: "#ef4444" };
      case 2:
        return { score: 50, label: "Fair (add numbers or special symbol)", color: "#f59e0b" };
      case 3:
        return { score: 75, label: "Good! Strong password", color: "#3b82f6" };
      case 4:
        return { score: 100, label: "Rock solid & secure! 🛡️", color: "#10b981" };
      default:
        return { score: 10, label: "Min 8 characters required", color: "#ef4444" };
    }
  };

  const passwordFeedback = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8;
  const passwordsMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;
  const passwordTooShort =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword &&
    formData.password.length < 8;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Mail ID (Email address) is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. student@univ.edu).";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    } else if (formData.dob > todayStr) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    const digitsOnlyPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (digitsOnlyPhone.length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll number / Student ID is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the academic integrity code to complete enrolment.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setShowEnrolmentModal(true);
    if (onRegistrationSuccess) {
      onRegistrationSuccess(formData);
    }
    console.log("Registration Data Submitted for Linear Algebra (MA25C02):", formData);
  };

  return (
    <div className={isEmbedded ? "register-page embedded" : "register-page"}>
      {/* Background Math Chalk & Blueprint Elements - Linear Algebra */}
      {!isEmbedded && (
        <div className="math-bg-grid" aria-hidden="true">
          <span className="math-floating sym-1">A x = b</span>
          <span className="math-floating sym-2">det(A - λI) = 0</span>
          <span className="math-floating sym-3">A = U Σ Vᵀ (SVD)</span>
          <span className="math-floating sym-4">dim(V) = rank(T) + nullity(T)</span>
          <span className="math-floating sym-5">⟨u, v⟩ = uᵀ v</span>
          <span className="math-floating sym-6">A = Q R • Av = λv</span>
          <span className="math-floating sym-7">span{`{v₁, v₂, ..., vₙ}`}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      {!isEmbedded && (
        <header className="register-nav">
          <div
            className="nav-brand"
            style={{ cursor: "pointer" }}
            onClick={() => onNavigate && onNavigate("home")}
            title="Back to EduVerse Home"
          >
            <span className="brand-icon">📐</span>
            <div className="brand-text">
              <span className="brand-title">EduVerse LMS</span>
              <span className="brand-tag">Academic Portal • Course Enrolment</span>
            </div>
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-overview-btn"
              onClick={() => onNavigate && onNavigate("home")}
            >
              ← Back to Platform Overview
            </button>
            <button
              type="button"
              className="nav-login-btn"
              onClick={() => onNavigate && onNavigate("login")}
            >
              Go to Login →
            </button>
          </div>
        </header>
      )}

      <main className="register-layout centered">
        {/* ============================================================ */}
        {/* WEBSITE OVERVIEW: HOW WE TRAIN, BENEFITS & CURRICULUM        */}
        {/* ALWAYS VISIBLE WHILE REGISTERING THE COURSE                  */}
        {/* ============================================================ */}
        <section className="website-overview-banner" aria-label="EduVerse Website Overview">
          <div className="wob-header">
            <div className="wob-badge-cluster">
              <span className="wob-badge">🌐 WEBSITE OVERVIEW</span>
              <span className="wob-subtag">EduVerse Academic Portal</span>
            </div>
            <h2 className="wob-title">Overview of EduVerse LMS & Linear Algebra (MA25C02)</h2>
            <p className="wob-desc">
              Review how our platform trains engineering students, our key student benefits, and official curriculum 
              details while completing your course registration.
            </p>
          </div>

          <div className="wob-grid">
            {/* Pillar 1 */}
            <div className="wob-card">
              <div className="wob-card-top">
                <span className="wob-icon">🧠</span>
                <span className="wob-card-label">PEDAGOGY</span>
              </div>
              <h3>1. How We Train</h3>
              <p className="wob-card-body">
                Diagnostic quizzes pinpoint weak units, while recorded HD micro-lectures break down key university exam proofs.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="wob-card">
              <div className="wob-card-top">
                <span className="wob-icon">🌟</span>
                <span className="wob-card-label">BENEFITS</span>
              </div>
              <h3>2. Student Benefits</h3>
              <p className="wob-card-body">
                Boost GPAs with 24/7 access to unit notes, formula cheat sheets, and real-time coursework progress tracking.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="wob-card">
              <div className="wob-card-top">
                <span className="wob-icon">📖</span>
                <span className="wob-card-label">SYLLABUS</span>
              </div>
              <h3>3. 4-Unit Syllabus</h3>
              <p className="wob-card-body">
                <strong>Unit I:</strong> Vector Spaces<br />
                <strong>Unit II:</strong> Linear Transformations & Diagonalization<br />
                <strong>Unit III:</strong> Inner Product Spaces<br />
                <strong>Unit IV:</strong> Matrix Decomposition
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="wob-card">
              <div className="wob-card-top">
                <span className="wob-icon">📚</span>
                <span className="wob-card-label">REFERRED BOOK</span>
              </div>
              <h3>4. Referred Book</h3>
              <p className="wob-card-body">
                <strong>Linear Algebra</strong> – Dr. G. Balaji (G. Balaji Publishers, Chennai). Full 4-unit coverage with solved university questions.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* BASIC COURSE DETAILS: LINEAR ALGEBRA (MA25C02)               */}
        {/* ============================================================ */}
        <section className="course-hub-card" aria-label="Course Overview: Linear Algebra MA25C02">
          <div className="course-header-row">
            <div className="course-badge-cluster">
              <span className="badge badge-primary">Course Code: MA25C02</span>
              <span className="badge badge-accent">Linear Algebra (Regulation 2025)</span>
              <span className="badge badge-success">4.0 Credits (3-1-0)</span>
            </div>

            <div className="course-status-pill">
              <span className="pulse-dot"></span>
              Enrolment Open
            </div>
          </div>

          <div className="course-main-info">
            <div className="course-title-group">
              <div className="math-icon-badge">
                <span>[ A ]</span>
              </div>
              <div>
                <h1 className="course-title">Linear Algebra (MA25C02)</h1>
                <p className="course-subtitle">
                  Vector Spaces, Linear Transformations, Dimension Theorem, Diagonalization,
                  Inner Product Spaces, QR Decomposition & SVD
                </p>
              </div>
            </div>

            <div className="course-quick-stats">
              <div className="stat-card highlight">
                <span className="stat-label">Course Type</span>
                <span className="stat-value">Core Engineering Mathematics</span>
              </div>
            </div>
          </div>

          <div className="course-book-strip">
            <span className="strip-title">📚 Referred Book:</span>
            <span className="strip-book">
              <strong>Linear Algebra</strong> – Dr. G. Balaji (G. Balaji Publishers, Chennai) • Anna University Regulation 2025
            </span>
          </div>

          <div className="course-footer-strip">
            <span className="strip-note">
              ✍️ Complete student registration below to enrol directly into <strong>Linear Algebra (MA25C02)</strong>.
            </span>
          </div>
        </section>

        {/* ============================================================ */}
        {/* REGISTRATION PROCESS FORM                                    */}
        {/* ============================================================ */}
        <div className="form-container-centered">
          <div className="form-card">
            <div className="form-header">
              <div className="stamp-badge">
                <span>STUDENT REGISTRATION</span>
              </div>
              <h2>LMS Registration Form</h2>
              <p className="form-intro">
                Please enter your personal and academic details to complete your enrolment into <strong>Linear Algebra (MA25C02)</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* 1. Personal Details */}
              <div className="form-section">
                <div className="section-label">
                  <span>1. Personal Details</span>
                </div>

                <div className="field-group two-col">
                  {/* Full Name */}
                  <div className="input-field">
                    <label htmlFor={nameId}>
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      name="fullName"
                      placeholder="e.g. Alex S. Vance"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? "has-error" : ""}
                      required
                      minLength={3}
                    />
                    {errors.fullName ? (
                      <span className="field-error">⚠️ {errors.fullName}</span>
                    ) : (
                      <span className="field-hint">Your legal name as per student records</span>
                    )}
                  </div>

                  {/* Mail ID */}
                  <div className="input-field">
                    <label htmlFor={emailId}>
                      Mail ID (Email Address) <span className="req">*</span>
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      name="email"
                      placeholder="e.g. student@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "has-error" : ""}
                      required
                    />
                    {errors.email ? (
                      <span className="field-error">⚠️ {errors.email}</span>
                    ) : (
                      <span className="field-hint">Official updates & lecture links will be sent here</span>
                    )}
                  </div>
                </div>

                <div className="field-group three-col">
                  {/* DOB */}
                  <div className="input-field">
                    <label htmlFor={dobId}>
                      Date of Birth (DOB) <span className="req">*</span>
                    </label>
                    <input
                      id={dobId}
                      type="date"
                      name="dob"
                      max={todayStr}
                      value={formData.dob}
                      onChange={handleChange}
                      className={errors.dob ? "has-error" : ""}
                      required
                    />
                    {errors.dob && <span className="field-error">⚠️ {errors.dob}</span>}
                  </div>

                  {/* Phone Number */}
                  <div className="input-field">
                    <label htmlFor={phoneId}>
                      Phone Number <span className="req">*</span>
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "has-error" : ""}
                      required
                    />
                    {errors.phone && <span className="field-error">⚠️ {errors.phone}</span>}
                  </div>

                  {/* Gender */}
                  <div className="input-field">
                    <label htmlFor={genderId}>
                      Gender <span className="req">*</span>
                    </label>
                    <select
                      id={genderId}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-Binary</option>
                      <option value="other">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Academic Information */}
              <div className="form-section">
                <div className="section-label">
                  <span>2. Academic & Department Details</span>
                </div>

                <div className="field-group two-col">
                  {/* Roll No / Reg ID */}
                  <div className="input-field">
                    <label htmlFor={rollNoId}>
                      Roll Number / Student ID <span className="req">*</span>
                    </label>
                    <input
                      id={rollNoId}
                      type="text"
                      name="rollNo"
                      placeholder="e.g. 2025CSE1048"
                      value={formData.rollNo}
                      onChange={handleChange}
                      className={errors.rollNo ? "has-error" : ""}
                      required
                    />
                    {errors.rollNo && <span className="field-error">⚠️ {errors.rollNo}</span>}
                  </div>

                  {/* Department */}
                  <div className="input-field">
                    <label htmlFor={deptId}>
                      Department <span className="req">*</span>
                    </label>
                    <select
                      id={deptId}
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      {DEPARTMENTS.map((dept, i) => (
                        <option key={i} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field-group three-col">
                  {/* Year */}
                  <div className="input-field">
                    <label htmlFor={yearId}>
                      Year <span className="req">*</span>
                    </label>
                    <select
                      id={yearId}
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                    </select>
                  </div>

                  {/* Semester */}
                  <div className="input-field">
                    <label htmlFor={semId}>
                      Semester (Sem) <span className="req">*</span>
                    </label>
                    <select
                      id={semId}
                      name="sem"
                      value={formData.sem}
                      onChange={handleChange}
                    >
                      <option value="Sem 1">Sem 1</option>
                      <option value="Sem 2">Sem 2</option>
                      <option value="Sem 3">Sem 3</option>
                      <option value="Sem 4">Sem 4</option>
                      <option value="Sem 5">Sem 5</option>
                      <option value="Sem 6">Sem 6</option>
                      <option value="Sem 7">Sem 7</option>
                      <option value="Sem 8">Sem 8</option>
                    </select>
                  </div>

                  {/* Section */}
                  <div className="input-field">
                    <label htmlFor={secId}>
                      Section <span className="req">*</span>
                    </label>
                    <select
                      id={secId}
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                    >
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                      <option value="Section D">Section D</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Security Credentials */}
              <div className="form-section">
                <div className="section-label">
                  <span>3. Password & Security</span>
                </div>

                <div className="field-group two-col">
                  {/* Password */}
                  <div className="input-field">
                    <label htmlFor={passId}>
                      Password <span className="req">*</span>
                    </label>
                    <div className="password-wrapper">
                      <input
                        id={passId}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Min 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "has-error" : ""}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="toggle-pass-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? "👁️‍🗨️ Hide" : "👁️ Show"}
                      </button>
                    </div>

                    {errors.password && <span className="field-error">⚠️ {errors.password}</span>}

                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="strength-meter">
                        <div className="strength-bar-track">
                          <div
                            className="strength-bar-fill"
                            style={{
                              width: `${passwordFeedback.score}%`,
                              backgroundColor: passwordFeedback.color,
                            }}
                          ></div>
                        </div>
                        <span
                          className="strength-text"
                          style={{ color: passwordFeedback.color }}
                        >
                          {passwordFeedback.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="input-field">
                    <label htmlFor={confirmPassId}>
                      Confirm Password <span className="req">*</span>
                    </label>
                    <div className="password-wrapper">
                      <input
                        id={confirmPassId}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? "has-error" : ""}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-pass-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? "👁️‍🗨️ Hide" : "👁️ Show"}
                      </button>
                    </div>

                    {passwordsMatch && (
                      <span className="match-feedback match">
                        ✓ Passwords match!
                      </span>
                    )}
                    {passwordsMismatch && (
                      <span className="match-feedback mismatch">
                        ⚠️ Passwords do not match yet
                      </span>
                    )}
                    {passwordTooShort && (
                      <span className="match-feedback mismatch">
                        ⚠️ Passwords match, but must be at least 8 characters
                      </span>
                    )}
                    {errors.confirmPassword && !passwordsMismatch && !passwordTooShort && (
                      <span className="field-error">⚠️ {errors.confirmPassword}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Honor Code & Agreement */}
              <div className={`terms-container ${errors.agreeTerms ? "terms-error" : ""}`}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span>
                    I confirm that the provided information is correct, agree to the LMS terms, and request enrolment into <strong>Linear Algebra (MA25C02)</strong>. <span className="req">*</span>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className="field-error">⚠️ {errors.agreeTerms}</span>
                )}
              </div>

              {/* Submit Action */}
              <div className="submit-action-area">
                {Object.keys(errors).length > 0 && (
                  <div className="form-summary-error" role="alert">
                    ⚠️ Please fill in all required fields marked above before proceeding.
                  </div>
                )}

                <button type="submit" className="register-submit-btn">
                  <span>Register</span>
                </button>

                <p className="login-fallback">
                  Already registered?{" "}
                  <button
                    type="button"
                    className="inline-link-btn"
                    onClick={() => onNavigate && onNavigate("login")}
                  >
                    Login here
                  </button>
                </p>

                <p style={{ textAlign: "center", marginTop: "12px", fontSize: "13.5px" }}>
                  <button
                    type="button"
                    className="inline-link-btn"
                    style={{ color: "#64748b", fontWeight: "600", textDecoration: "none" }}
                    onClick={() => onNavigate && onNavigate("home")}
                  >
                    ← Back to Platform Overview
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* CELEBRATION / OFFICIAL ENROLMENT CONFIRMATION MODAL          */}
      {/* ============================================================ */}
      {showEnrolmentModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEnrolmentModal(false);
            }
          }}
        >
          <div className="enrolment-ticket-modal">
            <button
              type="button"
              className="modal-close-icon"
              onClick={() => setShowEnrolmentModal(false)}
              aria-label="Close enrolment modal"
            >
              ✕
            </button>

            <div className="modal-confetti" aria-hidden="true">
              🎉 📐 🎓 🌟 📖 🏆
            </div>

            <div className="ticket-header">
              <span className="ticket-badge">REGISTRATION COMPLETE</span>
              <h2>Welcome to Linear Algebra!</h2>
              <p>Your registration for <strong>Linear Algebra (MA25C02)</strong> has been recorded.</p>
            </div>

            <div className="ticket-details-box">
              <div className="ticket-row">
                <span>Student Name:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="ticket-row">
                <span>Roll Number:</span>
                <strong>{formData.rollNo}</strong>
              </div>
              <div className="ticket-row">
                <span>Department:</span>
                <strong>{formData.department}</strong>
              </div>
              <div className="ticket-row">
                <span>Year / Sem / Section:</span>
                <strong>{formData.year} • {formData.sem} • {formData.section}</strong>
              </div>
              <div className="ticket-row">
                <span>Mail ID:</span>
                <strong>{formData.email}</strong>
              </div>
              <div className="ticket-row">
                <span>Phone:</span>
                <strong>{formData.phone}</strong>
              </div>
              <div className="ticket-row highlight-row">
                <span>Enrolled Course:</span>
                <strong>Linear Algebra (MA25C02) • 4.0 Credits</strong>
              </div>
            </div>

            <div className="ticket-actions" style={{ flexWrap: "wrap" }}>
              <button
                type="button"
                className="ticket-assessment-btn"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                  color: "#ffffff",
                  border: "none",
                  padding: "13px 22px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14.5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(67, 56, 202, 0.3)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "8px"
                }}
                onClick={() => {
                  setShowEnrolmentModal(false);
                  if (onNavigate) onNavigate("assessment", formData);
                }}
              >
                <span>📝 Take Capability Assessment (20 Qs • 20 Marks)</span>
                <span>➔</span>
              </button>
              <button
                type="button"
                className="ticket-print-btn"
                onClick={() => window.print()}
              >
                🖨️ Print Slip
              </button>
              <button
                type="button"
                className="ticket-secondary-btn"
                onClick={() => setShowEnrolmentModal(false)}
              >
                Edit Details
              </button>
              <button
                type="button"
                className="ticket-login-btn"
                onClick={() => {
                  setShowEnrolmentModal(false);
                  if (onNavigate) onNavigate("login");
                }}
              >
                Skip to Login →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
