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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Application Submitted", formData);
      setFormData({ email: "", password: "" });
      navigate("/Home");
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/signin",
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
    }
  };
  return (
    <div className="border border-black font-bold shadow-lg mt-10 w-100  h-100 p-6 rounded-2xl flex flex-col justify-center items-center ml-100 bg-black-100">
      <h1 className="font-opensans">Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Email</strong>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handlechange}
            placeholder="Enter Your Email"
            autoComplete="off"
            className="border border-black rounded-1xl flex"
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
        <label>
          <strong>Password</strong>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handlechange}
            autoComplete="off"
            className="border border-black rounded-1xl flex"
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
        <div>
          {/* <a href="/signup">Don't have an account?</a> */}
          <Link to="/signup">Don't have an account?</Link>
        </div>
        <div>
          <Link to="/fotgotpassword"></Link>
            <span className="text-blue-500">Forgot Password?</span>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-800 border border-black rounded-2xl w-40 p-3 mt-4"
          >
            Register
          </button>
        </div>
      
      </form>
    </div>
  );
};

export default Signin;
