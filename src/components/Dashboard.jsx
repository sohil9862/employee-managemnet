import {
  ExportOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

function Dashboard() {
  return (
    <div>
      {/* Top section */}
      <div className="flex items-center justify-between">
        
        {/* Left side */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Good morning, Nadia.
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your team today.
          </p>
        </div>

        {/* Right side - Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Export Report */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-800
                       text-gray-700 dark:text-gray-200
                       hover:bg-gray-100 dark:hover:bg-gray-700
                       transition cursor-pointer"
          >
            <ExportOutlined />
            Export Report
          </button>

          {/* Add Employee */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-blue-600 text-white
                       hover:bg-blue-700
                       transition cursor-pointer"
          >
            <UserAddOutlined />
            Add Employee
          </button>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;