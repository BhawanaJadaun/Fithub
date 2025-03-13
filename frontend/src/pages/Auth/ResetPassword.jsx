import React, { useState } from "react";
import { API_URL } from "../../server.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button.jsx";
import { Loader, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { setAuthUser } from "../../redux/authSlice";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!otp || !email || !password || !passwordConfirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const data = { email, otp, password, passwordConfirm };
      const response = await axios.post(`${API_URL}/users/reset-password`, data, { withCredentials: true });

      dispatch(setAuthUser(response.data.data.user));
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-first">
      <div className="w-[400px] bg-second p-6 shadow-lg rounded-lg glow-border">
        <h2 className="text-2xl font-semibold text-center mb-6 text-six">Reset Password</h2>

        {/* OTP Input */}
        <input
          type="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full bg-third px-4 py-2 border-none rounded-lg mb-3 outline-none focus:ring-2 focus:ring-first text-default"
        />

        {/* Password Input with Show/Hide Button */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border-none rounded-lg mb-3 outline-none focus:ring-2 bg-third focus:ring-first pr-10 text-default"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} className = "text-six"/> : <Eye size={20} className = "text-six"/>}
          </button>
        </div>

        {/* Confirm Password Input with Show/Hide Button */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm password"
            className="w-full bg-third px-4 py-2 border-none rounded-lg mb-4 outline-none focus:ring-2 focus:ring-first pr-10 text-default"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} className = "text-six"/> : <Eye size={20} className = "text-six"/>}
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between mt-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-first bg-gradient-to-r from-second via-fifth to-first"
          >
            {loading ? <Loader className="animate-spin" /> : "Change Password"}
          </Button>
        </div>

        {/* Go Back Button */}
        <div className="mt-4 text-center">
          <Button variant="ghost" className="text-six">
            <Link to="/forgot-password">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
