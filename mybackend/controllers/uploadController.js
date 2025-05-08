import { uploadToCloudinary } from "../config/cloudinary";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// Controller to handle image upload
const uploadImage = catchAsync(async (req, res, next) => {
  const { file } = req;

  if (!file) {
    return next(new AppError("No file uploaded", 400));
  }

  try {
    // Call uploadToCloudinary function to upload image to Cloudinary
    const result = await uploadToCloudinary(file.path);

    // Respond with the URL of the uploaded image
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url, // Return the Cloudinary URL of the uploaded image
    });
  } catch (error) {
    return next(error);
  }
});

export { uploadImage };
