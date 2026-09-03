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

function Navbar({ currentPage, darkMode, setDarkMode }) {
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

  return (
    <header
      className="h-16 border-b flex items-center justify-between px-6
                 bg-white dark:bg-gray-900
                 border-gray-200 dark:border-gray-700"
    >
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2">

        <span className="text-gray-500 dark:text-gray-400 font-small">
          TalentDesk
        </span>

        <span className="text-black dark:text-white">
          &gt;
        </span>

        <span className="text-black dark:text-white font-small">
          {currentPage}
        </span>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">

        {/* Search */}
      <div className="w-80">
        <Input
          placeholder="Search..." 
          prefix={
            <SearchOutlined
              style={{
                color: darkMode ? "#9ca3af" : "#9ca3af",
              }}
            />
          }
          className="rounded-lg"
          style={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#ffffff" : "#000000",
          }}
          styles={{
            input: {
              color: darkMode ? "#ffffff" : "#000000",
            },
          }}
        />
      </div>

        {/* Notification */}
        <Badge count={1} size="small">
          <button
            className="w-9 h-9 flex items-center justify-center
                      rounded-full cursor-pointer
                      hover:bg-gray-100
                      dark:hover:bg-gray-800"
          >
            <BellOutlined
              className="text-lg"
              style={{
                color: darkMode ? "#d1d5db" : "#4b5563",
              }}
            />
          </button>
        </Badge>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-9 h-9 flex items-center justify-center
                     rounded-full cursor-pointer
                     hover:bg-gray-100
                     dark:bg-gray-800
                     dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <SunOutlined className="text-lg text-yellow-400" />
          ) : (
            <MoonOutlined className="text-lg text-gray-600" />
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} />

          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Nadia
          </span>
        </div>

        {/* Dropdown */}
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <DownOutlined
              className="text-gray-500 dark:text-gray-300 text-xs"
            />
          </div>
        </Dropdown>

      </div>
    </header>
  );
}

export default Navbar;