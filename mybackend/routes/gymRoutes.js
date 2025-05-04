import express from "express";
import {
  addGym,
  getAllGyms,
  getSingleGym,
  editGym,
  deleteGym
} from "../controllers/gymController.js";
import upload from "../middlewares/uploadMiddleware.js"; // Middleware for file upload
import authAdmin from "../middlewares/authAdmin.js"; 
const router = express.Router();

//  Protected routes - Admin must be authenticated
router.post("/add-gym",authAdmin, upload.single("image"), addGym); 
router.put("/edit/:id",authAdmin , upload.single("image"), editGym); 
router.delete("/delete/:id",authAdmin , deleteGym);

// Public routes - No authentication required
router.get("/all-gyms", getAllGyms); // Get all gyms
router.get("/gym/:id", getSingleGym); // Get a single gym by ID

export default router;

