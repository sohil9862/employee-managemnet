import {
  Avatar,
  Button,
  Divider,
  Modal,
  Tag,
} from "antd";

import {
  EditOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

function ViewEmployee({
  employee,
  open,
  onClose,
  onEdit,
  darkMode,
}) {
  if (!employee) {
    return null;
  }

  const textColor = darkMode ? "text-gray-100" : "text-gray-900";
  const secondaryText = darkMode ? "text-gray-400" : "text-gray-500";
  const mutedText = darkMode ? "text-gray-500" : "text-gray-400";
  const borderColor = darkMode
    ? "border-gray-700"
    : "border-gray-200";
  const cardBackground = darkMode
    ? "bg-gray-800"
    : "bg-gray-50";

  const getStatusColor = (status) => {
    if (status === "Working") return "green";
    if (status === "Available") return "blue";
    return "default";
  };

  const infoItems = [
    {
      label: "Department",
      value: employee.department,
      icon: <TeamOutlined />,
    },
    {
      label: "Role",
      value: employee.role,
      icon: <TeamOutlined />,
    },
    {
      label: "Salary",
      value: employee.salary,
      icon: <DollarOutlined />,
    },
    {
      label: "Joined date",
      value: employee.joinedDate,
      icon: <CalendarOutlined />,
    },
    {
      label: "Email",
      value: employee.email,
      icon: <MailOutlined />,
      breakAll: true,
    },
    {
      label: "Phone",
      value: employee.phone,
      icon: <PhoneOutlined />,
    },
  ];

  return (
    <Modal
      title={
        <div>
          <div
            className={`text-base font-semibold ${textColor}`}
          >
            Employee profile
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width="min(720px, calc(100vw - 24px))"
      centered
      destroyOnHidden
      styles={{
        body: {
          maxHeight: "calc(100vh - 140px)",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "4px",
        },
      }}
    >
      <div className="mt-2">

        {/* PROFILE HEADER */}
        <div
          className={`rounded-xl border ${borderColor} ${cardBackground} p-3`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar
                size={52}
                className="flex-shrink-0 bg-yellow-100 text-yellow-700 font-semibold"
              >
                {employee.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Avatar>

              <div className="min-w-0">
                <div
                  className={`text-base font-semibold truncate ${textColor}`}
                >
                  {employee.name}
                </div>

                <div
                  className={`text-xs truncate ${secondaryText}`}
                >
                  {employee.role} · {employee.department}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Tag color={getStatusColor(employee.status)}>
                {employee.status}
              </Tag>
            </div>
          </div>
        </div>

        {/* EMPLOYEE INFORMATION */}
        <div className="mt-3">
          <div
            className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-2`}
          >
            Employee information
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className={`border ${borderColor} rounded-lg px-3 py-2 flex items-start gap-2 min-w-0`}
              >
                <span
                  className={`${mutedText} mt-0.5 text-sm flex-shrink-0`}
                >
                  {item.icon}
                </span>

                <div className="min-w-0">
                  <div
                    className={`text-[11px] ${mutedText}`}
                  >
                    {item.label}
                  </div>

                  <div
                    className={`text-sm font-medium ${textColor} ${
                      item.breakAll
                        ? "break-all"
                        : "break-words"
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-3">
          <div
            className={`text-xs font-semibold uppercase tracking-wider ${secondaryText} mb-2`}
          >
            Skills
          </div>

          <div className="flex flex-wrap gap-1.5">
            {employee.skills?.length > 0 ? (
              employee.skills.map((skill, index) => (
                <Tag key={index}>{skill}</Tag>
              ))
            ) : (
              <span className={`text-xs ${mutedText}`}>
                No skills added
              </span>
            )}
          </div>
        </div>

        <Divider className="my-3" />

        {/* FOOTER */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(employee)}
            className="w-full sm:w-auto"
          >
            Edit employee
          </Button>
        </div>

      </div>
    </Modal>
  );
}

export default ViewEmployee;