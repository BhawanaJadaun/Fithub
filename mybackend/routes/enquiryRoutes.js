import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { createEnquiry, getAllEnquiries } from '../controllers/enquiryController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// Existing routes
router.post('/enquiry', createEnquiry); 
router.get('/enquiries', getAllEnquiries);
export default router;
