import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

const authAdmin = async (req, res, next) => {
  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Final token verification

    // Find the admin based on the decoded id
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || !admin.isVerified) {
      return res.status(403).json({ message: 'Access denied: Admin not verified or not found' });
    }

    // Attach the admin data to the request object for later use
    req.admin = admin;
    next();
  } catch (err) {
    console.error('Authentication Error:', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

export default authAdmin;
