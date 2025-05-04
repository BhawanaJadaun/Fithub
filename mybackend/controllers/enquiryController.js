
import { Enquiry } from '../models/enquiryModel.js';

export const createEnquiry = async (req, res) => {
  const { name, email, image, location, gymName, message , admin} = req.body;
  const enquiry = await Enquiry.create({ name,email, image, location, gymName, message });
  res.status(201).json(enquiry);
};

export const getAllEnquiries = async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
};
