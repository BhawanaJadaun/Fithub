import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; // Correct package
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/actions/authActions.js";
import { API_URL } from "../server.js";

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
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await axios.post(`${API_URL}/admin/login`, formData, {
        withCredentials: true,
      });
  
      console.log("Login response:", response.data);
      console.log("Response data:", response.data.data);
  
      const admin = response.data?.data?.admin;
  
      if (!admin) {
        throw new Error("Invalid admin data from server");
      }
  
      toast.success(response.data.message || "Login successful!");
      dispatch(setAuthUser(admin));  
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-sm bg-first p-6 rounded-xl shadow-lg border border-gray-700 glow-border relative">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">Login</h2>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-white text-sm font-semibold">Email</label>
            <input
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
              <input
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 text-sm text-white bg-gradient-to-r from-second via-fifth to-first rounded-md transition flex justify-center items-center font-bold"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin w-6 h-6 text-white" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register */}
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
