import { useState } from "react";

import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  Select,
  Switch,
  Tag,
} from "antd";

import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { z } from "zod";

// --------------------------------------------------
// ZOD VALIDATION SCHEMA
// --------------------------------------------------

const employeeSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Please enter a valid phone number"),
  department: z.string().trim().min(1, "Please select a department"),
  role: z.string().trim().min(2, "Role must be at least 2 characters"),
  salary: z.string().trim().min(1, "Salary is required"),
  joinedDate: z.string().min(1, "Joined date is required"),
  active: z.boolean(),
  skills: z.array(z.string()).optional(),
});

function EditEmployee({ employee, open, onCancel, onSave, onChange, darkMode }) {
  const [errors, setErrors] = useState({});

  if (!employee) {
    return null;
  }

  const textColor = darkMode ? "text-gray-100" : "text-gray-900";
  const secondaryText = darkMode ? "text-gray-400" : "text-gray-500";
  const mutedText = darkMode ? "text-gray-500" : "text-gray-400";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const cardBackground = darkMode ? "bg-gray-800" : "bg-gray-50";
  const iconBackground = darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200";

  const getStatusColor = (status) => {
    if (status === "Working") return "green";
    if (status === "Available") return "blue";
    return "default";
  };

  const clearError = (field) => {
    if (!errors[field]) return;
    setErrors((previous) => {
      const updatedErrors = { ...previous };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };

  const handleChange = (field, value) => {
    onChange(field, value);
    clearError(field);
  };

  const handleSave = () => {
    const result = employeeSchema.safeParse(employee);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSave();
  };

  const handleCancel = () => {
    setErrors({});
    onCancel();
  };

  return (
    <Modal
      title={
        <div className={`text-sm font-semibold ${textColor}`}>
          Edit employee
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={960}
      centered
      destroyOnHidden
      styles={{ body: { maxHeight: "92vh", overflowY: "auto" } }}
    >
      <div className="mt-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* ==================================================
              LEFT - EDIT FORM
          ================================================== */}
          <div>
            {/* PROFILE + NAME on one row */}
            <div className="flex items-center gap-3 mb-2">
              <Avatar size={36} className="bg-yellow-100 text-yellow-700 font-semibold flex-shrink-0">
                {employee.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </Avatar>
              <Button size="small">Replace photo</Button>
            </div>

            {/* NAME */}
            <div className="mb-2">
              <label className={`block text-xs font-medium mb-1 ${textColor}`}>Full name</label>
              <Input
                size="small"
                status={errors.name ? "error" : ""}
                value={employee.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <div className="mt-0.5 text-xs text-red-500">{errors.name}</div>}
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <div>
                <label className={`block text-xs font-medium mb-1 ${textColor}`}>Work email</label>
                <Input
                  size="small"
                  status={errors.email ? "error" : ""}
                  prefix={<MailOutlined />}
                  value={employee.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && <div className="mt-0.5 text-xs text-red-500">{errors.email}</div>}
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${textColor}`}>Phone</label>
                <Input
                  size="small"
                  status={errors.phone ? "error" : ""}
                  prefix={<PhoneOutlined />}
                  value={employee.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {errors.phone && <div className="mt-0.5 text-xs text-red-500">{errors.phone}</div>}
              </div>
            </div>

            {/* DEPARTMENT + ROLE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <div>
                <label className={`block text-xs font-medium mb-1 ${textColor}`}>Department</label>
                <Select
                  size="small"
                  status={errors.department ? "error" : ""}
                  className="w-full"
                  value={employee.department}
                  onChange={(value) => handleChange("department", value)}
                  options={[
                    { value: "IT", label: "IT" },
                    { value: "Design", label: "Design" },
                    { value: "HR", label: "HR" },
                    { value: "Finance", label: "Finance" },
                    { value: "Marketing", label: "Marketing" },
                    { value: "Sales", label: "Sales" },
                    { value: "Operations", label: "Operations" },
                  ]}
                />
                {errors.department && <div className="mt-0.5 text-xs text-red-500">{errors.department}</div>}
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${textColor}`}>Role</label>
                <Input
                  size="small"
                  status={errors.role ? "error" : ""}
                  value={employee.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
                {errors.role && <div className="mt-0.5 text-xs text-red-500">{errors.role}</div>}
              </div>
            </div>

            {/* SALARY + JOINED DATE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <div>
                <label className={`block text-xs font-medium mb-1 ${textColor}`}>Base salary</label>
                <Input
                  size="small"
                  status={errors.salary ? "error" : ""}
                  prefix={<DollarOutlined />}
                  value={employee.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                />
                {errors.salary && <div className="mt-0.5 text-xs text-red-500">{errors.salary}</div>}
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${textColor}`}>Joined date</label>
                <Input
                  size="small"
                  status={errors.joinedDate ? "error" : ""}
                  type="date"
                  prefix={<CalendarOutlined />}
                  value={employee.joinedDate}
                  onChange={(e) => handleChange("joinedDate", e.target.value)}
                />
                {errors.joinedDate && <div className="mt-0.5 text-xs text-red-500">{errors.joinedDate}</div>}
              </div>
            </div>

            {/* ACTIVE EMPLOYEE */}
            <div className="flex items-center justify-between mb-2 py-1">
              <div className={`text-sm font-medium ${textColor}`}>Active employee</div>
              <Switch
                size="small"
                checked={employee.active}
                onChange={(checked) => handleChange("active", checked)}
              />
            </div>

            {/* SKILLS */}
            <div>
              <label className={`block text-xs font-medium mb-1 ${textColor}`}>Skills</label>
              <Select
                size="small"
                mode="tags"
                className="w-full"
                placeholder="Add skills"
                value={employee.skills}
                onChange={(value) => handleChange("skills", value)}
                options={[
                  { value: "React", label: "React" },
                  { value: "JavaScript", label: "JavaScript" },
                  { value: "Node.js", label: "Node.js" },
                  { value: "Tailwind", label: "Tailwind" },
                  { value: "Figma", label: "Figma" },
                  { value: "UI Design", label: "UI Design" },
                  { value: "PostgreSQL", label: "PostgreSQL" },
                ]}
              />
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-solid border-opacity-50 ${borderColor}">
          <Button size="small" onClick={handleCancel}>Cancel</Button>
          <Button size="small" type="primary" onClick={handleSave}>Save changes</Button>
        </div>
      </div>
    </Modal>
  );
}


export default EditEmployee;