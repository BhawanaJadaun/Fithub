
import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: String,
  email:String,
  image: String,//Image url
  location: String,
  gymName: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
