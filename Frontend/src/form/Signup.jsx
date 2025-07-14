import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signupimage from "/images/signupimage.jpg"; // Ensure path is correct

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
}
    const validate = () => {
      const errors = {};
      if (!formData.name) errors.name = "Name is required";
      if (!formData.number) errors.number = "Phone number is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.password) errors.password = "Password is required";
      return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) {
        alert("Please fill all fields correctly");
        return;
      }
      try {
        const response = await axios.post(
          "https://login-uo0t.onrender.com/auth/signup",
          formData
        );
        console.log("Signup successful:", response.data);
        navigate("/signin");
      } catch (error) {
        console.log("Intenal Server Error:", error);

        return alert("Signup failed: " + error.response.data.message);
      }
    };

  return (
    <div className="flex min-h-screen">
      {/* Left Half: Full Image with Overlay */}
      <div className="relative w-1/2 hidden md:block">
        <img
          src={signupimage}
          alt="signup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center px-6 text-white text-center">
          <h1 className="text-4xl font-semibold leading-snug">
            A journey of a thousand miles begins <br /> with a single step
          </h1>
        </div>
      </div>
      <form></form>
      {/* Right Half: Centered Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Sign Up
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 text-purple-600" />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-purple-600 underline">
                  Terms of Use
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-700">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign in →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
