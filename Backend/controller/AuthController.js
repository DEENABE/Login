const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserModel = require('../modules/User');
require('dotenv').config();
const  bcrypt = require('bcryptjs');

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
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({msg:'User Found',token:token});
      } 
      catch(err){
        res.status(400).json({error:"Unable to find user",details:err.message});
      }
}

module.exports = { signup, signin };
