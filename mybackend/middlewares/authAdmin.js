import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No token found in Authorization header");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Admin Token received:", token);

  try {
    console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET || "undefined");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      console.warn("Admin not found in database");
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }

    if (!admin.isVerified) {
      console.warn("Admin account not verified");
      return res.status(403).json({ message: "Access denied: Admin not verified" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("JWT verification failed:");
    console.error("Token used:", token);
    console.error("JWT_SECRET in use:", process.env.JWT_SECRET || "undefined");
    console.error("Error message:", err.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: err.message,
    });
  }
};

export default authAdmin;
