import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Assessment from "./Assessment";
import Faculty from "./Faculty";
import Syllabus from "./Syllabus";
import LessonView from "./LessonView";
import Admin from "./Admin";
import ThemeToggle from "./ThemeToggle";
import "./Theme.css";

function App() {
  // Helper to get initial route from URL hash
  const getInitialPage = () => {
    try {
      const hash = window.location.hash.replace("#", "").trim();
      const validPages = ["home", "login", "register", "assessment", "syllabus", "lesson", "faculty", "admin"];
      if (validPages.includes(hash)) {
        return hash;
      }
    } catch {
      // Fallback
    }
    return "home";
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Global Theme System: "light" | "dark" (persisted in localStorage, default "dark")
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("eduverse_theme");
      if (saved) return saved;
      return "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      document.body.className = `theme-${theme}`;
      localStorage.setItem("eduverse_theme", theme);
    } catch (e) {
      console.error("Failed to persist theme", e);
    }
  }, [theme]);

  // Handle Browser Back / Forward Button navigation via popstate
  useEffect(() => {
    const initialPage = getInitialPage();
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: initialPage }, "", `#${initialPage}`);
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        handleNavigate(event.state.page, event.state.data, true);
      } else {
        const hash = window.location.hash.replace("#", "").trim() || "home";
        handleNavigate(hash, null, true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleNavigate = (page, data = null, isFromPopState = false) => {
    // Support "back" keyword
    if (page === "back") {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      page = "home";
    }

    if (data) {
      if ((page === "home" || page === "syllabus" || page === "lesson") && data.role) {
        setCurrentUser(data);
      } else if (data.student && data.student.role) {
        setCurrentUser(data.student);
      }
      if (page === "lesson") {
        setCurrentLesson(data);
      }
      if (!data.isExistingStudent && !data.student) {
        setRegisteredStudent((prev) => ({ ...(prev || {}), ...data }));
        if (data.role) {
          setCurrentUser((prev) => ({ ...(prev || {}), ...data }));
        }
      }
    }

    // Ensure diagnostic assessment only appears right after registration, never again after that
    let targetPage = page;
    if (targetPage === "assessment") {
      const alreadyAssessed =
        currentUser?.hasTakenAssessment ||
        registeredStudent?.hasTakenAssessment ||
        data?.hasTakenAssessment;
      if (alreadyAssessed) {
        targetPage = "syllabus";
      }
    }

    // Push into browser history stack so the browser's Back button works seamlessly
    if (!isFromPopState) {
      try {
        window.history.pushState({ page: targetPage, data }, "", `#${targetPage}`);
      } catch (e) {
        console.warn("History pushState failed:", e);
      }
    }

    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`app-root theme-${theme}`} data-theme={theme}>
      {/* Floating Theme Quick Switcher available globally */}
      <ThemeToggle floating theme={theme} onToggle={toggleTheme} />

      {currentPage === "home" && (
        <Home
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "register" && (
        <Register
          onNavigate={handleNavigate}
          onRegistrationSuccess={(student) => {
            setRegisteredStudent(student);
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "assessment" && (
        <Assessment
          onNavigate={handleNavigate}
          studentInfo={registeredStudent}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "login" && (
        <Login
          onNavigate={handleNavigate}
          registeredStudent={registeredStudent}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "syllabus" && (
        <Syllabus
          onNavigate={handleNavigate}
          student={currentUser || registeredStudent}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "lesson" && (
        <LessonView
          onNavigate={handleNavigate}
          student={currentUser || registeredStudent}
          lessonInfo={currentLesson}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "faculty" && (
        <Faculty
          onNavigate={handleNavigate}
          registeredStudent={registeredStudent}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {currentPage === "admin" && (
        <Admin
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          registeredStudent={registeredStudent}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}

export default App;