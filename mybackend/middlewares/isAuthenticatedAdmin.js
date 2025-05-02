import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Admin from "../models/adminModel.js";

const isAuthenticatedAdmin = catchAsync(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return next(new AppError("You are not logged in, please log in to access", 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the admin exists
    const currentAdmin = await Admin.findById(decoded.id);

    if (!currentAdmin) {
      return next(new AppError("Admin associated with this token no longer exists", 401));
    }

    // Attach the admin to the request object
    req.admin = currentAdmin;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token has expired, please log in again", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token, please log in again", 401));
    }
    return next(new AppError("Something went wrong with authentication", 500));
  }
});

export default isAuthenticatedAdmin;
