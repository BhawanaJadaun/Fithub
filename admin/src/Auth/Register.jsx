import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react"; // Removed X
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/actions/authActions.js";
import { API_URL } from "../server.js";

export const Register = ({ show, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/admin/signup`, formData); // ❌ Removed withCredentials
  
      const { user, token, adminId, message } = response.data;
  
      if (user?.email) {
        localStorage.setItem("adminEmail", user.email);
        console.log("Admin email saved:", user.email);
      } else {
        console.warn("No email found in user object.");
      }
  
      if (token) {
        localStorage.setItem("adminToken", token); // ✅ Save Bearer token for later use
      } else {
        console.warn("No token received on signup!");
      }
  
      if (adminId) {
        localStorage.setItem("adminId", adminId);
        console.log("Admin ID saved:", adminId);
      } else {
        console.warn("No adminId found in response.");
      }
  
      toast.success(message || "Registration successful!");
      dispatch(setAuthUser(user));
      onClose();
      navigate("/otp-verification");
  
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div
      className="flex items-center justify-center w-screen h-screen mt-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-sm bg-first p-6 rounded-xl shadow-lg border border-gray-700 glow-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Register
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-white text-sm font-semibold">Username</label>
            <input
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full text-sm p-2 rounded-md bg-second text-white focus:ring-2 focus:ring-six"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-sm p-2 rounded-md bg-second text-white focus:ring-2 focus:ring-six"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm font-semibold">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-sm p-2 rounded-md bg-second text-white focus:ring-2 focus:ring-six"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-six hover:text-default"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white text-sm font-semibold">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="w-full text-sm p-2 rounded-md bg-second text-white focus:ring-2 focus:ring-six"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-six hover:text-default"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 text-sm text-white bg-gradient-to-r from-second via-fifth to-first rounded-md transition flex justify-center items-center font-bold"
          >
            {isSubmitting ? (
              <Loader className="animate-spin w-8 h-8 text-white font-bold" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="text-white font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
