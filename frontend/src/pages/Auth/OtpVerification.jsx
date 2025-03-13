import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "../../server.js";
import { setAuthUser } from "../../redux/authSlice.js"; // Use the correct action
import { Loader } from "lucide-react";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join("").trim();
      console.log("OTP Sent to Server:", otpValue);
  
      const response = await axios.post(
        `${API_URL}/users/verify`,
        { otp: otpValue },
        { withCredentials: true }
      );
  
      console.log("Server Response:", response.data);
  
      // ✅ Ensure correct extraction of user data
      const verifiedUser = response.data?.data?.user;
      console.log("Extracted User Data:", verifiedUser);
  
      if (verifiedUser) {
        dispatch(setAuthUser(verifiedUser));
        console.log("Updated Redux State:", verifiedUser);
        toast.success("Verification Successful");
        navigate("/");
      } else {
        throw new Error("User data is missing in the response");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error?.response?.data?.message || "Verification Failed!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/resend-otp`, null, { withCredentials: true });
      toast.success("OTP Resent Successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Resend OTP!");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-first">
      <h1 className="text-xl mb-4 font-semibold text-six">Enter Your Email Verification Code here</h1>
      <div className="flex space-x-4">
        {[0, 1, 2, 3].map((index) => (
          <input
            type="text"
            key={index}
            value={otp[index]}
            onChange={(e) => handleChange(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-20 h-20 rounded-lg bg-second text-3xl font-bold text-center glow-border text-default"
            maxLength={1}
          />
        ))}
      </div>
      <div className="flex items-center space-x-4 mt-6">
        {!loading ? (
          <>
            <Button onClick={handleSubmit} variant="default" disabled={loading} className="bg-gradient-to-r from-second via-six to-first rounded-md hover:opacity-90 transition text-white ">
              Submit
            </Button>
            <Button onClick={handleResendOtp} className="bg-six">
              Resend OTP
            </Button>
          </>
        ) : (
          <Loader className="animate-spin w-8 h-8 text-six" />
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
