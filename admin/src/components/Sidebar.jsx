import React, { useState, useEffect } from "react";
import logo from "../assets/Fitnesslogo.png";
import { NavLink } from "react-router-dom";
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
import LoginModal from "./LoginModal";

const Sidebar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "All Gym", path: "/gyms", icon: <FiUsers /> },
    { name: "Add Gym", path: "/add-gym", icon: <FiPlusCircle /> },
    { name: "Enquiry", path: "/enquiry-page", icon: <FiMessageSquare /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  ];

  // Prevent background scrolling on mobile when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden bg-first text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 bg-fourth rounded-full object-cover"
          />
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 w-64 h-screen bg-first text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Top section */}
        <div>
          {/* Only show on large screens */}
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
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Button */}
        <div className="px-4 py-6 border-t border-second">
          <button
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-second hover:bg-gray-700 transition"
            onClick={() => {
              setShowLoginModal(true);
              setIsSidebarOpen(false); // Close sidebar on mobile
            }}
          >
            <FiSettings className="text-lg" />
            Settings
          </button>
        </div>
      </aside>

      {/* Login Modal */}
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Sidebar;
