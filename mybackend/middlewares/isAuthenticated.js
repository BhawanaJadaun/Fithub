import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../models/userModel.js";
const isAuthenticated = catchAsync(async(req,res,next)=>{
const token = req.cookies.token || req.headers.authorization.split(" ")[1];
if(!token){
  return next(new AppError('You are not logged in , Please login to Access',401))
}
const decode  = jwt.verify(token,process.env.JWT_SECRET);
const currentUser = await User.findById(decode.id)
if(!currentUser){
  return next(new AppError("The user belonging to this token does not exist ",401))
};
req.user = currentUser;
next();
})
export default isAuthenticated; 