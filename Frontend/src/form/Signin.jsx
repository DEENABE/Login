import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
   const [step, setStep] = useState(1); // 1 = login form, 2 = OTP form
  const [userId, setUserId] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate(); 

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate = () => {
    let error = {};
    if (!formData.email) error.email = "Email is required";
    if (!formData.password) error.password = "Password is required";
    setErrors(error);
    return Object.keys(error).length == 0;
  };
  setUserId(response.data.userId);
      setStep(2); // move to OTP step
      setServerMsg(response.data.msg || "OTP Sent");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Application Submitted", formData);
      setFormData({ email: "", password: "" });
      navigate("/");
      try {
        const response = await axios.post(
          "https://login-uo0t.onrender.com/auth/signin",
          formData
        );
        console.log("Response from Backend", response.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            console.log("User Not Found", err.response.status)    
            navigate("/signup");
          } else if (err.response.status === 401) {
            console.log("Invalid Password", err.response.status);
            setErrors({ password: "Invalid Password" });
            navigate("/ForgotPassword");
            
          } else if (err.response.status === 200) {
            console.log("user Not Found", err.response.status);
          } else if (err.response.status === 400) {
            console.log("Unable to find user", err.response.status);
          }
        } else {
          console.log("Server Error", err.message);
        }
        
      }
      const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "https://login-uo0t.onrender.com/auth/verifyotp",
            { userId, otp: formData.otp }
          );
          console.log("OTP Verified", response.data);
          setServerMsg(response.data.msg || "OTP Verified Successfully");
          navigate("/"); // Redirect to dashboard or home page
        } catch (err) {
          console.error("OTP Verification Failed", err.response.data);
          setServerMsg(err.response.data.error || "OTP Verification Failed");
        }
    }
  };
}
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
