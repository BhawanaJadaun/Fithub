import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary and delete local file after upload
export const uploadToCloudinary = async (localPath) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "FITHUB", // Optional: specify the folder name on Cloudinary
    });

    // Log successful upload
    console.log(`Image uploaded successfully to Cloudinary: ${result.secure_url}`);

    // Delete the local file after successful upload
    await fs.promises.unlink(localPath);
    console.log(`Local file deleted: ${localPath}`);

    return result; // Return the result from Cloudinary upload
  } catch (error) {
    // Log error and throw it so that calling functions can handle it
    console.error("Error uploading to Cloudinary:", error);
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};
