const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../modules/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const transporter = require("../controller/NodeMailer");
const nodemailer = require("nodemailer");

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
    const newUser = await UserModel.create({
      name,
      email,
      password: handlepassword,
      number,
    });
    await newUser.save();
    //Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      expires: new Date(Date.now() + 3600000), // 1 hour
    });
    // Send welcome email
    const mailOptions ={
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Our Service",
      text: `Hello ${name},\n\nThank you for signing up! We're excited`,
    };
    await transporter.sendMail(mailOptions);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.log("Internal Server Error:", err);
    return res
      .status(500)
      .json({ message: "Server error", success: false, details: err.message });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
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
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      SameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.json({ message: "Logout successful", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const sendverfiyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (user.isAccoutVerified) {
      return res
        .status(400)
        .json({ message: "Account already verified", success: false });
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    user.verifyopt = otp;
    user.isoptexpired = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Account",
      text: `Your verification OTP is ${otp}. It is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const verfiymail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res
      .status(400)
      .json({ message: "User ID and OTP are required", success: false });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.verifyopt == "" || user.verifyopt !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    if (user.isoptexpired < Date.now()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }
    user.isAccoutVerified = true;
    user.verifyopt = "";
    user.isoptexpired = 0;
    await user.save();

    return res
      .status(200)
      .json({ message: "Account verified successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const resetOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    user.resetOtp = resetOtp;
    user.isoptexpired = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Your Password",
      text: `Your password reset OTP is ${resetOtp}. It is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const resetPassword = async (req, res) => {
  const { email, resetOtp, newpassword } = req.body;
  if (!email || !resetOtp || !newpassword) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (!user.resetOtp || user.resetOtp != resetOtp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    if (user.isoptexpired < Date.now()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.isoptexpired = 0;
    await user.save();
    return res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
module.exports = {
  signup,
  signin,
  logout,
  sendverfiyOtp,
  verfiymail,
  sendResetOtp,
  resetPassword,
};
