import { useState } from "react";
import "./Login.css";

function Login({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    if (formData.role === "faculty") {
      alert(`Welcome Faculty: ${formData.email || "Dr. K. Senthil Kumar"}. Redirecting to Faculty Dashboard.`);
      if (onNavigate) onNavigate("faculty");
    } else {
      alert(`Welcome Student: ${formData.email || "Student"}. Redirecting to Diagnostic Assessment.`);
      if (onNavigate) onNavigate("assessment");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password reset instructions will be sent to your registered institutional email.");
  };

  return (
    <div className="login-container">
      {/* Decorative background mathematics symbols */}
      <div className="login-bg-decor" aria-hidden="true">
        <span className="login-bg-symbol sym-1">A x = b</span>
        <span className="login-bg-symbol sym-2">det(A) ≠ 0</span>
        <span className="login-bg-symbol sym-3">λ · v</span>
        <span className="login-bg-symbol sym-4">Rank(A) + Nullity(A) = n</span>
      </div>

      <div className="login-card">
        <div className="logo" aria-hidden="true">
          🎓
        </div>

        <h1>Learning Management System</h1>
        <p className="subtitle">Learn • Practice • Succeed</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email / Username */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email / Username
            </label>
            <input
              id="login-email"
              type="text"
              name="email"
              placeholder="e.g. rollno@institution.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="password-box">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="form-group">
            <label htmlFor="login-role" className="form-label">
              Login As
            </label>
            <select
              id="login-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Remember / Forgot */}
          <div className="login-options">
            <label className="remember-label" htmlFor="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" onClick={handleForgotPassword} className="forgot-link">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Sign In to Portal
          </button>
        </form>

        <p className="register-text">
          New student or faculty?{" "}
          <a
            href="#register"
            className="register-link"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("register");
            }}
          >
            Register here
          </a>
        </p>

        <div className="back-home-container">
          <a
            href="#home"
            className="back-home-link"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("home");
            }}
          >
            ← Back to Platform Overview
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;