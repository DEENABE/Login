const { required } = require('joi');
const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    number:{
        type:String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Invalid phone number format"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Invalid email format"],
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },   
    otp:{
        type:Number,
        default: "",
        required: false
        
    },
    verifyopt: {
        type: Boolean,
        default: false
    },
    isoptexpired: {
        type: Boolean,
        default: false,
    },
    isAccoutVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: Number,
        default: null
    },
    

},{collection:'Auth'});
//Hash password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
