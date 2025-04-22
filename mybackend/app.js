import express from "express";
import cors from 'cors';
// import authRoutes from "./routes/auth.route.js";
import userRouter from "./routes/userRouter.js"
import adminRoutes from "./routes/adminRoutes.js";
import gymRoutes from "./routes/gymRoutes.js";
import AppError from "./utils/appError.js";
import cookieParser from 'cookie-parser';
import globalErrorHandler from "./controllers/ErrorController.js"
const app = express(); // ✅ Correctly initializing express

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
origin: ['http://localhost:5173','http://localhost:5174'],
credentials:true,
}));
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
// Users api url
app.all('*',(req,res,next)=>{
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));

})
app.use(globalErrorHandler);
export default app;
