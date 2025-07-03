import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: number.toString(),
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    number:number.toString(),
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate = () => {
    let error = {};
    if (!formData.name) error.name = "Name is required";
    if (!formData.number) error.number = "Number is required";
    if (!formData.email) error.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      error.email = "Invalid email format";
    if (!formData.password) error.password = "Password is required";
    setErrors(error);
    return Object.keys(error).length == 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("🚀 Sending Data to Backend:", formData);

    try {
      const response = await axios.post(
        "https://login-uo0t.onrender.com/auth/signup",
        formData
      );
      console.log("✅ Backend Response:", response.data);
      setFormData({ name: "", email: "", password: "", number: "" });
      navigate("/signin");
      alert("Registration successful! Please log in.");
    } catch (err) {
      console.log("❌ Error in Registration:", err);
      alert("Registration failed. Please try again."+(err.response?.data?.error||err.message));
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 ">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={handlechange}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
            <label className="block mb-1 font-semibold">Number</label>
            <input
              type="number"
              name="number"
              placeholder="Enter Your Number"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.number}
              onChange={handlechange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.email}
              onChange={handlechange}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={handlechange}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Register
            </button>
          </div>
          <div className="text-sm flex justify-between">
            <Link
              to="/forgotpassword"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            <span>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-amber-600 font-bold hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
