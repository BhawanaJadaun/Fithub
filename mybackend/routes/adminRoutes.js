import express from "express";
import {
  signup,
  verifyAccount,
  resendOTP,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/adminController.js";
import isAuthenticatedAdmin from "../middlewares/isAuthenticatedAdmin.js";

const router = express.Router();

// Admin Auth Routes
router.post('/signup', signup);
router.post('/verify', isAuthenticatedAdmin, verifyAccount);
router.post('/resend-otp', isAuthenticatedAdmin, resendOTP);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
