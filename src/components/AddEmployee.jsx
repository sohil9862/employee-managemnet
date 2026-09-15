import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
} from "antd";

const { Option } = Select;

function AddEmployee({ open, onCancel, onAdd, darkMode }) {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const newEmployee = {
        ...values,
        joinedDate: values.joinedDate
          ? values.joinedDate.format("YYYY-MM-DD")
          : "",
        skills,
        active: values.status !== "Offline",
      };

      onAdd(newEmployee);

      form.resetFields();
      setSkills([]);
    } catch (error) {
      // Validation errors are handled by Ant Design Form
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSkills([]);
    onCancel();
  };

  return (
    <Modal
      title="Add employee"
      open={open}
      onCancel={handleCancel}
      width="min(650px, calc(100vw - 24px))"
      centered
      destroyOnHidden
      footer={[
        <Button
          key="cancel"
          size="small"
          onClick={handleCancel}
        >
          Cancel
        </Button>,

        <Button
          key="add"
          size="small"
          type="primary"
          onClick={handleSubmit}
        >
          Add employee
        </Button>,
      ]}
      styles={{
        content: {
          backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
        },

        header: {
          backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
        },

        body: {
          backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
          maxHeight: "calc(100vh - 180px)",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "4px",
        },

        footer: {
          backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        size="small"
        className="mt-2"
        style={{
          "--ant-form-item-margin-bottom": "8px",
        }}
      >
        {/* EMPLOYEE NAME */}
        <Form.Item
          label="Employee name"
          name="name"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Please enter employee name",
            },
          ]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>

        {/* DEPARTMENT + ROLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item
            label="Department"
            name="department"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please select department",
              },
            ]}
          >
            <Select placeholder="Select department">
              <Option value="IT">IT</Option>
              <Option value="Design">Design</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Operations">Operations</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please enter employee role",
              },
            ]}
          >
            <Input placeholder="e.g. Software Developer" />
          </Form.Item>
        </div>

        {/* SALARY + JOINED DATE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item
            label="Salary"
            name="salary"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please enter salary",
              },
            ]}
          >
            <Input placeholder="e.g. $3,500" />
          </Form.Item>

          <Form.Item
            label="Joined date"
            name="joinedDate"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please select joined date",
              },
            ]}
          >
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </div>

        {/* STATUS + PHONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item
            label="Status"
            name="status"
            initialValue="Available"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Select>
              <Option value="Working">Working</Option>
              <Option value="Available">Available</Option>
              <Option value="Offline">Offline</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </div>

        {/* EMAIL */}
        <Form.Item
          label="Email"
          name="email"
          style={{ marginBottom: 10 }}
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        {/* SKILLS */}
        <Form.Item
          label="Skills"
          style={{ marginBottom: 0 }}
        >
          <Select
            mode="tags"
            placeholder="Enter employee skills"
            value={skills}
            onChange={setSkills}
            tokenSeparators={[","]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddEmployee;