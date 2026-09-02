import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  // Default to the explanatory homepage when opening the website
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app-root">
      {currentPage === "home" && <Home onNavigate={setCurrentPage} />}
      {currentPage === "register" && <Register onNavigate={setCurrentPage} />}
      {currentPage === "login" && <Login onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;