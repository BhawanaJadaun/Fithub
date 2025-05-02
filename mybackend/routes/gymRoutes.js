import express from "express";
import {
  addGym,
  getAllGyms,
  getSingleGym,
  editGym,
  deleteGym
} from "../controllers/gymController.js";
import upload from "../middlewares/uploadMiddleware.js"; // Middleware for file upload
// import authAdmin from "../middlewares/authAdmin.js"; 
const router = express.Router();

//  Protected routes - Admin must be authenticated
router.post("/add-gym", upload.single("image"), addGym); // Admin adds a gym
router.put("/edit/:id",  upload.single("image"), editGym); // Admin edits a gym
router.delete("/delete/:id",  deleteGym); // Admin deletes a gym

// Public routes - No authentication required
router.get("/all-gyms", getAllGyms); // Get all gyms
router.get("/gym/:id", getSingleGym); // Get a single gym by ID

export default router;

