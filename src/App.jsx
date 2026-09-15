import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Login from "./components/Login";

// Default employees
const defaultEmployees = [
  {
    key: 1,
    name: "John Smith",
    department: "IT",
    role: "Software Developer",
    salary: "$3,500",
    joinedDate: "2024-01-15",
    status: "Working",
    email: "john.smith@example.com",
    phone: "+1 415 555 0121",
    skills: ["React", "JavaScript", "Node.js"],
    active: true,
  },
  {
    key: 2,
    name: "Sarah Johnson",
    department: "Design",
    role: "UI/UX Designer",
    salary: "$3,200",
    joinedDate: "2024-02-20",
    status: "Available",
    email: "sarah.johnson@example.com",
    phone: "+1 415 555 0122",
    skills: ["Figma", "UI Design", "UX"],
    active: true,
  },
  {
    key: 3,
    name: "Ram Sharma",
    department: "IT",
    role: "Frontend Developer",
    salary: "$3,000",
    joinedDate: "2024-03-10",
    status: "Working",
    email: "ram.sharma@example.com",
    phone: "+977 9800000003",
    skills: ["React", "Tailwind", "JavaScript"],
    active: true,
  },
  {
    key: 4,
    name: "Emily Davis",
    department: "HR",
    role: "HR Manager",
    salary: "$4,000",
    joinedDate: "2023-11-05",
    status: "Available",
    email: "emily.davis@example.com",
    phone: "+1 415 555 0124",
    skills: ["Recruitment", "Management", "HR"],
    active: true,
  },
  {
    key: 5,
    name: "David Wilson",
    department: "Finance",
    role: "Accountant",
    salary: "$3,800",
    joinedDate: "2023-09-18",
    status: "Working",
    email: "david.wilson@example.com",
    phone: "+1 415 555 0125",
    skills: ["Accounting", "Excel", "Finance"],
    active: true,
  },
  {
    key: 6,
    name: "Michael Brown",
    department: "Marketing",
    role: "Marketing Executive",
    salary: "$2,900",
    joinedDate: "2024-04-12",
    status: "Offline",
    email: "michael.brown@example.com",
    phone: "+1 415 555 0126",
    skills: ["Marketing", "SEO", "Content"],
    active: false,
  },
  {
    key: 7,
    name: "Jessica Taylor",
    department: "Sales",
    role: "Sales Executive",
    salary: "$3,100",
    joinedDate: "2024-05-08",
    status: "Available",
    email: "jessica.taylor@example.com",
    phone: "+1 415 555 0127",
    skills: ["Sales", "Communication", "CRM"],
    active: true,
  },
  {
    key: 8,
    name: "Daniel Anderson",
    department: "IT",
    role: "Backend Developer",
    salary: "$3,600",
    joinedDate: "2023-12-01",
    status: "Working",
    email: "daniel.anderson@example.com",
    phone: "+1 415 555 0128",
    skills: ["Node.js", "PostgreSQL", "API"],
    active: true,
  },
  {
    key: 9,
    name: "Sophia Martinez",
    department: "Design",
    role: "Graphic Designer",
    salary: "$2,800",
    joinedDate: "2024-06-15",
    status: "Offline",
    email: "sophia.martinez@example.com",
    phone: "+1 415 555 0129",
    skills: ["Photoshop", "Illustrator", "Branding"],
    active: false,
  },
  {
    key: 10,
    name: "James Thomas",
    department: "Operations",
    role: "Operations Manager",
    salary: "$4,200",
    joinedDate: "2023-08-22",
    status: "Working",
    email: "james.thomas@example.com",
    phone: "+1 415 555 0130",
    skills: ["Operations", "Management", "Planning"],
    active: true,
  },
];

function App() {
  // Login persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Shared employee state
  const [employees, setEmployees] = useState(() => {
    try {
      const savedEmployees = localStorage.getItem("employees");

      if (savedEmployees) {
        const parsedEmployees = JSON.parse(savedEmployees);

        if (Array.isArray(parsedEmployees)) {
          return parsedEmployees;
        }
      }
    } catch (error) {
      console.error("Failed to load employees:", error);
    }

    return defaultEmployees;
  });

  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  // Add employee
  const handleAddEmployee = (newEmployee) => {
    setEmployees((previousEmployees) => {
      const newEmployeeWithKey = {
        ...newEmployee,
        key:
          previousEmployees.length > 0
            ? Math.max(
                ...previousEmployees.map(
                  (employee) => employee.key
                )
              ) + 1
            : 1,
      };

      const updatedEmployees = [
        ...previousEmployees,
        newEmployeeWithKey,
      ];

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      return updatedEmployees;
    });
  };

  // Update employee
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((previousEmployees) => {
      const updatedEmployees = previousEmployees.map(
        (employee) =>
          employee.key === updatedEmployee.key
            ? updatedEmployee
            : employee
      );

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      return updatedEmployees;
    });
  };

  // Delete employee
  const handleDeleteEmployee = (employeeKey) => {
    setEmployees((previousEmployees) => {
      const updatedEmployees = previousEmployees.filter(
        (employee) => employee.key !== employeeKey
      );

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      return updatedEmployees;
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // Login page
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

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
            setIsLoggedIn={handleLogout}
          />

          {/* Content */}
          <main className="p-4 md:p-6">

            {/* Dashboard */}
            {currentPage === "Dashboard" && (
              <Dashboard
                darkMode={darkMode}
                onAddEmployee={handleAddEmployee}
              />
            )}

            {/* Employees */}
            {currentPage === "Employees" && (
              <Employees
                darkMode={darkMode}
                employees={employees}
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            )}

            {/* Departments */}
            {currentPage === "Departments" && (
              <div>Departments</div>
            )}

            {/* Settings */}
            {currentPage === "Settings" && (
              <div>Settings</div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

