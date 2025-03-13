import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice.js";
import { API_URL } from "../../server.js";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() })); // Trim spaces
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    console.log("🔍 Sending login data:", formData); // Debugging
  
    try {
      const response = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });
  
      console.log("✅ Server Response:", response.data);
  
      const user = response.data?.data?.user;
      if (!user) throw new Error("Invalid user data from server");
  
      toast.success(response.data.message || "Login successful!");
      dispatch(setAuthUser(user));
      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-first to-third p-4">
      <div className="w-full max-w-sm bg-first p-6 rounded-xl shadow-lg border border-gray-700 glow-border">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-white text-sm font-semibold">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full text-sm p-2 rounded-md bg-second text-white focus:ring-2 focus:ring-six"
              required
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
                autoComplete="current-password"
                className="w-full text-sm p-2 rounded-md bg-second text-white focus:ring-2 focus:ring-six"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-six hover:text-default"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="text-red-500 text-right block text-sm font-semibold mt-2"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 text-sm text-white bg-gradient-to-r from-second via-fifth to-first rounded-md transition flex justify-center items-center font-bold"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin w-6 h-6 text-white" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
