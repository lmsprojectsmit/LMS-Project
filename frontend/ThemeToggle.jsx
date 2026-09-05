import React, { useEffect } from "react";

export default function ThemeToggle({ theme, onToggle, floating = false, className = "" }) {
  const isDark = theme === "dark";

  // Keyboard shortcut: Alt + T to toggle theme anywhere
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle]);

  if (floating) {
    return (
      <aside
        className={`floating-theme-widget ${className}`}
        aria-label="Quick Theme Switcher"
      >
        <button
          type="button"
          className={`floating-theme-btn ${isDark ? "is-dark" : "is-light"}`}
          onClick={onToggle}
          title={`Switch to ${isDark ? "Light" : "Dark"} Theme (Shortcut: Alt + T)`}
          aria-label={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {isDark ? "☀️" : "🌙"}
          </span>
          <span className="floating-theme-label">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
          <span className="theme-shortcut-hint" aria-hidden="true">Alt+T</span>
        </button>
      </aside>
    );
  }

  return (
    <button
      type="button"
      className={`theme-nav-toggle-btn ${isDark ? "is-dark" : "is-light"} ${className}`}
      onClick={onToggle}
      title={`Switch to ${isDark ? "Light" : "Dark"} Theme (Alt+T)`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
      <span className="theme-nav-label">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
