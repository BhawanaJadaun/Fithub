import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import generateOtp from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/email.js";
import AppError from "../utils/AppError.js";
import bcrypt from 'bcryptjs';



const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  res.cookie("token", token, cookieOptions);

  // Remove sensitive information before sending response
  user.password = undefined;
  user.passwordConfirm = undefined;
  user.otp = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: { user },
  });
};
// Signup

export const signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, username } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError("Email already exists", 400));

  const otp = generateOtp();
  const otpExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    otp,
    otpExpires,
  });
  console.log("new User", newUser);
  
  const userData = await User.findById(newUser._id).select("-password -passwordConfirm -otp");
  try {
    await sendEmail({
      email: newUser.email,
      subject: "OTP for Email Verification",
      html: `<h1>Your OTP is: <strong>${otp}</strong></h1>`,

    });

    console.log("📧 Email sent successfully to:", newUser.email);
    createSendToken(userData, 200, res, "Registration successful. OTP sent to email.");
  } catch (error) {
    console.error("❌ Email Sending Error:", error.message);

    await User.findByIdAndDelete(newUser._id); // Cleanup if email fails
    return next(new AppError(`Email sending failed: ${error.message}`, 500));

  }
});

//========================== Verify Account==========================================
export const verifyAccount = catchAsync(async(req, res, next) => {
  const { otp } = req.body;

  if (!otp) {
    return next(new AppError("OTP is missing", 400));
  }

  let user = req.user;

  if (!user) {
    return next(new AppError("User not authenticated", 401));
  }

  user = await User.findById(user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.otp !== otp) {
    return next(new AppError("Invalid OTP", 400));
  }

  if (Date.now() > user.otpExpires) {
    return next(new AppError("OTP has expired. Please request a new OTP.", 400));
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res, "Email has been verified.");
});

// ======================resend otp=========================
export const resendOTP = catchAsync(async (req, res, next) => {
  const email = req.user?.email || req.body.email; // Fallback to body.email

  if (!email) {
    return next(new AppError("Email is required to resend OTP", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("This account is already verified", 400));
  }

  const newOTP = generateOtp().toString();
  user.otp = newOTP;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Resend OTP for Email Verification",
      html: `<h1>Your New OTP is: ${newOTP}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "A new OTP has been sent to your email",
    });
  } catch (error) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Error sending email. Please try again.", 500));
  }
});

// =======================LOGIN=================================
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("📩 Incoming Login Request:", { email, password });

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // Fetch user from the database
  const user = await User.findOne({ email }).select("+password");
  if(!user || !(await user.correctPassword(password,user.password))){
    return next(new AppError('Incorrect Email or Password',401))
  }
  createSendToken(user,200,res,"Login Successfully")
});

// =============logout================================
export const logout = catchAsync(async(req,res,next)=>{
  res.cookie("token","loggedout",{
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
  })
  res.status(200).json({
    success:true,
    message:"Logged out Successfully"
  })
})
// ===================Forgot Password ========================
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No user found", 404));
  }

  // Generate OTP and expiration time
  const otp = generateOtp();
  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpires = Date.now() + 300000; // 5 min

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset OTP (Valid for 5 min)",
      html: `<h1>Your Password Reset OTP: ${otp}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset OTP has been sent to your email.",
    });
  } catch (error) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("There was an error sending the email. Please try again later."));
  }
});

// ===================Reset Password==============================
export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password, passwordConfirm } = req.body;

  const user = await User.findOne({
    email,
    resetPasswordOtp: otp,
    resetPasswordOtpExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Invalid OTP or OTP expired", 400));

  // Ensure password confirmation matches
  if (password !== passwordConfirm) {
    return next(new AppError("Passwords do not match", 400));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.resetPasswordOtp = undefined;
  user.resetPasswordOtpExpires = undefined;

  await user.save();

  createSendToken(user, 200, res, "Password reset successfully");
});


