import { useState, useId, useEffect, useRef } from "react";
import "./Register.css";
import ThemeToggle from "./ThemeToggle";
import { authAPI } from "./api";
import { dispatchPhoneOtp, dispatchEmailOtp, sendRegistrationEmail } from "./notificationService";

const DEPARTMENTS = [
  "Computer Science & Engineering (CSE)",
  "Information Technology (IT)",
  "Artificial Intelligence & Data Science (AI&DS)",
  "Electronics & Communication Engineering (ECE)",
  "Electrical & Electronics Engineering (EEE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
];

function Register({ onNavigate, onRegistrationSuccess, isEmbedded = false, theme, onToggleTheme }) {
  // Wizard Step State: 1 | 2 | 3 (Google-like registration workflow)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State containing all requested properties
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    rollNo: "",
    department: "Computer Science & Engineering (CSE)",
    sem: "Sem 3",
    section: "Section A",
    phone: "",
    gender: "male",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEnrolmentModal, setShowEnrolmentModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Gmail / Email Verification States
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  // Phone OTP Verification States
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");

  // Active OTP Modal & Session States ("email" | "phone")
  const [activeOtpType, setActiveOtpType] = useState("email"); // "email" | "phone"
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [currentOtpSession, setCurrentOtpSession] = useState(null);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Incoming Notification Toasts (Simulated SMS & Gmail inboxes)
  const [incomingToast, setIncomingToast] = useState(null);

  // Post-Registration Confirmation Email
  const [sentEmailData, setSentEmailData] = useState(null);
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);

  const otpInputRefs = useRef([]);

  // Today's date string for maximum DOB constraint
  const todayStr = new Date().toISOString().split("T")[0];

  // Field ID generators for accessibility
  const nameId = useId();
  const emailId = useId();
  const dobId = useId();
  const rollNoId = useId();
  const deptId = useId();
  const secId = useId();
  const phoneId = useId();
  const genderId = useId();
  const passId = useId();
  const confirmPassId = useId();

  // Close modals on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showEmailPreviewModal) {
          setShowEmailPreviewModal(false);
        } else if (showOtpModal) {
          setShowOtpModal(false);
        } else if (showEnrolmentModal) {
          setShowEnrolmentModal(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showEnrolmentModal, showOtpModal, showEmailPreviewModal]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpTimer]);

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
    const newVal = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newVal,
    }));

    // If email changes after verification, reset email verification status
    if (name === "email" && isEmailVerified && newVal.trim().toLowerCase() !== verifiedEmail.toLowerCase()) {
      setIsEmailVerified(false);
      setVerifiedEmail("");
    }

    // If phone number changes after verification, reset phone verification status
    if (name === "phone" && isPhoneVerified && newVal !== verifiedPhoneNumber) {
      setIsPhoneVerified(false);
      setVerifiedPhoneNumber("");
    }

    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Trigger Gmail / Email OTP dispatch
  const handleInitiateEmailVerification = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Please enter your Gmail / Mail ID to receive verification OTP." }));
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address (e.g. student@gmail.com)." }));
      return;
    }

    setErrors((prev) => ({ ...prev, email: undefined }));
    const session = dispatchEmailOtp(formData.email, formData.fullName);
    setActiveOtpType("email");
    setCurrentOtpSession(session);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError("");
    setOtpTimer(60);
    setShowOtpModal(true);

    // Show simulated Gmail incoming inbox toast banner
    setIncomingToast({
      type: "email",
      icon: "📬",
      title: "Gmail Inbox • Adaptive LMS",
      target: formData.email,
      otp: session.otp,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 150);
  };

  // Trigger Phone OTP dispatch
  const handleInitiatePhoneVerification = () => {
    const digitsOnlyPhone = (formData.phone || "").replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: "Please enter your phone number to receive OTP." }));
      return;
    }
    if (digitsOnlyPhone.length < 10) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid 10-digit phone number." }));
      return;
    }

    setErrors((prev) => ({ ...prev, phone: undefined }));
    const session = dispatchPhoneOtp(formData.phone);
    setActiveOtpType("phone");
    setCurrentOtpSession(session);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError("");
    setOtpTimer(60);
    setShowOtpModal(true);

    // Show simulated SMS pop toast banner
    setIncomingToast({
      type: "phone",
      icon: "📲",
      title: "SMS Notification • Adaptive LMS",
      target: formData.phone,
      otp: session.otp,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 150);
  };

  // Handle OTP individual box input
  const handleOtpDigitChange = (index, value) => {
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError("");

    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle auto-paste 6 digit code
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (pastedData) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || "";
      }
      setOtpDigits(newDigits);
      setOtpError("");
      if (pastedData.length === 6) {
        otpInputRefs.current[5]?.focus();
      }
    }
  };

  // Quick auto-fill helper from incoming Toast
  const handleAutoFillOtp = (otpCode) => {
    if (!otpCode) return;
    const digits = otpCode.split("").slice(0, 6);
    setOtpDigits(digits);
    setOtpError("");
  };

  // Verify entered OTP for either Email or Phone
  const handleConfirmVerifyOtp = () => {
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length < 6) {
      setOtpError("Please enter all 6 digits of the OTP.");
      return;
    }

    if (!currentOtpSession) {
      setOtpError("OTP session expired. Please request a new OTP.");
      return;
    }

    if (Date.now() > currentOtpSession.expiresAt) {
      setOtpError("This OTP has expired. Please request a new code.");
      return;
    }

    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      if (enteredOtp === currentOtpSession.otp) {
        if (activeOtpType === "email") {
          setIsEmailVerified(true);
          setVerifiedEmail(formData.email);
          setErrors((prev) => ({ ...prev, email: undefined }));
        } else {
          setIsPhoneVerified(true);
          setVerifiedPhoneNumber(formData.phone);
          setErrors((prev) => ({ ...prev, phone: undefined }));
        }

        setShowOtpModal(false);
        setTimeout(() => setIncomingToast(null), 4000);
      } else {
        setOtpError(`Incorrect OTP. Please check your ${activeOtpType === "email" ? "Gmail inbox" : "SMS message"} and enter the valid 6-digit code.`);
      }
    }, 450);
  };

  // Step 1 Validator: 1. Personal Details
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Mail ID (Gmail Address) is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. student@gmail.com).";
    } else if (!isEmailVerified || formData.email.trim().toLowerCase() !== verifiedEmail.toLowerCase()) {
      newErrors.email = "Please verify your Gmail address via OTP before proceeding.";
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
    } else if (!isPhoneVerified || formData.phone !== verifiedPhoneNumber) {
      newErrors.phone = "Please verify your phone number via OTP before proceeding.";
    }

    setErrors(newErrors);

    // Auto-prompt verification modal if unverified
    if (!newErrors.fullName && !newErrors.dob) {
      if (newErrors.email && (!isEmailVerified || formData.email.trim().toLowerCase() !== verifiedEmail.toLowerCase())) {
        if (formData.email.trim() && emailRegex.test(formData.email.trim())) {
          handleInitiateEmailVerification();
          return false;
        }
      }
      if (newErrors.phone && (!isPhoneVerified || formData.phone !== verifiedPhoneNumber)) {
        if (digitsOnlyPhone.length >= 10) {
          handleInitiatePhoneVerification();
          return false;
        }
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validator: 2. Academic & Department Details
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Registration number is required.";
    } else if (formData.rollNo.trim().length < 3) {
      newErrors.rollNo = "Registration number must be at least 3 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validator: 3. Password & Security
  const validateStep3 = () => {
    const newErrors = {};

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

  // Advance from Step 1 to Step 2
  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  // Advance from Step 2 to Step 3
  const handleProceedToStep3 = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  // Final Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    if (!validateStep2()) {
      setCurrentStep(2);
      return;
    }

    if (!validateStep3()) {
      setCurrentStep(3);
      return;
    }

    try {
      // 1. Save user in backend database via auth API
      const backendUserData = {
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.fullName.trim(),
        role: "student",
      };

      const registeredUser = await authAPI.register(backendUserData);

      // 2. Format student data for the frontend state (preserving academic details)
      const { password, confirmPassword, ...safeFormData } = formData;
      const studentUser = {
        ...safeFormData,
        id: registeredUser.id,
        username: safeFormData.rollNo || safeFormData.email.split("@")[0],
        role: "student",
        isEmailVerified: true,
        isPhoneVerified: true,
        registeredAt: new Date().toISOString(),
      };

      // 3. Dispatch official confirmation email to the student
      const emailResult = sendRegistrationEmail(studentUser);
      setSentEmailData(emailResult);

      // 4. Show Enrolment Modal & notify parent
      setShowEnrolmentModal(true);
      if (onRegistrationSuccess) {
        onRegistrationSuccess({
          ...studentUser,
          emailSent: true,
          sentEmailId: emailResult.id,
        });
      }
    } catch (err) {
      alert("Registration failed: " + (err.message || "An unexpected error occurred."));
      return;
    }
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

      {/* Simulated Incoming Verification Notification Toast (SMS / Gmail) */}
      {incomingToast && (
        <div className={`sms-notification-toast ${incomingToast.type === "email" ? "email-toast-style" : ""}`} role="alert">
          <div className="sms-toast-header">
            <div className="sms-toast-title">
              <span className="sms-icon">{incomingToast.icon}</span>
              <strong>{incomingToast.title}</strong>
            </div>
            <span className="sms-time">{incomingToast.time}</span>
            <button
              type="button"
              className="sms-close-btn"
              onClick={() => setIncomingToast(null)}
              aria-label="Dismiss preview"
            >
              ✕
            </button>
          </div>
          <div className="sms-toast-body">
            <p>
              Your Adaptive LMS {incomingToast.type === "email" ? "Gmail" : "Phone"} verification code is <strong className="sms-otp-code">{incomingToast.otp}</strong>. Sent to <em>{incomingToast.target}</em>. Valid for 5 mins.
            </p>
            <div className="sms-toast-actions">
              <button
                type="button"
                className="sms-autofill-btn"
                onClick={() => handleAutoFillOtp(incomingToast.otp)}
              >
                ⚡ Auto-Fill Code ({incomingToast.otp})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      {!isEmbedded && (
        <header className="register-nav">
          <div
            className="nav-brand"
            style={{ cursor: "pointer" }}
            onClick={() => onNavigate && onNavigate("home")}
            title="Back to Adaptive LMS Home"
          >
            <div className="brand-text">
              <span className="brand-title">Adaptive LMS</span>
              <span className="brand-tag">Academic Portal • Course Enrolment</span>
            </div>
          </div>

          <div className="nav-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              className="nav-overview-btn"
              onClick={() => (onNavigate ? onNavigate("back") : window.history.back())}
            >
              ← Back
            </button>
          </div>
        </header>
      )}

      <main className="register-layout centered">
        <div className="form-container-centered">
          <div className="form-card google-style-card">
            {/* Google-Style Stepper Progress Header */}
            <div className="google-stepper-container">
              <div className="google-brand-header">
                <div className="google-account-icon">🎓</div>
                <h2>Create your Adaptive LMS Student Account</h2>
                <p className="google-account-sub">
                  Enrolling into <strong>Linear Algebra (MA25C02)</strong> • Regulation 2025
                </p>
              </div>

              {/* Step Navigation Pills */}
              <div className="google-stepper-nav">
                <button
                  type="button"
                  className={`google-step-pill ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}
                  onClick={() => setCurrentStep(1)}
                >
                  <span className="step-circle">{currentStep > 1 ? "✓" : "1"}</span>
                  <span className="step-title">1. Personal Details</span>
                </button>

                <div className={`google-step-connector ${currentStep > 1 ? "completed" : ""}`} />

                <button
                  type="button"
                  className={`google-step-pill ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}
                  onClick={() => {
                    if (currentStep > 2 || validateStep1()) {
                      setCurrentStep(2);
                    }
                  }}
                >
                  <span className="step-circle">{currentStep > 2 ? "✓" : "2"}</span>
                  <span className="step-title">2. Academic Details</span>
                </button>

                <div className={`google-step-connector ${currentStep > 2 ? "completed" : ""}`} />

                <button
                  type="button"
                  className={`google-step-pill ${currentStep === 3 ? "active" : ""}`}
                  onClick={() => {
                    if (validateStep1() && validateStep2()) {
                      setCurrentStep(3);
                    }
                  }}
                >
                  <span className="step-circle">3</span>
                  <span className="step-title">3. Password</span>
                </button>
              </div>

              {/* Progress Bar Indicator */}
              <div className="google-progress-bar-track">
                <div
                  className="google-progress-bar-fill"
                  style={{
                    width: currentStep === 1 ? "33.33%" : currentStep === 2 ? "66.66%" : "100%",
                  }}
                />
              </div>
            </div>

            {/* ============================================================ */}
            {/* STEP 1: 1. Personal Details                                  */}
            {/* ============================================================ */}
            {currentStep === 1 && (
              <div className="google-step-panel step-fade-in">
                <div className="panel-step-intro">
                  <div className="step-badge-indicator">
                    <span>STEP 1 OF 3</span>
                  </div>
                  <h3>1. Personal Details</h3>
                  <p>Please enter your legal name, date of birth, and complete OTP verification for both Gmail and Phone Number.</p>
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
                      autoFocus
                    />
                    {errors.fullName ? (
                      <span className="field-error">⚠️ {errors.fullName}</span>
                    ) : (
                      <span className="field-hint">Your legal name as per institutional records</span>
                    )}
                  </div>

                  {/* Gmail / Mail ID (with OTP Verification) */}
                  <div className="input-field phone-field-container">
                    <div className="phone-label-row">
                      <label htmlFor={emailId}>
                        Gmail / Email Address <span className="req">*</span>
                      </label>
                      {isEmailVerified && formData.email.trim().toLowerCase() === verifiedEmail.toLowerCase() ? (
                        <span className="phone-verified-tag">
                          ✓ Gmail Verified
                        </span>
                      ) : (
                        <span className="phone-unverified-tag">
                          OTP Verification Required
                        </span>
                      )}
                    </div>

                    <div className={`phone-input-action-wrapper ${errors.email ? "has-error" : ""} ${isEmailVerified && formData.email.trim().toLowerCase() === verifiedEmail.toLowerCase() ? "is-verified" : ""}`}>
                      <input
                        id={emailId}
                        type="email"
                        name="email"
                        placeholder="e.g. student@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                      {isEmailVerified && formData.email.trim().toLowerCase() === verifiedEmail.toLowerCase() ? (
                        <button
                          type="button"
                          className="phone-verified-btn"
                          disabled
                          title="Gmail address verified successfully"
                        >
                          <span className="check-icon">✓</span> Verified
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="phone-verify-action-btn email-btn-theme"
                          onClick={handleInitiateEmailVerification}
                          title="Click to receive 6-digit OTP via Email"
                        >
                          📧 Verify OTP
                        </button>
                      )}
                    </div>

                    {errors.email ? (
                      <span className="field-error">⚠️ {errors.email}</span>
                    ) : isEmailVerified ? (
                      <span className="field-success-hint">✓ Gmail address verified for official dispatches</span>
                    ) : (
                      <span className="field-hint">Click &quot;Verify OTP&quot; to authenticate your Gmail address</span>
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

                  {/* Phone Number with OTP Verification */}
                  <div className="input-field phone-field-container">
                    <div className="phone-label-row">
                      <label htmlFor={phoneId}>
                        Phone Number <span className="req">*</span>
                      </label>
                      {isPhoneVerified && formData.phone === verifiedPhoneNumber ? (
                        <span className="phone-verified-tag">
                          ✓ SMS Verified
                        </span>
                      ) : (
                        <span className="phone-unverified-tag">
                          OTP Verification Required
                        </span>
                      )}
                    </div>

                    <div className={`phone-input-action-wrapper ${errors.phone ? "has-error" : ""} ${isPhoneVerified && formData.phone === verifiedPhoneNumber ? "is-verified" : ""}`}>
                      <input
                        id={phoneId}
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />

                      {isPhoneVerified && formData.phone === verifiedPhoneNumber ? (
                        <button
                          type="button"
                          className="phone-verified-btn"
                          disabled
                          title="Phone number verified successfully"
                        >
                          <span className="check-icon">✓</span> Verified
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="phone-verify-action-btn"
                          onClick={handleInitiatePhoneVerification}
                          title="Click to receive 6-digit OTP via SMS"
                        >
                          📲 Verify OTP
                        </button>
                      )}
                    </div>

                    {errors.phone ? (
                      <span className="field-error">⚠️ {errors.phone}</span>
                    ) : isPhoneVerified ? (
                      <span className="field-success-hint">✓ Mobile number verified for academic alerts</span>
                    ) : (
                      <span className="field-hint">Click &quot;Verify OTP&quot; to authenticate your phone</span>
                    )}
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

                {/* Step 1 Action Bar */}
                <div className="wizard-action-bar single-right">
                  <button
                    type="button"
                    className="wizard-next-btn"
                    onClick={handleProceedToStep2}
                  >
                    <span>Continue to Academic Details</span>
                    <span className="arrow-icon">➔</span>
                  </button>
                </div>

                <p className="login-fallback">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="inline-link-btn"
                    onClick={() => onNavigate && onNavigate("login")}
                  >
                    Login here
                  </button>
                </p>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 2: 2. Academic & Department Details                     */}
            {/* ============================================================ */}
            {currentStep === 2 && (
              <div className="google-step-panel step-fade-in">
                <div className="panel-step-intro">
                  <div className="step-badge-indicator">
                    <span>STEP 2 OF 3</span>
                  </div>
                  <h3>2. Academic & Department Details</h3>
                  <p>Specify your student registration number and assigned academic department.</p>
                </div>

                <div className="field-group three-col">
                  {/* Roll No / Reg ID */}
                  <div className="input-field">
                    <label htmlFor={rollNoId}>
                      Registration No. (Roll No) <span className="req">*</span>
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
                      autoFocus
                    />
                    {errors.rollNo ? (
                      <span className="field-error">⚠️ {errors.rollNo}</span>
                    ) : (
                      <span className="field-hint">Institutional ID or Roll No</span>
                    )}
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

                  {/* Section */}
                  <div className="input-field">
                    <label htmlFor={secId}>
                      Class Section <span className="req">*</span>
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

                {/* Course Enrolment Preview Card */}
                <div className="step-course-preview-card">
                  <div className="preview-card-icon">📚</div>
                  <div className="preview-card-details">
                    <strong>Enrolling Course: Linear Algebra (MA25C02)</strong>
                    <p>Core Engineering Mathematics-II • 4.0 Credits • 5 Modules (Vector Spaces to SVD)</p>
                  </div>
                </div>

                {/* Step 2 Action Bar */}
                <div className="wizard-action-bar split-actions">
                  <button
                    type="button"
                    className="wizard-back-btn"
                    onClick={() => setCurrentStep(1)}
                  >
                    ← Back to Personal Details
                  </button>

                  <button
                    type="button"
                    className="wizard-next-btn"
                    onClick={handleProceedToStep3}
                  >
                    <span>Continue to Password</span>
                    <span className="arrow-icon">➔</span>
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 3: 3. Password                                          */}
            {/* ============================================================ */}
            {currentStep === 3 && (
              <div className="google-step-panel step-fade-in">
                <div className="panel-step-intro">
                  <div className="step-badge-indicator">
                    <span>STEP 3 OF 3</span>
                  </div>
                  <h3>3. Password</h3>
                  <p>Create a strong password for your LMS portal access and confirm your agreement.</p>
                </div>

                {/* Registration Snapshot Card */}
                <div className="student-reg-summary-card">
                  <div className="summary-card-header">
                    <span>📋 Verified Registration Summary</span>
                  </div>
                  <div className="summary-grid">
                    <div>
                      <span>Student Name:</span>
                      <strong>{formData.fullName}</strong>
                    </div>
                    <div>
                      <span>Reg Number:</span>
                      <strong>{formData.rollNo}</strong>
                    </div>
                    <div>
                      <span>Verified Gmail:</span>
                      <strong style={{ color: "#059669" }}>✅ {formData.email}</strong>
                    </div>
                    <div>
                      <span>Verified Phone:</span>
                      <strong style={{ color: "#059669" }}>✅ {formData.phone}</strong>
                    </div>
                    <div>
                      <span>Department:</span>
                      <strong>{formData.department}</strong>
                    </div>
                    <div>
                      <span>Section:</span>
                      <strong>{formData.section}</strong>
                    </div>
                  </div>
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
                        autoFocus
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
                          />
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
                      I confirm that the provided information is accurate, agree to institutional LMS policies, and request verified enrolment into <strong>Linear Algebra (MA25C02)</strong>. <span className="req">*</span>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <span className="field-error">⚠️ {errors.agreeTerms}</span>
                  )}
                </div>

                {/* Step 3 Action Bar */}
                <div className="wizard-action-bar split-actions">
                  <button
                    type="button"
                    className="wizard-back-btn"
                    onClick={() => setCurrentStep(2)}
                  >
                    ← Back to Academic Details
                  </button>

                  <button
                    type="button"
                    className="register-submit-btn"
                    onClick={handleSubmit}
                  >
                    <span>Complete Registration & Enrol 🎉</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* GMAIL & PHONE DUAL OTP VERIFICATION MODAL                    */}
      {/* ============================================================ */}
      {showOtpModal && currentOtpSession && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowOtpModal(false);
            }
          }}
        >
          <div className="otp-verification-modal">
            <button
              type="button"
              className="modal-close-icon"
              onClick={() => setShowOtpModal(false)}
              aria-label="Close OTP verification"
            >
              ✕
            </button>

            <div className="otp-modal-header">
              <div className="otp-modal-icon">
                {activeOtpType === "email" ? "📬" : "📲"}
              </div>
              <h3>Verify {activeOtpType === "email" ? "Gmail Address" : "Phone Number"}</h3>
              <p>
                We sent a 6-digit verification code to <br />
                <strong style={{ color: "#1e1b4b" }}>
                  {activeOtpType === "email" ? formData.email : formData.phone}
                </strong>
              </p>
            </div>

            {/* 6-Digit Segmented Input Boxes */}
            <div className="otp-inputs-wrapper" onPaste={handleOtpPaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpInputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={`otp-digit-box ${digit ? "filled" : ""} ${otpError ? "error" : ""}`}
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            {otpError && (
              <div className="otp-error-banner" role="alert">
                ⚠️ {otpError}
              </div>
            )}

            {/* Simulated Notification Helper Prompt */}
            {currentOtpSession && (
              <div className="otp-demo-hint">
                <span>💡 Demo {activeOtpType === "email" ? "Gmail" : "SMS"} Code: </span>
                <button
                  type="button"
                  className="otp-hint-code-btn"
                  onClick={() => handleAutoFillOtp(currentOtpSession.otp)}
                >
                  {currentOtpSession.otp} (Click to auto-fill)
                </button>
              </div>
            )}

            {/* Resend OTP & Timer */}
            <div className="otp-resend-row">
              {otpTimer > 0 ? (
                <span className="otp-timer-text">
                  ⏳ Resend Code in <strong>0:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong>
                </span>
              ) : (
                <button
                  type="button"
                  className="otp-resend-btn"
                  onClick={activeOtpType === "email" ? handleInitiateEmailVerification : handleInitiatePhoneVerification}
                >
                  🔄 Resend OTP Code
                </button>
              )}
            </div>

            {/* Verify Button */}
            <div className="otp-modal-actions">
              <button
                type="button"
                className="otp-verify-confirm-btn"
                onClick={handleConfirmVerifyOtp}
                disabled={isVerifyingOtp || otpDigits.join("").length < 6}
              >
                {isVerifyingOtp ? "Verifying..." : `Verify & Confirm ${activeOtpType === "email" ? "Gmail" : "Phone"}`}
              </button>
            </div>
          </div>
        </div>
      )}

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
              🎉
            </div>

            <div className="ticket-header">
              <span className="ticket-badge">REGISTRATION & DUAL VERIFICATION COMPLETE</span>
              <h2>Welcome to Linear Algebra!</h2>
              <p>Your registration for <strong>Linear Algebra (MA25C02)</strong> has been recorded and verified.</p>
            </div>

            {/* Email Dispatch Notice Badge */}
            <div className="email-dispatched-banner">
              <div className="email-banner-left">
                <span className="email-badge-icon">📧</span>
                <div>
                  <strong>Confirmation Email Dispatched!</strong>
                  <p>A detailed enrolment confirmation was sent to <strong>{formData.email}</strong></p>
                </div>
              </div>
              <button
                type="button"
                className="view-email-preview-btn"
                onClick={() => setShowEmailPreviewModal(true)}
              >
                ✉️ View Sent Email
              </button>
            </div>

            <div className="ticket-details-box">
              <div className="ticket-row">
                <span>Student Name:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="ticket-row">
                <span>Registration Number:</span>
                <strong>{formData.rollNo}</strong>
              </div>
              <div className="ticket-row">
                <span>Department:</span>
                <strong>{formData.department}</strong>
              </div>
              <div className="ticket-row">
                <span>Section:</span>
                <strong>{formData.section}</strong>
              </div>
              <div className="ticket-row">
                <span>Gmail Status:</span>
                <strong style={{ color: "#059669" }}>✅ {formData.email} (Gmail Verified)</strong>
              </div>
              <div className="ticket-row">
                <span>Phone Status:</span>
                <strong style={{ color: "#059669" }}>✅ {formData.phone} (SMS Verified)</strong>
              </div>
              <div className="ticket-row highlight-row">
                <span>Enrolled Course:</span>
                <strong>Linear Algebra (MA25C02) • 4.0 Credits</strong>
              </div>
            </div>

            {/* Mandatory Assessment Alert */}
            <div style={{
              background: "#eff6ff",
              border: "1.5px solid #bfdbfe",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "13px",
              color: "#1e40af",
              lineHeight: "1.45",
              marginBottom: "16px",
              textAlign: "left"
            }}>
              <strong>⚠️ Mandatory Enrolment Requirement:</strong> To complete course registration and calibrate your assigned syllabus modules, all registered students must take the 30-Question Diagnostic Assessment test (1 Mark each • 25 Mins).
            </div>

            <div className="ticket-actions">
              <button
                type="button"
                className="ticket-assessment-btn"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                  color: "#ffffff",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14.5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(67, 56, 202, 0.3)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  justifyContent: "center"
                }}
                onClick={() => {
                  setShowEnrolmentModal(false);
                  if (onNavigate) onNavigate("assessment", formData);
                }}
              >
                <span>📝 Start Mandatory Capability Assessment (30 Qs • 30 Marks • 25 Mins)</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SENT CONFIRMATION EMAIL PREVIEW MODAL                        */}
      {/* ============================================================ */}
      {showEmailPreviewModal && sentEmailData && (
        <div
          className="modal-backdrop email-preview-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEmailPreviewModal(false);
            }
          }}
        >
          <div className="email-preview-modal-card">
            <div className="email-preview-header-bar">
              <div className="email-client-badge">
                <span className="client-dot red"></span>
                <span className="client-dot yellow"></span>
                <span className="client-dot green"></span>
                <span className="client-title">📬 Adaptive LMS Webmail • Message Delivered to Inbox</span>
              </div>
              <button
                type="button"
                className="modal-close-icon"
                onClick={() => setShowEmailPreviewModal(false)}
                aria-label="Close email preview"
              >
                ✕
              </button>
            </div>

            <div className="email-meta-pane">
              <div className="email-meta-row">
                <span className="meta-label">From:</span>
                <span className="meta-val sender">{sentEmailData.sender}</span>
              </div>
              <div className="email-meta-row">
                <span className="meta-label">To:</span>
                <span className="meta-val">{sentEmailData.recipientName} &lt;{sentEmailData.recipient}&gt;</span>
              </div>
              <div className="email-meta-row">
                <span className="meta-label">Date:</span>
                <span className="meta-val">{sentEmailData.sentAt}</span>
              </div>
              <div className="email-meta-row">
                <span className="meta-label">Subject:</span>
                <span className="meta-val subject-bold">{sentEmailData.subject}</span>
              </div>
              <div className="email-meta-row">
                <span className="meta-label">Status:</span>
                <span className="meta-val status-delivered">✅ Delivered successfully via SMTP relay</span>
              </div>
            </div>

            {/* Email HTML Body Display */}
            <div
              className="email-body-pane"
              dangerouslySetInnerHTML={{ __html: sentEmailData.htmlContent }}
            />

            <div className="email-preview-footer">
              <button
                type="button"
                className="email-close-btn"
                onClick={() => setShowEmailPreviewModal(false)}
              >
                Done / Return to Enrolment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
