import { useState } from "react";
import "./Login.css";
import { authAPI } from "./api";
import ThemeToggle from "./ThemeToggle";

function Login({ onNavigate, registeredStudent, theme, onToggleTheme }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: registeredStudent?.email || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const identifier = (formData.email || "").trim();
    const password = (formData.password || "").trim();

    try {
      // 1. Authenticate against real backend
      const tokenData = await authAPI.login(identifier, password);

      // Store token
      localStorage.setItem("lms_token", tokenData.access_token);

      // Fetch current user details using token
      const user = await authAPI.getCurrentUser(tokenData.access_token);

      // Store user details for frontend state
      localStorage.setItem("lms_user", JSON.stringify(user));

      if (user.role === "admin") {
        alert(`Welcome Institutional Administrator: ${user.full_name || user.email}. Redirecting to Admin Console.`);
        if (onNavigate) onNavigate("admin", user);
      } else if (user.role === "faculty") {
        alert(`Welcome Faculty: ${user.full_name || user.email}. Redirecting to Faculty Dashboard.`);
        if (onNavigate) onNavigate("faculty", user);
      } else {
        alert(`Welcome back, ${user.full_name || user.email}! Directing to your Unit-Wise Syllabus.`);
        if (onNavigate) onNavigate("syllabus", user);
      }
    } catch (err) {
      // 401 Unauthorized or other error handling
      alert(err.message || "Invalid email or password");
      // Explicitly return and do not redirect
      return;
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
        <div className="login-top-bar">
          <button
            type="button"
            className="login-back-home"
            onClick={() => (onNavigate ? onNavigate("back") : window.history.back())}
          >
            ← Back
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <div className="logo" aria-hidden="true">
          🏛️
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
              placeholder="e.g. username or user@institution.edu"
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
            href="#back"
            className="back-home-link"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate("back");
              } else {
                window.history.back();
              }
            }}
          >
            ← Back to Previous Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
