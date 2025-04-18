import express from "express";
import { signup , verifyAccount,resendOTP, login,logout,forgotPassword,resetPassword} from "../controllers/authController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.post('/signup',signup);
router.post('/verify',isAuthenticated, verifyAccount);
router.post('/resend-otp',isAuthenticated,resendOTP);
router.post('/login',login);
router.post('/logout',logout);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);

export default router;