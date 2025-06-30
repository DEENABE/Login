import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteUser from "../../Components/DeleteUser";



const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate = () => {
    let error = {};
    if (!formData.name) error.name = "Name is required";
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
        "https:/login-uo0t.onrender.com/auth/signup",
        formData
      );
      console.log("✅ Backend Response:", response.data);
      setFormData({ name: "", email: "", password: "" });
      navigate("/signin");
      alert("Registration successful! Please log in."); 
    } catch (err) {
      console.error(
        "❌ Server Response Error:",
        // err.response ? err.response.data : err.message
      );
    }
  };



  return (
    <div className="border border-black font-bold shadow-lg mt-10 w-100  h-100 p-6 rounded-2xl flex flex-col justify-center items-center ml-100 bg-black-100">
      <h1 className="font-bold text-[30px] items-center mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Name</strong>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            autoComplete="off"
            className="border border-gray-300 rounded-1xl flex"
            value={formData.name}
            onChange={handlechange}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </label>
        <label>
          <strong>Email</strong>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            autoComplete="off"
            className="border border-gray-300 rounded-1xl flex"
            value={formData.email}
            onChange={handlechange}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </label>
        <label>
          <strong>Password</strong>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            autoComplete="off"
            className="border border-gray-300 rounded-1xl flex"
            value={formData.password}
            onChange={handlechange}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-600 flex shadow-amber-100 rounded-2xl"
        >
          Register
        </button>
        <p>
          <a href="/forgotpassword">Forgot Password?</a>
        </p>
        <p>
          Already have an account?
          <Link
            to="/Signin"
            className="flex justify-center rounded-3xl bg-amber-500 w-70 font-bold"
          >
            Login
          </Link>
        </p>
       
      </form>
    </div>
  );
};

export default Signup;
