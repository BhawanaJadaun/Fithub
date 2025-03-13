import express from "express";
import cors from 'cors';
// import authRoutes from "./routes/auth.route.js";
import userRouter from "./routes/userRouter.js"
import AppError from "./utils/appError.js";
import cookieParser from 'cookie-parser';
import globalErrorHandler from "./controllers/ErrorController.js"
const app = express(); // ✅ Correctly initializing express

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
origin: ['http://localhost:5173'],
credentials:true,
}));
// Example route
app.get("/", (req, res) => {
  res.json({ message: "Gym routes are working!" });
});

 //User api routes
 app.use('/api/v1/users',userRouter);
// Users api url
app.all('*',(req,res,next)=>{
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));

})
app.use(globalErrorHandler);
export default app;
