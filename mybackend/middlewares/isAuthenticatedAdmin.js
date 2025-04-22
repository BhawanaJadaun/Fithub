import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Admin from "../models/adminModel.js";

const isAuthenticatedAdmin = catchAsync(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("You are not logged in, please log in to access", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentAdmin = await Admin.findById(decoded.id);

  if (!currentAdmin) {
    return next(new AppError("Admin associated with this token no longer exists", 401));
  }

  req.admin = currentAdmin;
  next();
});

export default isAuthenticatedAdmin;
