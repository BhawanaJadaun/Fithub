import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllGyms from "./Pages/Product/AllGyms.jsx";
import AddGym from "./Pages/Product/AddGym.jsx";
import EditGym from "./Pages/Product/EditGym.jsx";
import GymDetails from "./Pages/Product/GymDetails.jsx";
import EnquiryPage from "./Pages/EnquiryPage.jsx";
import Analytics from "./Pages/AnalyticPage.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Register from "./Auth/Register.jsx";
import OtpVerification from "./Auth/OtpVerification.jsx";
import Login from "./Auth/Login.jsx";
import ForgotPassword from "./Auth/ForgotPassword.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./Pages/NotFound.jsx";
const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:ml-0 mt-16 lg:mt-0 bg-second">
          <Routes>
          <Route path="/" element={<Analytics />} />
            <Route path="/all-gyms" element={<AllGyms />} />
            <Route path="/add-gym" element={<AddGym />} />
            <Route path="/edit-gym/:id" element={<EditGym />} />
            <Route path="/gym/:id" element={<GymDetails />} />
            <Route path="/enquiry-page" element={<EnquiryPage />} />
      {/* Auth routes */}
          <Route path="/register" element={<Register />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <ToastContainer theme="colored" autoClose={3000} />

    </Router>
  );
};

export default App;
