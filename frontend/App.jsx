import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Assessment from "./Assessment";
import Faculty from "./Faculty";

function App() {
  // Default to the explanatory homepage when opening the website
  const [currentPage, setCurrentPage] = useState("home");
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleNavigate = (page, data = null) => {
    if (page === "home" && data && data.role) {
      setCurrentUser(data);
    }
    if (data && !data.isExistingStudent) {
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