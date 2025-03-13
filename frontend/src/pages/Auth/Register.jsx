import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/actions/authActions.js";
import { Loader } from "lucide-react";
import { API_URL } from "../../server.js";

export const Register = () => {
  // ✅ Correct function declaration
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
      const response = await axios.post(`${API_URL}/users/signup`, formData, {
        withCredentials: true,
      });

      const user = response.data.user;
      console.log("User received after signup:", user);
      toast.success(response.data.message || "Registration successful!");
      dispatch(setAuthUser(user));
      console.log("Dispatched setAuthUser:", user);
      navigate("/otp-verification");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-first to-third p-4">
      <div className="w-full max-w-sm bg-first p-6 rounded-xl shadow-lg border border-gray-700 glow-border">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Register
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-white text-sm font-semibold">Username</label>
            <Input
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
            <Input
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
              <Input
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
              <Input
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
          <Button
            type="submit"
            className="w-full p-2 text-sm text-white bg-gradient-to-r from-second via-fifth to-first rounded-md transition flex justify-center items-center font-bold"
          >
            {isSubmitting ? (
              <Loader className="animate-spin w-8 h-8 text-white font-bold" />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
