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

    // Validate form using Zod
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
      formData.email !== "sohilmaharjan00@gmail.com" ||
      formData.password !== "12345"
    ) {
      setLoginError("Invalid email or password.");
      return;
    }


    // --------------------------------------------------
    // LOGIN SUCCESSFUL
    // --------------------------------------------------

    // Save login status in localStorage
    // so the user remains logged in after refresh.
    localStorage.setItem("isLoggedIn", "true");

    // Update React login state
    setIsLoggedIn(true);
  };


  // --------------------------------------------------
  // LOGIN UI
  // --------------------------------------------------

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 relative">

      {/* Decorative background blobs */}

      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />


      {/* LOGIN CARD */}

      <div className="w-full max-w-md relative animate-[fadeIn_0.4s_ease-out]">


        {/* LOGO */}

        <div className="flex flex-col items-center mb-5">

          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-lg shadow-blue-600/30">
            T
          </div>

          <h1 className="text-xl font-bold text-gray-900 mt-3 tracking-tight">
            TalentDesk
          </h1>

          <p className="text-gray-500 mt-1 text-xs">
            Log in to your admin account
          </p>

        </div>


        {/* CARD */}

        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 p-5 md:p-7">

          <div className="mb-5">

            <h2 className="text-base font-semibold text-gray-900">
              Welcome back
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Enter your credentials to continue.
            </p>

          </div>


          {/* LOGIN ERROR */}

          {loginError && (
            <Alert
              message={loginError}
              type="error"
              showIcon
              className="mb-4 rounded-lg text-xs"
            />
          )}


          {/* EMAIL */}

          <div className="mb-4">

            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Email
            </label>

            <Input
              size="middle"
              prefix={
                <MailOutlined className="text-gray-400" />
              }
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              onPressEnter={handleLogin}
              status={errors.email ? "error" : ""}
              className="rounded-lg text-sm"
            />

            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.email}
              </p>
            )}

          </div>


          {/* PASSWORD */}

          <div className="mb-2">

            <div className="flex items-center justify-between mb-1.5">

              <label className="block text-xs font-medium text-gray-700">
                Password
              </label>

              <a className="text-[11px] font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                Forgot password?
              </a>

            </div>

            <Input.Password
              size="middle"
              prefix={
                <LockOutlined className="text-gray-400" />
              }
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              onPressEnter={handleLogin}
              status={errors.password ? "error" : ""}
              className="rounded-lg text-sm"
            />

            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.password}
              </p>
            )}

          </div>


          {/* LOGIN BUTTON */}

          <Button
            type="primary"
            size="middle"
            block
            icon={<LoginOutlined />}
            onClick={handleLogin}
            className="mt-5 rounded-lg h-9 font-medium text-sm shadow-md shadow-blue-600/20"
          >
            Log In
          </Button>

        </div>

      </div>

    </div>
  );
}

export default Login;
