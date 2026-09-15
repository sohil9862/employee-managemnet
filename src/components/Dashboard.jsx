import { useState } from "react";
import {
  ExportOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import AddEmployee from "./AddEmployee";

function Dashboard({ onAddEmployee }) {
  const [addingEmployee, setAddingEmployee] = useState(false);

  const handleOpenAdd = () => setAddingEmployee(true);
  const handleCancelAdd = () => setAddingEmployee(false);

  const handleAddEmployee = (newEmployee) => {
    onAddEmployee(newEmployee);
    setAddingEmployee(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 h-full overflow-hidden">
      {/* Top section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Good morning, Nadia
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Here's what's happening with your team today.
            </p>
          </div>
        </div>

        {/* Right side - Buttons */}
        <div className="flex flex-col gap-3 w-full md:w-auto md:flex-row">
          <button
            className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-1.5 rounded-lg text-sm
                       border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-800
                       text-gray-700 dark:text-gray-200
                       hover:bg-gray-100 dark:hover:bg-gray-700
                       transition cursor-pointer"
          >
            <ExportOutlined />
            Export Report
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-1.5 rounded-lg text-sm
                       bg-blue-600 text-white
                       hover:bg-blue-700
                       transition cursor-pointer shadow-sm"
          >
            <UserAddOutlined />
            Add Employee
          </button>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Total Employees
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
            128
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            On Leave Today
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
            4
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Open Positions
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
            7
          </p>
        </div>
      </div>

      {/* Add Employee modal */}
      <AddEmployee
        open={addingEmployee}
        onCancel={handleCancelAdd}
        onAdd={handleAddEmployee}
      />
    </div>
  );
}

export default Dashboard;