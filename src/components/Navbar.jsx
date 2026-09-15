import { Avatar, Dropdown, Input, Badge } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  DownOutlined,
  BellOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

function Navbar({ currentPage, darkMode, setDarkMode, setIsLoggedIn }) {
  const menuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      setIsLoggedIn(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 h-12 border-b flex items-center justify-between px-3 md:px-6
                 bg-white dark:bg-gray-900
                 border-gray-200 dark:border-gray-700"
    >
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-1 md:gap-2">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          TalentDesk
        </span>

        <span className="text-black dark:text-white text-sm">&gt;</span>

        <span className="text-black dark:text-white text-sm font-medium">
          {currentPage}
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="hidden md:block w-64">
          <Input
            size="small"
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            styles={{
              input: {
                color: darkMode ? "#ffffff" : "#000000",
              },
            }}
          />
        </div>

        {/* Notification */}
        <Badge count={1} size="small" offset={[-6, 6]}>
          <button
            className="w-8 h-8 flex items-center justify-center
                      rounded-full cursor-pointer transition
                      hover:bg-gray-100
                      dark:hover:bg-gray-800"
          >
            <BellOutlined
              className="text-base"
              style={{
                color: darkMode ? "#d1d5db" : "#4b5563",
              }}
            />
          </button>
        </Badge>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-8 h-8 flex items-center justify-center
                     rounded-full cursor-pointer transition
                     hover:bg-gray-100
                     dark:bg-gray-800
                     dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <SunOutlined className="text-base text-yellow-400" />
          ) : (
            <MoonOutlined className="text-base text-gray-600" />
          )}
        </button>

        {/* Profile + Dropdown (single clickable trigger) */}
        <Dropdown
          menu={{ items: menuItems, onClick: handleMenuClick }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div
            className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg
                       transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Avatar
              size="small"
              className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              icon={<UserOutlined />}
            />

            <span className="hidden md:inline text-gray-700 dark:text-gray-200 text-sm font-medium">
              Nadia
            </span>

            <DownOutlined className="hidden md:block text-gray-500 dark:text-gray-300 text-xs" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default Navbar;