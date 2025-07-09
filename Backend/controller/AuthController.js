const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../modules/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
const signup = async (req, res) => {
  const { name, email, password, number } = req.body;
  if (!name || !email || !password || !number) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const handlepassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel.create({
      name,
      email,
      password: handlepassword,
      number,
    });
    await newUser.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", success: false, details: err.message });
  }
  //Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  response.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    SameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    exprie: new Date(Date.now() + 3600000), // 1 hour
  });
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (email || password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", success: false });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      SameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      exprie: new Date(Date.now() + 3600000), // 1 hour
    });
    return res.json({ message: "Signin successful", success: true, token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const logout = (req, res) => {
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      SameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.json({ message: "Logout successful", success: true });
  }
  catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
}

module.exports = { signup, signin,logout };
