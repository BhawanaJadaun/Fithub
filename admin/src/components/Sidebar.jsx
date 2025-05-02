import React, { useState, useEffect } from "react";
import logo from "../assets/Fitnesslogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../server.js";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Button } from "@/components/ui/button";

import {
  FiHome,
  FiUsers,
  FiPlusCircle,
  FiMessageSquare,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";

const Sidebar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "All Gym", path: "/all-gyms", icon: <FiUsers /> },
    { name: "Add Gym", path: "/add-gym", icon: <FiPlusCircle /> },
    { name: "Enquiry", path: "/enquiry-page", icon: <FiMessageSquare /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  ];

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const state = useSelector((state) => state);
  console.log("Full Redux State:", state);

  const user = useSelector((state) => state.auth.user);
  console.log("Redux State:", useSelector((state) => state.auth));

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`);
      dispatch(setAuthUser(null)); // Log out by clearing user data
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <>
      {/* Mobile Togglebar */}
      <div className="lg:hidden bg-first text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 bg-fourth rounded-full object-cover"
          />
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl">
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-first text-white flex flex-col justify-between shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b border-second">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 bg-fourth rounded-full object-cover"
            />
            <span className="text-lg font-semibold bg-second px-3 py-1 rounded-full glow-border">
              Admin Panel
            </span>
          </div>

          <ul className="flex flex-col gap-2 mt-6 px-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                      isActive ? "bg-second text-white" : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Button */}
        <div className="px-4 py-8 border-t border-second relative">
          <button
            className="w-full flex items-center gap-2 px-4 py-2 mb-5 rounded-md bg-second hover:bg-gray-700 transition"
            onClick={() => setShowSettingsOptions((prev) => !prev)}
          >
            <FiSettings className="text-lg" />
            Settings
          </button>

          {/* Dropdown Menu */}
          {showSettingsOptions && (
            <div className="absolute bottom-full left-4 right-4 mb-2">
              {/* Arrow */}
              <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-4 h-4 bg-first rotate-45 border-l border-t border-second z-10" />

              <div className="bg-first border border-second rounded-md shadow-lg z-20 relative p-2">
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowSettingsOptions(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <ul className="mt-2">
                  {!user && (
                    <Link to="/login">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-third transition"
                        onClick={() => {
                          setShowLoginModal(true);
                          setShowSettingsOptions(false);
                          setIsSidebarOpen(false);
                        }}
                      >
                        Sign In
                      </button>
                    </Link>
                  )}
                  {!user && (
                    <Link to="/register">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-third transition"
                        onClick={() => {
                          setShowSignupModal(true);
                          setShowSettingsOptions(false);
                          setIsSidebarOpen(false);
                        }}
                      >
                        Sign Up
                      </button>
                    </Link>
                  )}
                  {user && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Avatar
                          onClick={logoutHandler}
                          className="cursor-pointer"
                        >
                          <AvatarFallback className="font-bold uppercase text-white glow-border bg-third rounded-full text-xl">
                            {user.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-third text-white glow-border p-2"
                      >
                        {user.isVerified ? "Verified" : "Not Verified"}
                      </Button>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Modals (conditionally rendered) */}
      {showLoginModal && (
        <Login show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      )}
      {showSignupModal && (
        <Register
          show={showSignupModal}
          onClose={() => setShowSignupModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
