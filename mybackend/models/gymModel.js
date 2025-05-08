import mongoose from 'mongoose';

const gymSchema = new mongoose.Schema({
  gymName: {
    type: String,
    required: true,
    trim: true,
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  monthlyPrice: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String],
    default: [],
  },
  image: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Gym', gymSchema);
