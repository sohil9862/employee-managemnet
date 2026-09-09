import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  if (!isLoggedIn) { return ( <Login setIsLoggedIn={setIsLoggedIn} /> ); }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Area */}
      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <Navbar
          currentPage={currentPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setIsLoggedIn={setIsLoggedIn}
        />

        {/* Content */}
        <main className="p-4 md:p-6">
          {currentPage === "Dashboard" && (
            <Dashboard darkMode={darkMode}/>
          )}

          {currentPage === "Employees" && (
            <Employees  darkMode={darkMode}/>
          )}

          {currentPage === "Departments" && (
              <div> Departments </div>
            
          )}

          {currentPage === "Settings" && (
              <div> Settings </div>
          )}
        </main>

      </div>
    </div>
  </div>
  );
}

export default App;