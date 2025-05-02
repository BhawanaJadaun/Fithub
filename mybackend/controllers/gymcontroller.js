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
      // Image upload to Cloudinary
      const uploadRes = await uploadToCloudinary(req.file.path);
      imageUrl = uploadRes.secure_url;
    }

    // Create a new gym object
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
      facilities: Array.isArray(facilities) ? facilities : facilities.split(","),
      image: imageUrl,
      description,
      website,
    });

    // Save the new gym to the database
    await newGym.save();

    // Return a successful response
    res.status(201).json({ success: true, gym: newGym });
  } catch (err) {
    console.error("Error adding gym:", err); // Log the error for debugging
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all gyms
export const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.status(200).json(gyms);
  } catch (err) {
    console.error("Error fetching gyms:", err); // Log the error for debugging
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single gym
export const getSingleGym = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }
    // ✅ Wrap in object
    res.status(200).json({ success: true, gym });
  } catch (err) {
    console.error("Error fetching gym:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// Edit an existing gym
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

    // Prepare updated data for the gym
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
      facilities: Array.isArray(facilities) ? facilities : facilities.split(","),
      description,
      website,
    };

    // Handle the image upload if a new image is provided
    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.path);
      updatedData.image = uploadRes.secure_url;
    }

    // Update gym in the database
    const updatedGym = await Gym.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedGym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    // Return the updated gym information
    res.status(200).json(updatedGym);
  } catch (err) {
    console.error("Error updating gym:", err); // Log the error for debugging
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a gym
export const deleteGym = async (req, res) => {
  try {
    const deletedGym = await Gym.findByIdAndDelete(req.params.id);
    if (!deletedGym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    res.status(200).json({ success: true, message: "Gym deleted successfully" });
  } catch (err) {
    console.error("Error deleting gym:", err); // Log the error for debugging
    res.status(500).json({ success: false, error: err.message });
  }
};
