import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import AllGym from "./Pages/Product/AddGym.jsx";
import AddGym from "./Pages/Product/AddGym.jsx";
import EditGym from "./Pages/Product/EditGym.jsx";
import GymDetails from "./Pages/Product/EditGym.jsx";
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
const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:ml-0 mt-16 lg:mt-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-gyms" element={<AllGym />} />
            <Route path="/add-gym" element={<AddGym />} />
            <Route path="/edit-gym/:id" element={<EditGym />} />
            <Route path="/gym/:id" element={<GymDetails />} />
            <Route path="/enquiry-page" element={<EnquiryPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
      </div>
      <ToastContainer theme="colored" autoClose={3000} />

    </Router>
  );
};

export default App;
