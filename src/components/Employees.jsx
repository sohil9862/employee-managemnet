import { useState } from "react";

import {
  ConfigProvider,
  Input,
  Button,
  Table,
  Tag,
  Avatar,
  Select,
  Space,
  Tooltip,
  theme,
} from "antd";

import {
  SearchOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

// Separate modal components
import ViewEmployee from "./ViewEmployee";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";

function Employees({
  darkMode,
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) {
  // --------------------------------------------------
  // SEARCH AND FILTER STATE
  // --------------------------------------------------

  const [searchText, setSearchText] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // --------------------------------------------------
  // EDIT STATE
  // --------------------------------------------------

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  // --------------------------------------------------
  // VIEW STATE
  // --------------------------------------------------

  const [viewingEmployee, setViewingEmployee] =
    useState(null);

  // --------------------------------------------------
  // ADD EMPLOYEE STATE
  // --------------------------------------------------

  const [addingEmployee, setAddingEmployee] =
    useState(false);

  // --------------------------------------------------
  // DARK MODE CLASSES
  // --------------------------------------------------

  const textColor = darkMode
    ? "text-gray-100"
    : "text-gray-900";

  const secondaryText = darkMode
    ? "text-gray-400"
    : "text-gray-500";

  const borderColor = darkMode
    ? "border-gray-700"
    : "border-gray-200";

  // --------------------------------------------------
  // ADD EMPLOYEE FUNCTIONS
  // --------------------------------------------------

  const handleOpenAdd = () => {
    // Close other modals first
    setViewingEmployee(null);
    setEditingEmployee(null);

    // Open Add Employee modal
    setAddingEmployee(true);
  };

  const handleCancelAdd = () => {
    setAddingEmployee(false);
  };

  const handleAddEmployee = (newEmployee) => {
    onAddEmployee(newEmployee);
    setAddingEmployee(false);
  };

  // --------------------------------------------------
  // EDIT FUNCTIONS
  // --------------------------------------------------

  const handleEditChange = (field, value) => {
    setEditingEmployee((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleOpenEdit = (employee) => {
    // Close View modal first
    setViewingEmployee(null);

    // Close Add modal
    setAddingEmployee(false);

    // Create editable copy
    setEditingEmployee({
      ...employee,
      skills: employee.skills || [],
      email: employee.email || "",
      phone: employee.phone || "",
      active:
        employee.active !== undefined
          ? employee.active
          : true,
    });
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleSaveEdit = () => {
    if (!editingEmployee) {
      return;
    }

    onUpdateEmployee(editingEmployee);

    setEditingEmployee(null);
  };

  // --------------------------------------------------
  // VIEW FUNCTIONS
  // --------------------------------------------------

  const handleOpenView = (employee) => {
    // Close Edit modal first
    setEditingEmployee(null);

    // Close Add modal
    setAddingEmployee(false);

    // Open View modal
    setViewingEmployee({
      ...employee,
    });
  };

  const handleCloseView = () => {
    setViewingEmployee(null);
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const handleDeleteEmployee = (employee) => {
    onDeleteEmployee(employee.key);

    // Close View if deleted employee was being viewed
    if (
      viewingEmployee &&
      viewingEmployee.key === employee.key
    ) {
      handleCloseView();
    }

    // Close Edit if deleted employee was being edited
    if (
      editingEmployee &&
      editingEmployee.key === employee.key
    ) {
      handleCancelEdit();
    }
  };

  // --------------------------------------------------
  // FILTER
  // --------------------------------------------------

  const filteredEmployees = employees.filter(
    (employee) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search) ||
        employee.department
          .toLowerCase()
          .includes(search) ||
        employee.role
          .toLowerCase()
          .includes(search);

      const matchesDepartment =
        departmentFilter === "all" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "all" ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    }
  );

  // --------------------------------------------------
  // RESET FILTERS
  // --------------------------------------------------

  const resetFilters = () => {
    setSearchText("");
    setDepartmentFilter("all");
    setStatusFilter("all");
  };

  // --------------------------------------------------
  // STATUS COLOR
  // --------------------------------------------------

  const getStatusColor = (status) => {
    if (status === "Working") {
      return "green";
    }

    if (status === "Available") {
      return "blue";
    }

    return "default";
  };

  // --------------------------------------------------
  // TABLE COLUMNS
  // --------------------------------------------------

  const columns = [
    {
      title: "Name",
      key: "name",

      render: (_, employee) => (
        <div className="flex items-center gap-2">
          <Avatar
            size="small"
            className={
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }
            icon={<UserOutlined />}
          />

          <span
            className={`text-sm font-medium ${textColor}`}
          >
            {employee.name}
          </span>
        </div>
      ),
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },

    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },

    // --------------------------------------------------
    // ACTIONS
    // --------------------------------------------------

    {
      title: "Action",
      key: "action",

      render: (_, employee) => (
        <div className="flex items-center gap-1">

          {/* VIEW */}

          <Tooltip title="View Employee">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              className={
                darkMode
                  ? "text-gray-300 hover:!bg-blue-900 hover:!text-blue-300"
                  : "text-gray-600 hover:!bg-blue-50 hover:!text-blue-600"
              }
              onClick={() =>
                handleOpenView(employee)
              }
            />
          </Tooltip>

          {/* EDIT */}

          <Tooltip title="Edit Employee">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className={
                darkMode
                  ? "text-gray-300 hover:!bg-gray-700 hover:!text-gray-100"
                  : "text-gray-600 hover:!bg-gray-100 hover:!text-gray-700"
              }
              onClick={() =>
                handleOpenEdit(employee)
              }
            />
          </Tooltip>

          {/* DELETE */}

          <Tooltip title="Delete Employee">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              className={
                darkMode
                  ? "hover:!bg-red-900"
                  : "hover:!bg-red-50"
              }
              onClick={() =>
                handleDeleteEmployee(employee)
              }
            />
          </Tooltip>

        </div>
      ),
    },
  ];

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,

        token: {
          fontSize: 13,
        },
      }}
    >
      <div
        className={`w-full min-h-full text-sm ${textColor}`}
      >

        {/* PAGE HEADER */}

        <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Employee
            </h3>

            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Manage your employees and their information.
            </p>
          </div>

          {/* ADD EMPLOYEE */}

          <Button
            type="primary"
            icon={<UserAddOutlined />}
            className="w-full md:w-auto"
            onClick={handleOpenAdd}
          >
            Add Employee
          </Button>

        </div>

        {/* SEARCH AND FILTERS */}

        <div className="mb-3 w-full">

          <Space
            wrap
            size="small"
            className="w-full"
          >

            {/* SEARCH */}

            <Input
              placeholder="Search by name, department or role..."
              prefix={
                <SearchOutlined
                  style={{
                    color: "#9ca3af",
                  }}
                />
              }
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              allowClear
              className="w-full md:w-64 text-sm"
            />

            {/* DEPARTMENT */}

            <Select
              value={departmentFilter}
              onChange={setDepartmentFilter}
              className="w-full md:w-36"
              options={[
                {
                  value: "all",
                  label: "All Departments",
                },
                {
                  value: "IT",
                  label: "IT",
                },
                {
                  value: "Design",
                  label: "Design",
                },
                {
                  value: "HR",
                  label: "HR",
                },
                {
                  value: "Finance",
                  label: "Finance",
                },
                {
                  value: "Marketing",
                  label: "Marketing",
                },
                {
                  value: "Sales",
                  label: "Sales",
                },
                {
                  value: "Operations",
                  label: "Operations",
                },
              ]}
            />

            {/* STATUS */}

            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full md:w-32"
              options={[
                {
                  value: "all",
                  label: "All Status",
                },
                {
                  value: "Working",
                  label: "Working",
                },
                {
                  value: "Available",
                  label: "Available",
                },
                {
                  value: "Offline",
                  label: "Offline",
                },
              ]}
            />

            {/* RESET */}

            <Button
              icon={<ReloadOutlined />}
              onClick={resetFilters}
            >
              Reset
            </Button>

          </Space>

        </div>

        {/* EMPLOYEE COUNT */}

        <div
          className={`mb-2 text-xs ${secondaryText}`}
        >
          Showing {filteredEmployees.length} of{" "}
          {employees.length} employees
        </div>

        {/* TABLE */}

        <div
          className={`w-full rounded-lg border ${borderColor} overflow-x-auto`}
        >
          <Table
            size="small"
            columns={columns}
            dataSource={filteredEmployees}
            pagination={{
              pageSize: 6,
            }}
            scroll={{
              x: 900,
            }}
          />
        </div>

        {/* ADD EMPLOYEE */}

        <AddEmployee
          open={addingEmployee}
          onCancel={handleCancelAdd}
          onAdd={handleAddEmployee}
          darkMode={darkMode}
        />

        {/* VIEW EMPLOYEE */}

        <ViewEmployee
          employee={viewingEmployee}
          open={!!viewingEmployee}
          onClose={handleCloseView}
          onEdit={handleOpenEdit}
          darkMode={darkMode}
        />

        {/* EDIT EMPLOYEE */}

        <EditEmployee
          employee={editingEmployee}
          open={!!editingEmployee}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
          onChange={handleEditChange}
          darkMode={darkMode}
        />

      </div>
    </ConfigProvider>
  );
}

export default Employees;

