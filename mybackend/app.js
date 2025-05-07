import express from "express";
import cors from 'cors';
// import authRoutes from "./routes/auth.route.js";
import userRouter from "./routes/userRouter.js"
import adminRoutes from "./routes/adminRoutes.js";
import gymRoutes from "./routes/gymRoutes.js";
import AppError from "./utils/appError.js";
import cookieParser from 'cookie-parser';
import globalErrorHandler from "./controllers/ErrorController.js"
import enquiryRoutes from "./routes/enquiryRoutes.js";
const app = express(); // ✅ Correctly initializing express

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Custom CORS middleware for multiple origins

const allowedOrigins = [
  'https://fithub-frontend-blush.vercel.app','https://fithub-ruddy.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


// Example route
app.get("/", (req, res) => {
  res.json({ message: "Gym routes are working!" });
});

 //User api routes
 app.use('/api/v1/users',userRouter);
  //admin api routes
  app.use('/api/v1/admin',adminRoutes);
  //Gym api routes
  app.use('/api/v1/gyms', gymRoutes); 
  // Enquiry api routes
  app.use('/api/v1/enquiry', enquiryRoutes);
// Users api url
app.all('*',(req,res,next)=>{
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));

})
app.use(globalErrorHandler);
export default app;
