import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import logo from "../assets/Fitnesslogo.png";
import { toast } from "react-toastify";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import {API_URL} from "../server.js"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const state = useSelector((state) => state);
console.log("Full Redux State:", state);

  const user = useSelector((state) => state.auth.user);
  console.log(
    "Redux State:",
    useSelector((state) => state.auth)
  );

  const dispatch = useDispatch();
  const logoutHandler = async()=>{
try {
  await axios.post(`${API_URL}/users/logout`);
  dispatch(setAuthUser(null))
  toast.success("Logged out successfully");
} catch (error) {
  toast.error("Logout failed. Try again.");
}
  }


  return (
    <div className="flex items-center justify-between px-4 py-1 text-black sticky top-0 z-10 bg-first shadow-md">
      {/* Logo */}
      <div className="inline-flex items-center space-x-2">
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-16 cursor-pointer bg-fourth rounded-full"
          />
          <span className="text-white text-2xl">𝐹𝒾𝓉𝐻𝓊𝒷</span>
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-semibold text-white text-base">
        <li>
          <NavLink to="/" className="hover:text-fourth">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="hover:text-fourth">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/all-gyms" className="hover:text-fourth">
            All Gyms
          </NavLink>
        </li>
      </ul>
      {/* Authentication Section */}
      <div className="md:flex sm:hidden items-center gap-4">
  {!user && (
    <Link to="/login">
      <Button className="px-6 py-3 bg-third text-six rounded-md border-2 glow-border text-lg sm:px-4 sm:py-2 sm:text-sm">
        Log In
      </Button>
    </Link>
  )}

  {!user && (
    <Link to="/register">
      <Button className="px-6 py-3 bg-fourth text-white rounded-md text-lg sm:px-4 sm:py-3 sm:text-sm">
        Register
      </Button>
    </Link>
  )}

  {user && (
    <>
      <div className="flex items-center space-x-2">
        <Avatar onClick={logoutHandler} className="cursor-pointer">
          <AvatarFallback className="font-bold uppercase text-white glow-border bg-third rounded-full text-xl">
            {user.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <Button variant="ghost" size="sm" className="bg-third text-white glow-border p-2">
        {user.isVerified ? "Verified" : "Not Verified"}
      </Button>
    </>
  )}
</div>


      {/* Mobile Menu Icon */}
      <IoIosMenu
        onClick={() => setShowMenu(true)}
        className="w-12 h-12 md:hidden cursor-pointer text-six"
      />

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-second z-50 flex flex-col items-center pt-6">
          <div className="flex items-center justify-between w-full px-4 pb-2 border-b">
            <img
              src={logo}
              alt="Logo"
              className="w-16 cursor-pointer bg-fourth rounded-full"
            />
            <span className="text-white text-3xl">𝐹𝒾𝓉𝐻𝓊𝒷</span>
            <RxCross2
              className="w-12 h-12 cursor-pointer text-six"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-6 mt-10 text-3xl font-medium text-white">
            <li>
              <NavLink
                to="/"
                className="hover:text-six"
                onClick={() => setShowMenu(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-six"
                onClick={() => setShowMenu(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-gyms"
                className="hover:text-six"
                onClick={() => setShowMenu(false)}
              >
                All Gyms
              </NavLink>
            </li>
            <div className="flex gap-2 mt-4">
              {user ? (
                <Avatar onClick={logoutHandler} className="cursor-pointer">
                  <AvatarFallback className="font-bold uppercase text-white bg-red-600 rounded-full">
                    {user.username.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="px-6 py-3 bg-white text-six rounded-md border-2 border-bg-first text-lg sm:px-4 sm:py-2 sm:text-sm">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="px-6 py-3 bg-fourth text-white rounded-md text-lg sm:px-4 sm:py-3 sm:text-sm">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
