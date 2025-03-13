import React, { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios"; // Import axios
import {API_URL} from "../../server.js"

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Fix state initialization
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      return toast.error("Please enter your email");
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/users/forgot-password`, { email }, { withCredentials: true });
      toast.success("Reset code sent to your email");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-first">
      <h1 className="text-xl text-six mb-4 font-medium">
        Enter your Email to get a code for resetting your password
      </h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-[40%] mb-4 mx-auto rounded-lg bg-second glow-border px-4 py-3 text-default "
        placeholder="Enter your email"
      />
      <Button onClick={handleSubmit} disabled={loading} className = " bg-gradient-to-r from-second via-fifth to-first">
        {loading ? <Loader className="animate-spin" /> : "Submit"}
      </Button>
    </div>
  );
};

export default ForgotPassword;
