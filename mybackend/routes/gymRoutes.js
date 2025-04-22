import express from "express";
import {
  addGym,
  getAllGyms,
  getSingleGym,
  editGym,
  deleteGym
} from "../controllers/gymController.js";
import upload from "../middlewares/uploadMiddleware.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

// 🔐 Protected routes
router.post("/add-gym", authAdmin, upload.single("image"), addGym);
router.put("/edit/:id", authAdmin, upload.single("image"), editGym);
router.delete("/delete/:id", authAdmin, deleteGym); // 🗑️ Delete gym

// 🌐 Public routes
router.get("/all-gyms", getAllGyms);
router.get("/gym/:id", getSingleGym);

export default router;
