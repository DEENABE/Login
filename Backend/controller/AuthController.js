const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserModel = require('../modules/User');
const OtpVerification = require('../modules/OtpVerfication');
const { generateVerificationCode } = require('../utils/generateVerfication');
require('dotenv').config();
const  bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); 

const transporter=nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
const signup=async(req,res)=>{
    console.log("Received Data", req.body);
    if (!req.body.name || !req.body.number || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'All Fields are Requried' });
    }
    try{
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(req.body.password,salt);
      

      const newUser=await UserModel.create({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        password:hashedPassword
      });
      res.status(201).json({ msg: 'User added successfully', user: newUser });
    }
    catch(err){
        res.status(400).json({ error: 'Unable to add this user', details: err.message });
    }
    // try {

    //     const newUser = await UserModel.create(req.body);
    //     res.status(201).json({ msg: 'User added successfully', user: newUser });
    // } catch (err) {
    //     res.status(400).json({ error: 'Unable to add this user', details: err.message });
    // }
}
const signin=async(req,res)=>{
      // if(!req.body.email || !req.body.password){
      //   return res.status(404).json({error:'User Data Not Matched'});
      // }
      try{
        const user =await UserModel.findOne({email:req.body.email});
        if(!user){
          return res.status(404).json({error:'User Not Found'});
        }
        const isMatch=await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
          return res.status(401).json({error:'Invalid Password'});
        }
        //generate OTP
        const otp = generateVerificationCode();
        //save OTP to database
        await OtpVerification.create({
          userId: user._id,
          otp: otp,
          createdAt: new Date(),
          expiresAt: new Date(Date.now()+5*60*1000)// OTP
        });
        //send via OTP mail
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: user.email,
          subject: 'OTP for Login',
          text: `<h1>Your OTP is <h2>${otp}</h2>. It is valid for 5 minutes.</h1>`,
        });
        res.status(200).json({msg:'OTP sent to your email',userId:user._id});
      
   

        //Generate JWT token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({msg:'User Found',token:token});
      } 
      catch(err){
        res.status(400).json({error:"Unable to find user",details:err.message});
        res.status(500).json({error:"Server Error",details:err.message});
      }
}


module.exports = { signup, signin };
