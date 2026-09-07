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
  Divider,
  Tooltip,
  Modal,
  Switch,
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
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons";

function Employees({ darkMode }) {
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
  // EMPLOYEES
  // --------------------------------------------------

  const [employees, setEmployees] = useState([
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
  ]);

  // --------------------------------------------------
  // DARK MODE CLASSES
  // --------------------------------------------------

  const textColor = darkMode
    ? "text-gray-100"
    : "text-gray-900";

  const secondaryText = darkMode
    ? "text-gray-400"
    : "text-gray-500";

  const mutedText = darkMode
    ? "text-gray-500"
    : "text-gray-400";

  const borderColor = darkMode
    ? "border-gray-700"
    : "border-gray-200";

  const cardBackground = darkMode
    ? "bg-gray-800"
    : "bg-gray-50";

  const iconBackground = darkMode
    ? "bg-gray-700 border-gray-600"
    : "bg-white border-gray-200";

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
    setViewingEmployee(null);

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

    setEmployees((previousEmployees) =>
      previousEmployees.map((employee) =>
        employee.key === editingEmployee.key
          ? editingEmployee
          : employee
      )
    );

    setEditingEmployee(null);
  };

  // --------------------------------------------------
  // VIEW FUNCTIONS
  // --------------------------------------------------

  const handleOpenView = (employee) => {
    setEditingEmployee(null);

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
    setEmployees((previousEmployees) =>
      previousEmployees.filter(
        (item) => item.key !== employee.key
      )
    );

    if (
      viewingEmployee &&
      viewingEmployee.key === employee.key
    ) {
      handleCloseView();
    }

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
  // EDIT EMPLOYEE MODAL
  // --------------------------------------------------

  const editModal = (
    <Modal
      title={
        <div>
          <div className={`text-lg font-semibold ${textColor}`}>
            Edit employee
          </div>

          <div className={`text-xs font-normal ${secondaryText}`}>
            Update employee information
          </div>
        </div>
      }
      open={!!editingEmployee}
      onCancel={handleCancelEdit}
      footer={null}
      width={950}
      centered
      destroyOnHidden
    >
      {editingEmployee && (
        <div className="mt-5">

          {/* TWO COLUMN LAYOUT */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT - EDIT FORM */}

            <div>

              {/* PERSONAL */}

              <div
                className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-3`}
              >
                Personal
              </div>

              <div className="flex items-center gap-4 mb-5">

                <Avatar
                  size={58}
                  className="bg-yellow-100 text-yellow-700 font-semibold"
                >
                  {editingEmployee.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </Avatar>

                <div>

                  <Button size="small">
                    Replace photo
                  </Button>

                  <div
                    className={`text-[11px] ${mutedText} mt-1`}
                  >
                    JPG or PNG, square, max 2 MB
                  </div>

                </div>

              </div>

              {/* NAME */}

              <div className="mb-4">

                <label
                  className={`block text-xs font-medium mb-1 ${textColor}`}
                >
                  Full name
                </label>

                <Input
                  value={editingEmployee.name}
                  onChange={(e) =>
                    handleEditChange(
                      "name",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* EMAIL + PHONE */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>

                  <label
                    className={`block text-xs font-medium mb-1 ${textColor}`}
                  >
                    Work email
                  </label>

                  <Input
                    prefix={<MailOutlined />}
                    value={editingEmployee.email}
                    onChange={(e) =>
                      handleEditChange(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label
                    className={`block text-xs font-medium mb-1 ${textColor}`}
                  >
                    Phone
                  </label>

                  <Input
                    prefix={<PhoneOutlined />}
                    value={editingEmployee.phone}
                    onChange={(e) =>
                      handleEditChange(
                        "phone",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <Divider />

              {/* EMPLOYMENT */}

              <div
                className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-3`}
              >
                Employment
              </div>

              {/* DEPARTMENT + ROLE */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

                <div>

                  <label
                    className={`block text-xs font-medium mb-1 ${textColor}`}
                  >
                    Department
                  </label>

                  <Select
                    className="w-full"
                    value={editingEmployee.department}
                    onChange={(value) =>
                      handleEditChange(
                        "department",
                        value
                      )
                    }
                    options={[
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

                </div>

                <div>

                  <label
                    className={`block text-xs font-medium mb-1 ${textColor}`}
                  >
                    Role
                  </label>

                  <Input
                    value={editingEmployee.role}
                    onChange={(e) =>
                      handleEditChange(
                        "role",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* SALARY + JOINED */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>

                  <label
                    className={`block text-xs font-medium mb-1 ${textColor}`}
                  >
                    Base salary
                  </label>

                  <Input
                    prefix={<DollarOutlined />}
                    value={editingEmployee.salary}
                    onChange={(e) =>
                      handleEditChange(
                        "salary",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label
                    className={`block text-xs font-medium mb-1 ${textColor}`}
                  >
                    Joined date
                  </label>

                  <Input
                    type="date"
                    prefix={<CalendarOutlined />}
                    value={editingEmployee.joinedDate}
                    onChange={(e) =>
                      handleEditChange(
                        "joinedDate",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              <Divider />

              {/* ACTIVE EMPLOYEE */}

              <div className="flex items-center justify-between">

                <div>

                  <div
                    className={`text-sm font-medium ${textColor}`}
                  >
                    Active employee
                  </div>

                  <div
                    className={`text-xs ${mutedText}`}
                  >
                    Inactive people keep their records
                    but have limited access
                  </div>

                </div>

                <Switch
                  checked={editingEmployee.active}
                  onChange={(checked) =>
                    handleEditChange(
                      "active",
                      checked
                    )
                  }
                />

              </div>

              <Divider />

              {/* SKILLS */}

              <div>

                <div
                  className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-2`}
                >
                  Skills
                </div>

                <Select
                  mode="tags"
                  className="w-full"
                  placeholder="Add skills"
                  value={editingEmployee.skills}
                  onChange={(value) =>
                    handleEditChange(
                      "skills",
                      value
                    )
                  }
                  options={[
                    {
                      value: "React",
                      label: "React",
                    },
                    {
                      value: "JavaScript",
                      label: "JavaScript",
                    },
                    {
                      value: "Node.js",
                      label: "Node.js",
                    },
                    {
                      value: "Tailwind",
                      label: "Tailwind",
                    },
                    {
                      value: "Figma",
                      label: "Figma",
                    },
                    {
                      value: "UI Design",
                      label: "UI Design",
                    },
                    {
                      value: "PostgreSQL",
                      label: "PostgreSQL",
                    },
                  ]}
                />

              </div>

            </div>

            {/* RIGHT - LIVE PREVIEW */}

            <div>

              <div
                className={`rounded-xl border ${borderColor} ${cardBackground} p-5`}
              >

                {/* HEADER */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <Avatar
                      size={56}
                      className="bg-yellow-100 text-yellow-700 font-semibold"
                    >
                      {editingEmployee.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </Avatar>

                    <div>

                      <div
                        className={`font-semibold text-lg ${textColor}`}
                      >
                        {editingEmployee.name}
                      </div>

                      <div
                        className={`text-xs ${secondaryText}`}
                      >
                        {editingEmployee.role}
                        {" · "}
                        {editingEmployee.department}
                      </div>

                      <div
                        className={`text-xs ${mutedText} mt-1`}
                      >
                        {editingEmployee.email}
                      </div>

                    </div>

                  </div>

                  <Tag
                    color={getStatusColor(
                      editingEmployee.status
                    )}
                  >
                    {editingEmployee.status}
                  </Tag>

                </div>

                <Divider />

                {/* PREVIEW DETAILS */}

                <div className="space-y-4">

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-9 h-9 rounded-lg border ${iconBackground} flex items-center justify-center`}
                    >
                      <TeamOutlined />
                    </div>

                    <div>

                      <div
                        className={`text-xs ${mutedText}`}
                      >
                        Department
                      </div>

                      <div
                        className={`text-sm font-medium ${textColor}`}
                      >
                        {editingEmployee.department}
                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-9 h-9 rounded-lg border ${iconBackground} flex items-center justify-center`}
                    >
                      <DollarOutlined />
                    </div>

                    <div>

                      <div
                        className={`text-xs ${mutedText}`}
                      >
                        Salary
                      </div>

                      <div
                        className={`text-sm font-medium ${textColor}`}
                      >
                        {editingEmployee.salary}
                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-9 h-9 rounded-lg border ${iconBackground} flex items-center justify-center`}
                    >
                      <CalendarOutlined />
                    </div>

                    <div>

                      <div
                        className={`text-xs ${mutedText}`}
                      >
                        Joined
                      </div>

                      <div
                        className={`text-sm font-medium ${textColor}`}
                      >
                        {editingEmployee.joinedDate}
                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-9 h-9 rounded-lg border ${iconBackground} flex items-center justify-center`}
                    >
                      <PhoneOutlined />
                    </div>

                    <div>

                      <div
                        className={`text-xs ${mutedText}`}
                      >
                        Phone
                      </div>

                      <div
                        className={`text-sm font-medium ${textColor}`}
                      >
                        {editingEmployee.phone}
                      </div>

                    </div>

                  </div>

                </div>

                <Divider />

                {/* SKILLS */}

                <div>

                  <div
                    className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-3`}
                  >
                    Skills
                  </div>

                  <div className="flex flex-wrap gap-2">

                    {editingEmployee.skills?.length > 0 ? (
                      editingEmployee.skills.map(
                        (skill, index) => (
                          <Tag key={index}>
                            {skill}
                          </Tag>
                        )
                      )
                    ) : (
                      <span
                        className={`text-xs ${mutedText}`}
                      >
                        No skills added
                      </span>
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* MODAL FOOTER */}

          <Divider />

          <div className="flex justify-end gap-2">

            <Button
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              onClick={handleSaveEdit}
            >
              Save changes
            </Button>

          </div>

        </div>
      )}
    </Modal>
  );

  // --------------------------------------------------
  // VIEW EMPLOYEE MODAL
  // --------------------------------------------------

  const viewModal = (
    <Modal
      title={
        <div>
          <div
            className={`text-lg font-semibold ${textColor}`}
          >
            Employee profile
          </div>

          <div
            className={`text-xs font-normal ${secondaryText}`}
          >
            Employee information and details
          </div>
        </div>
      }
      open={!!viewingEmployee}
      onCancel={handleCloseView}
      footer={null}
      width={750}
      centered
      destroyOnHidden
    >
      {viewingEmployee && (
        <div className="mt-4">

          {/* PROFILE HEADER */}

          <div
            className={`rounded-xl border ${borderColor} ${cardBackground} p-5`}
          >

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <Avatar
                  size={70}
                  className="bg-yellow-100 text-yellow-700 font-semibold text-lg"
                >
                  {viewingEmployee.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </Avatar>

                <div>

                  <div
                    className={`text-xl font-semibold ${textColor}`}
                  >
                    {viewingEmployee.name}
                  </div>

                  <div
                    className={`text-sm ${secondaryText}`}
                  >
                    {viewingEmployee.role}
                    {" · "}
                    {viewingEmployee.department}
                  </div>

                  <div
                    className={`text-xs ${mutedText} mt-1`}
                  >
                    {viewingEmployee.email}
                  </div>

                </div>

              </div>

              <Tag
                color={getStatusColor(
                  viewingEmployee.status
                )}
              >
                {viewingEmployee.status}
              </Tag>

            </div>

          </div>

          {/* DETAILS */}

          <div className="mt-5">

            <div
              className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-3`}
            >
              Employee information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div
                className={`border ${borderColor} rounded-lg p-4`}
              >
                <div
                  className={`text-xs ${mutedText} mb-1`}
                >
                  Department
                </div>

                <div
                  className={`font-medium ${textColor}`}
                >
                  {viewingEmployee.department}
                </div>
              </div>

              <div
                className={`border ${borderColor} rounded-lg p-4`}
              >
                <div
                  className={`text-xs ${mutedText} mb-1`}
                >
                  Role
                </div>

                <div
                  className={`font-medium ${textColor}`}
                >
                  {viewingEmployee.role}
                </div>
              </div>

              <div
                className={`border ${borderColor} rounded-lg p-4`}
              >
                <div
                  className={`text-xs ${mutedText} mb-1`}
                >
                  Salary
                </div>

                <div
                  className={`font-medium ${textColor}`}
                >
                  {viewingEmployee.salary}
                </div>
              </div>

              <div
                className={`border ${borderColor} rounded-lg p-4`}
              >
                <div
                  className={`text-xs ${mutedText} mb-1`}
                >
                  Joined date
                </div>

                <div
                  className={`font-medium ${textColor}`}
                >
                  {viewingEmployee.joinedDate}
                </div>
              </div>

              <div
                className={`border ${borderColor} rounded-lg p-4`}
              >
                <div
                  className={`text-xs ${mutedText} mb-1`}
                >
                  Email
                </div>

                <div
                  className={`font-medium ${textColor} break-all`}
                >
                  {viewingEmployee.email}
                </div>
              </div>

              <div
                className={`border ${borderColor} rounded-lg p-4`}
              >
                <div
                  className={`text-xs ${mutedText} mb-1`}
                >
                  Phone
                </div>

                <div
                  className={`font-medium ${textColor}`}
                >
                  {viewingEmployee.phone}
                </div>
              </div>

            </div>

          </div>

          {/* SKILLS */}

          <div className="mt-5">

            <div
              className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-3`}
            >
              Skills
            </div>

            <div className="flex flex-wrap gap-2">

              {viewingEmployee.skills?.map(
                (skill, index) => (
                  <Tag key={index}>
                    {skill}
                  </Tag>
                )
              )}

            </div>

          </div>

          <Divider />

          {/* FOOTER */}

          <div className="flex justify-end gap-2">

            <Button
              onClick={handleCloseView}
            >
              Close
            </Button>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() =>
                handleOpenEdit(viewingEmployee)
              }
            >
              Edit employee
            </Button>

          </div>

        </div>
      )}
    </Modal>
  );

  // --------------------------------------------------
  // TABLE COLUMNS
  // --------------------------------------------------

  const columns = [
    {
      title: "Name",
      key: "name",

      render: (_, employee) => (
        <div className="flex items-center gap-3">

          <Avatar
            className={
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }
            icon={<UserOutlined />}
          />

          <span
            className={`font-medium ${textColor}`}
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

    // ACTIONS

    {
      title: "Action",
      key: "action",

      render: (_, employee) => (
        <div className="flex items-center gap-1">

          {/* VIEW */}

          <Tooltip title="View Employee">

            <Button
              type="text"
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
      }}
    >
      <div
        className={`w-full min-h-full ${textColor}`}
      >

        {/* PAGE HEADER */}

        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Employee
          </h3>

            <p className="mt-1 text-gray-500 dark:white">
              Manage your employees and their information.
            </p>
          </div>

          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size="large"
            className="w-full sm:w-auto"
          >
            Add Employee
          </Button>

        </div>

        {/* SEARCH AND FILTERS */}

        <div className="mb-5 w-full">

          <Space
            wrap
            size="middle"
            className="w-full"
          >

            {/* SEARCH */}

            <Input
              size="large"
              placeholder="Search by name, department or role..."
              prefix={
                <SearchOutlined
                  style={{
                    color: darkMode
                      ? "#9ca3af"
                      : "#9ca3af",
                  }}
                />
              }
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              allowClear
              className="w-full sm:w-80"
            />

            {/* DEPARTMENT */}

            <Select
              size="large"
              value={departmentFilter}
              onChange={setDepartmentFilter}
              className="w-full sm:w-44"
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
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-40"
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
              size="large"
              icon={<ReloadOutlined />}
              onClick={resetFilters}
            >
              Reset
            </Button>

          </Space>

        </div>

        {/* EMPLOYEE COUNT */}

        <div
          className={`mb-3 text-sm ${secondaryText}`}
        >
          Showing {filteredEmployees.length} of{" "}
          {employees.length} employees
        </div>

        {/* TABLE */}

        <div
          className={`w-full rounded-lg border ${borderColor} overflow-hidden`}
        >

          <Table
            columns={columns}
            dataSource={filteredEmployees}
            pagination={{
              pageSize: 5,
            }}
            scroll={{
              x: 900,
            }}
          />

        </div>

        {/* MODALS */}

        {viewModal}

        {editModal}

      </div>
    </ConfigProvider>
  );
}

export default Employees;