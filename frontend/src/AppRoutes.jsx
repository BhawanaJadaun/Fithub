import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import About from "./pages/About/AboutPage.jsx";
import PlatformIntroduction from "./pages/About/PlatformIntro.jsx";
import ForGymOwners from "./pages/About/GymOwner.jsx";
import ForUsers from "./pages/About/ForUsers.jsx";
import AllGyms from "./pages/ProductPage/AllGymPage.jsx";
import GymDetailsPage from "./pages/ProductPage/GymDetailsPage.jsx"
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import OtpVerification from "./pages/Auth/OtpVerification.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    {/* About route */}
    <Route path="/platform-introduction" element={<PlatformIntroduction />} />
    <Route path="/for-gym-owners" element={<ForGymOwners />} />
    <Route path="/for-users" element={<ForUsers />} />

    <Route path="/all-gyms" element={<AllGyms />} />
    <Route path="/gym/:id" element={<GymDetailsPage />} /> {/* Dynamic Route */}
    <Route path="/register" element={<Register />} />
    <Route path="/otp-verification" element={<OtpVerification />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword/>} />
 
  </Routes>
);

export default AppRoutes;
