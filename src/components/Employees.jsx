import { Input, Button, Table, Tag, Avatar } from "antd";

import {
  SearchOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Employees() {
  const employees = [
    {
      key: 1,
      name: "John",
      email: "john@example.com",
      role: "Developer",
      department: "IT",
      status: "Working",
    },
    {
      key: 2,
      name: "Sarah",
      email: "sarah@example.com",
      role: "Designer",
      department: "Design",
      status: "Available",
    },
    {
      key: 3,
      name: "Ram",
      email: "ram@example.com",
      role: "Developer",
      department: "IT",
      status: "Offline",
    },
  ];

  const columns = [
    {
      title: "Employee",
      key: "employee",
      render: (_, employee) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} />

          <div>
            <div className="font-medium text-gray-800 dark:text-white">
              {employee.name}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {employee.email}
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";

        if (status === "Working") {
          color = "green";
        }

        if (status === "Available") {
          color = "blue";
        }

        if (status === "Offline") {
          color = "default";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<EditOutlined />}
          />

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">

        {/* Left */}
        <div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            Employees
          </div>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your employees and their information.
          </p>
        </div>

        {/* Right */}
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="large"
        >
          Add Employee
        </Button>

      </div>

      {/* Search */}
      <div className="mb-4 w-80">
        <Input
          size="large"
          placeholder="Search employees..."
          prefix={
            <SearchOutlined className="text-gray-400" />
          }
        />
      </div>

      {/* Employee Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table
          columns={columns}
          dataSource={employees}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </div>
  );
}

export default Employees;