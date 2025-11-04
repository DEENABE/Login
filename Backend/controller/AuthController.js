const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const usermodel= require('../modules/User'); // Importing UserModel
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');


//singup function
const signup=async(req,res)=>{
  const {name,number,email,password}=req.body;
  if(!name||!number||!email||!password){
    return res.status(400).json({error:"All fields are required"});
  }
  try{
    const existinUser= await usermodel.findOne({email});
    if(existinUser){
      return res.status(400).json({error:"User already exists"});
    }
    const hashedPassword= await bcrypt.hash(password, 10);
    const newUser=new usermodel({
      name,
      number,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({success:true});
    //JWT token generation
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true });
    //verify email 
    const mailOptions={
      from:process.env.SMTP_HOST,
      to:newUser.email,
      subject:"Welcome to Our Service",
      text:`Hello ${newUser.name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nYour Team`
    }
    await transporter.sendMail(mailOptions);
    res.status(201).json({message:"User registered successfully", token});

  }
  catch(error){
    res.status(500).json({error:"Internal Server Error",success:false});
  }
}

module.exports = { signup };