import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Assessment from "./Assessment";
import Faculty from "./Faculty";
import Syllabus from "./Syllabus";
import LessonView from "./LessonView";

function App() {
  // Default to the explanatory homepage when opening the website
  const [currentPage, setCurrentPage] = useState("home");
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const handleNavigate = (page, data = null) => {
    if ((page === "home" || page === "syllabus" || page === "lesson") && data && data.role) {
      setCurrentUser(data);
    } else if (data && data.student && data.student.role) {
      setCurrentUser(data.student);
    }
    if (page === "lesson" && data) {
      setCurrentLesson(data);
    }
    if (data && !data.isExistingStudent && !data.student) {
      setRegisteredStudent(data);
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
    <div className="app-root">
      {currentPage === "home" && (
        <Home
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "register" && (
        <Register
          onNavigate={handleNavigate}
          onRegistrationSuccess={(student) => {
            setRegisteredStudent(student);
          }}
        />
      )}

      {currentPage === "assessment" && (
        <Assessment
          onNavigate={handleNavigate}
          studentInfo={registeredStudent}
        />
      )}

      {currentPage === "login" && (
        <Login onNavigate={handleNavigate} />
      )}

      {currentPage === "syllabus" && (
        <Syllabus
          onNavigate={handleNavigate}
          student={currentUser}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "lesson" && (
        <LessonView
          onNavigate={handleNavigate}
          student={currentUser}
          lessonInfo={currentLesson}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "faculty" && (
        <Faculty
          onNavigate={handleNavigate}
          registeredStudent={registeredStudent}
        />
      )}
    </div>
  );
}

export default App;