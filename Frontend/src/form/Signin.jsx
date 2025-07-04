import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1 = login form, 2 = OTP form
  const [userId, setUserId] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const error = {};
    if (!formData.email) error.email = "Email is required";
    if (!formData.password) error.password = "Password is required";
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "https://login-uo0t.onrender.com/auth/signin",
        { email: formData.email, password: formData.password }
      );

      setUserId(response.data.userId);
      setStep(2); // move to OTP step
      setServerMsg(response.data.msg || "OTP Sent");
    } catch (err) {
      if (err.res?.status === 404) {
        setServerMsg("User not found");
        navigate("/signup");
      } else if (err.response?.status === 401) {
        setErrors({ password: "Invalid Password" });
        setServerMsg("Invalid credentials");
        navigate("");
      } else {
        setServerMsg("Server Error: " + err.message);
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.otp) return setErrors({ otp: "OTP is required" });

    try {
      const response = await axios.post(
        "https://login-uo0t.onrender.com/auth/verify-otp",
        { userId, otp: formData.otp }
      );
      const { token } = response.data;

      setServerMsg("✅ OTP Verified, Login Successful!");
      localStorage.setItem("token", token); // Store token if needed
      navigate("/dashboard"); // or redirect to home
    } catch (err) {
      setServerMsg(err.res?.data?.error || "OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 font-opensans">
          {step === 1 ? "Login" : "Enter OTP"}
        </h1>

        <form onSubmit={step === 1 ? handleLoginSubmit : handleOtpSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handlechange}
                  placeholder="Enter Your Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handlechange}
                  placeholder="Enter Your Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
            </>
          ) : (
            <div>
              <label className="block mb-1 font-semibold">OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handlechange}
                placeholder="Enter OTP sent to email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {errors.otp && <span className="text-red-500 text-sm">{errors.otp}</span>}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              {step === 1 ? "Login" : "Verify OTP"}
            </button>
          </div>

          {serverMsg && <p className="text-sm text-center text-blue-600">{serverMsg}</p>}

          {step === 1 && (
            <div className="flex justify-between text-sm">
              <Link to="/signup" className="text-blue-500 hover:underline">
                Don't have an account?
              </Link>
              <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
