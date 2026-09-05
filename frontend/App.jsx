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
  // Default to the explanatory homepage when opening the website
  const [currentPage, setCurrentPage] = useState("home");
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Global Theme System: "light" | "dark" (persisted in localStorage)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("eduverse_theme") || "light";
    } catch {
      return "light";
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleNavigate = (page, data = null) => {
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
    if (page === "assessment") {
      const alreadyAssessed =
        currentUser?.hasTakenAssessment ||
        registeredStudent?.hasTakenAssessment ||
        data?.hasTakenAssessment;
      if (alreadyAssessed) {
        setCurrentPage("syllabus");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    setCurrentPage(page);
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