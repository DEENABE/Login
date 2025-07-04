const { date } = require('joi');
const mangoose = require('mongoose');
const Schema = mangoose.Schema;
 


const OtpVerificationSchema = new mangoose.Schema({
    userId:String,
    otp:{
        type:String,
        required:true,
        min:6,
        max:6
    },
    createAt:Date,
    expiresAt:Date,
})

const OtpVerification = mangoose.model('OtpVerification', OtpVerificationSchema);

module.exports = OtpVerification;