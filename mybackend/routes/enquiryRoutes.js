import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { createEnquiry, getAllEnquiries } from '../controllers/enquiryController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Existing routes
router.post('/enquiry', createEnquiry); 
router.get('/enquiries', getAllEnquiries);

// New: Inline reply route
// router.post('/reply', async (req, res) => {
//   const { email, message } = req.body;

//   if (!email || !message) {
//     return res.status(400).json({ success: false, error: 'Email and message are required.' });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD
//       }
//     });

//     await transporter.sendMail({
//       from: `"Fitbnexus Team" <${process.env.SMTP_EMAIL}>`,
//       to: email,
//       subject: 'Reply to your enquiry',
//       text: message
//     });

//     res.json({ success: true, message: 'Reply sent successfully.' });
//   } catch (error) {
//     console.error('Email error:', error);
//     res.status(500).json({ success: false, error: 'Failed to send email.' });
//   }
// });

export default router;
