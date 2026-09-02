import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Assessment from "./Assessment";

function App() {
  // Default to the explanatory homepage when opening the website
  const [currentPage, setCurrentPage] = useState("home");
  const [registeredStudent, setRegisteredStudent] = useState(null);

  const handleNavigate = (page, data = null) => {
    if (data) {
      setRegisteredStudent(data);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-root">
      {currentPage === "home" && (
        <Home onNavigate={handleNavigate} />
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
    </div>
  );
}

export default App;