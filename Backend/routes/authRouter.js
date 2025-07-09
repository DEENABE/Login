const{signin,signup, logout}=require('../controller/AuthController');
const{signupValidation,siginValidation}=require('../middleware/Authvalidation');
const UserModel = require('../modules/User'); // Importing UserModel

const router=require('express').Router();//using express router

//routing to signup and signin
router.post('/signup',signupValidation,signup);
router.post('/signin',siginValidation,signin);
router.post('/logout',logout);
//user get

module.exports=router; //exporting router