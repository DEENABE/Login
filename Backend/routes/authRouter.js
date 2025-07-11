const{signin,signup, logout, sendverfiyOtp, verfiymail,sendResetOtp,resetPassword}=require('../controller/AuthController');
const{signupValidation,siginValidation,verifyToken}=require('../middleware/Authvalidation');
const UserModel = require('../modules/User'); // Importing UserModel

const router=require('express').Router();//using express router

//routing to signup and signin
router.post('/signup',signupValidation,signup);
router.post('/signin',siginValidation,signin);
router.post('/logout',logout);
router.post('./sendverfiyOtp',sendverfiyOtp);
router.post('./verfiymail',verfiymail)
router.post('./verifyToken',verifyToken)
router.post('./resetPassword',resetPassword);
router.post('./sendResetOtp',sendResetOtp);
//user get

module.exports=router; //exporting router