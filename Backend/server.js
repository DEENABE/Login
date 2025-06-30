// console.log('Server is running on port 3000');
const express = require('express');
const connectDB = require('./database/db');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter=require('./routes/authRouter');


connectDB();

const app = express();
app.use(bodyParser.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://login-chi-sand.vercel.app'  //  Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
 // To parse JSON bodies

// signup route
// app.post('/signup', async (req, res) => {
//   console.log("Received Data", req.body);

//   if (!req.body.name || !req.body.email || !req.body.password) {
//     return res.status(400).json({ error: 'All Fields are Requried' });}
  
//   try {
//     const newUser = await UserModel.create(req.body);
//     res.status(201).json({ msg: 'User added successfully', user: newUser });
    
//   } catch (err) {
//     res.status(400).json({ error: 'Unable to add this user', details: err.message });
//   }
//   // console.log("Request Body",req.body);
// });
// // signin route
// app.post('/signin',async(req,res)=>{
//   console.log(("User Data",req.body));

//   if(!req.body.email || !req.body.password){
//     return res.status(404).json({error:'User Data Not Matched'});
//   }
//   try{
//     const user=await UserModel.findOne({email:req.body.email});
//     if(!user){
//       return res.status(404).json({error:'User Not Found'});
//     }
//     const isMatch=await user.matchpassword(req.body.password);
//     if(!isMatch){
//       return res.status(401).json({error:'Invalid Password'});
//     }
//   }
  
//   catch(err){
//     res.status(400).json({error:'Unable to find user',details:err.message});
//   }  
  
// });

app.use('/auth',authRouter)//routing to authRouter
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
