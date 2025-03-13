import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true,'Please provide an username'],
      minLength:3,
      maxLength:30,
      trim: true,
    },
    email: {
      type: String,
      required: [true,'Please provide an Email'],
      unique: true,
      lowercase: true,
      validate:[validator.isEmail,'Please provide an valid email'],
    },
    password: {
      type: String,
      required: [true,'Please provide a password'],
      minLength:8,
      select:false,
    },
    passwordConfirm: {
      type: String,
      required: [true,'Please confirm your password'],
     validate:{
      validator:function(e1){
        return e1 === this.password;
       },
       message:"Password are not same"
     }
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    otp: {
      type: String, 
      default:null,
    },
  otpExpires: {
    type:Date,
    default:null,
  },
  resetPasswordOtp:{
    type:String,
    default:null,
  },
  resetPasswordOtpExpires:{
    type:Date,
    default:null,

  },
  createAt:{
    type:Date,
    default:Date.now,
  }
  },{
    timestamps: true,
  }
);
userSchema.pre('save',async function(next){
  if(!this.isModified('password'))return next()
    this.password = await bcrypt.hash(this.password,12);
  this.passwordConfirm = undefined;
  next();
})
userSchema.methods.correctPassword = async function(password,userPassword){
  return bcrypt.compare(password,userPassword);
};
const User = mongoose.model("User", userSchema);
export default User;