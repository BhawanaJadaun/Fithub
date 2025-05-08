
import Admin from "../models/adminModel.js";
import catchAsync from "../utils/catchAsync.js";
import generateOtp from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/email.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

// ========================== Helpers ==========================

const signToken = (id) => {
  const secret = process.env.JWT_SECRET || 'temporaryfallbacksecret';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Ensure this is set in .env file
  });
};

const createSendToken = (admin, statusCode, res, message) => {
  const token = signToken(admin._id);
  console.log("Token created at:", new Date()); // Log the time of token creation
  console.log("Generated Token:", token); // Log the token for debugging

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // Set the cookie expiration time
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure cookie in production only
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // SameSite cookie policy
  };

  res.cookie("token", token, cookieOptions); // Send the token as a cookie

  admin.password = undefined;
  admin.otp = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: { admin },
  });
};

// ========================== Signup ==========================
export const signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, username } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return next(new AppError("Email already exists", 400));

  const otp = generateOtp();
  const otpExpires = Date.now() + 24 * 60 * 60 * 1000;

  const newAdmin = await Admin.create({
    username,
    email,
    password,
    passwordConfirm,
    otp,
    otpExpires,
  });

  const adminData = await Admin.findById(newAdmin._id).select(
    "-password -passwordConfirm -otp"
  );

  try {
    await sendEmail({
      email: newAdmin.email,
      subject: "OTP for Admin Email Verification",
      html: `<h1>Your Admin OTP is: <strong>${otp}</strong></h1>`,
    });

    createSendToken(adminData, 200, res, "Admin registration successful. OTP sent to email.");
  } catch (error) {
    await Admin.findByIdAndDelete(newAdmin._id);
    return next(new AppError(`Email sending failed: ${error.message}`, 500));
  }
});

// ========================== Verify Account ==========================
export const verifyAccount = catchAsync(async (req, res, next) => {
  const { otp } = req.body;

  if (!otp) return next(new AppError("OTP is missing", 400));

  let admin = req.admin;

  if (!admin) return next(new AppError("Admin not authenticated", 401));

  admin = await Admin.findById(admin._id);

  if (!admin) return next(new AppError("Admin not found", 404));
  if (admin.otp !== otp) return next(new AppError("Invalid OTP", 400));
  if (Date.now() > admin.otpExpires)
    return next(new AppError("OTP has expired. Please request a new one.", 400));

  admin.isVerified = true;
  admin.otp = undefined;
  admin.otpExpires = undefined;
  await admin.save({ validateBeforeSave: false });

  createSendToken(admin, 200, res, "Admin email has been verified.");
});

// ========================== Resend OTP ==========================
export const resendOTP = catchAsync(async (req, res, next) => {
  const email = req.admin?.email || req.body.email;

  if (!email) return next(new AppError("Email is required to resend OTP", 400));

  const admin = await Admin.findOne({ email });
  if (!admin) return next(new AppError("Admin not found", 404));
  if (admin.isVerified) return next(new AppError("Admin already verified", 400));

  const newOTP = generateOtp().toString();
  admin.otp = newOTP;
  admin.otpExpires = Date.now() + 10 * 60 * 1000;

  await admin.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: admin.email,
      subject: "Resend OTP for Admin Email Verification",
      html: `<h1>Your New Admin OTP is: ${newOTP}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "A new OTP has been sent to your admin email",
    });
  } catch (error) {
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save({ validateBeforeSave: false });
    return next(new AppError("Error sending email. Please try again.", 500));
  }
});

// ========================== Login ==========================
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.correctPassword(password, admin.password)))
    return next(new AppError("Incorrect email or password", 401));

  createSendToken(admin, 200, res, "Admin login successfully");
});

// ========================== Logout ==========================
export const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
});

// ========================== Forgot Password ==========================
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return next(new AppError("No admin found", 404));

  const otp = generateOtp();
  admin.resetPasswordOtp = otp;
  admin.resetPasswordOtpExpires = Date.now() + 300000;

  await admin.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: admin.email,
      subject: "Admin Password Reset OTP (Valid for 5 min)",
      html: `<h1>Your Admin Password Reset OTP: ${otp}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset OTP sent to admin email.",
    });
  } catch (error) {
    admin.resetPasswordOtp = undefined;
    admin.resetPasswordOtpExpires = undefined;
    await admin.save({ validateBeforeSave: false });

    return next(new AppError("Error sending email. Please try again later."));
  }
});

// ========================== Reset Password ==========================
export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password, passwordConfirm } = req.body;

  const admin = await Admin.findOne({
    email,
    resetPasswordOtp: otp,
    resetPasswordOtpExpires: { $gt: Date.now() },
  });

  if (!admin) return next(new AppError("Invalid OTP or OTP expired", 400));
  if (password !== passwordConfirm) return next(new AppError("Passwords do not match", 400));

  admin.password = password;
  admin.passwordConfirm = passwordConfirm;
  admin.resetPasswordOtp = undefined;
  admin.resetPasswordOtpExpires = undefined;

  await admin.save();

  createSendToken(admin, 200, res, "Admin password reset successful");
});
