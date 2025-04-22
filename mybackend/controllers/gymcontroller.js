import Gym from "../models/GymModel.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// Add a new gym
export const addGym = async (req, res) => {
  try {
    const {
      gymName,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      openTime,
      closeTime,
      monthlyPrice,
      description,
      website,
    } = req.body;

    const facilities = req.body.facilities || []; // already declared here, so no need to declare again below

    let imageUrl = null;

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.path);
      imageUrl = uploadRes.secure_url;
    }

    const newGym = new Gym({
      gymName,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      openTime,
      closeTime,
      monthlyPrice,
      facilities: Array.isArray(facilities)
        ? facilities
        : facilities.split(","), // Support both array and comma-separated string
      image: imageUrl,
      description,
      website,
    });

    await newGym.save();

    res.status(201).json({ success: true, gym: newGym });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all gyms
export const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.status(200).json(gyms);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single gym
export const getSingleGym = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }
    res.status(200).json(gym);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Edit gym
export const editGym = async (req, res) => {
  try {
    const {
      gymName,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      openTime,
      closeTime,
      monthlyPrice,
      description,
      website,
    } = req.body;

    const facilities = req.body.facilities || [];

    let updatedData = {
      gymName,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      openTime,
      closeTime,
      monthlyPrice,
      facilities: Array.isArray(facilities)
        ? facilities
        : facilities.split(","),
      description,
      website,
    };

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.path);
      updatedData.image = uploadRes.secure_url;
    }

    const updated = await Gym.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete gym
export const deleteGym = async (req, res) => {
  try {
    const deletedGym = await Gym.findByIdAndDelete(req.params.id);
    if (!deletedGym) {
      return res
        .status(404)
        .json({ success: false, message: "Gym not found" });
    }

    res.status(200).json({ success: true, message: "Gym deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
