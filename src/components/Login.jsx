import { useState } from "react";
import { z } from "zod";
import {
  Input,
  Button,
  Alert,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";

// --------------------------------------------------
// LOGIN VALIDATION SCHEMA
// --------------------------------------------------

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters"),
});


// --------------------------------------------------
// LOGIN COMPONENT
// --------------------------------------------------

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginError, setLoginError] = useState("");


  // --------------------------------------------------
  // HANDLE INPUT CHANGE
  // --------------------------------------------------

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Remove field error when user starts typing
    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setLoginError("");
  };


  // --------------------------------------------------
  // HANDLE LOGIN
  // --------------------------------------------------

  const handleLogin = () => {
    setErrors({});
    setLoginError("");

    // First validate the form using Zod
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);

      return;
    }


    // --------------------------------------------------
    // CHECK ADMIN CREDENTIALS
    // --------------------------------------------------

    if (
      formData.email !== "admin@example.com" ||
      formData.password !== "12345"
    ) {
      setLoginError("Invalid email or password.");
      return;
    }


    // --------------------------------------------------
    // LOGIN SUCCESSFUL
    // --------------------------------------------------

    setIsLoggedIn(true);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      {/* LOGIN CARD */}

      <div className="w-full max-w-md">

        {/* LOGO */}

        <div className="flex flex-col items-center mb-5">

          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
            T
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            TalentDesk
          </h1>

          <p className="text-gray-500 mt-1">
            Log in to your admin account
          </p>

        </div>


        {/* CARD */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Welcome back
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Enter your credentials to continue.
            </p>

          </div>


          {/* LOGIN ERROR */}

          {loginError && (
            <Alert
              message={loginError}
              type="error"
              showIcon
              className="mb-5"
            />
          )}


          {/* EMAIL */}

          <div className="mb-5">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              status={errors.email ? "error" : ""}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}

          </div>


          {/* PASSWORD */}

          <div className="mb-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              status={errors.password ? "error" : ""}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}

          </div>


          {/* LOGIN BUTTON */}

          <Button
            type="primary"
            size="large"
            block
            icon={<LoginOutlined />}
            onClick={handleLogin}
          >
            Log In
          </Button>

        </div>

      </div>

    </div>
  );
}

export default Login;
