import {
  DashboardOutlined,
  TeamOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

function Sidebar({
  currentPage,
  setCurrentPage,
  collapsed,
  setCollapsed,
}) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      name: "Employees",
      icon: <TeamOutlined />,
    },
    {
      name: "Departments",
      icon: <CheckSquareOutlined />,
    },
    {
      name: "Settings",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <aside
      className={`h-screen overflow-hidden border-r transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-38 md:w-50"}
        bg-gray-900 border-gray-700`}
    >
      {/* Logo */}
      <div
        className={`h-16 flex items-center flex-shrink-0 ${
          collapsed ? "justify-center" : "px-4"
        }`}
      >
        <div className="flex items-center gap-3">

          {/* T Box */}
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
            T
          </div>

          {/* Logo Name */}
          {!collapsed && (
            <div className="hidden md:block text-xl font-bold text-white">
              TalentDesk
            </div>
          )}

        </div>
      </div>

      {/* Workspace */}
      {!collapsed && (
        <div className="hidden md:block text-[10px] font-medium uppercase tracking-wide ml-4 mt-6 text-gray-400 flex-shrink-0">
          WORKSPACE
        </div>
      )}

      {/* Menu */}
      <nav className="p-4 space-y-2 mt-2 flex-1 min-h-0 overflow-hidden">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setCurrentPage(item.name)}
            title={collapsed ? item.name : ""}
            className={`flex items-center rounded-lg cursor-pointer transition
              ${
                collapsed
                  ? "justify-center px-3 py-3"
                  : "justify-center px-3 py-3 md:justify-start md:gap-3 md:px-4 md:py-3"
              }
              ${
                currentPage === item.name
                  ? "bg-blue-900/30 text-blue-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
          >
            {/* Icon */}
            <span className="text-lg flex-shrink-0">
              {item.icon}
            </span>

            {/* Name */}
            {!collapsed && (
              <span className="font-medium">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Button - Bottom */}
      <div className="mt-auto p-4 border-t border-gray-700 flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-10 flex items-center justify-center gap-2 rounded-lg cursor-pointer
                     text-gray-300 hover:bg-gray-800"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="text-lg" />
          ) : (
            <MenuFoldOutlined className="text-lg" />
          )}

          {!collapsed && (
            <span className="hidden md:inline font-medium">
              Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;