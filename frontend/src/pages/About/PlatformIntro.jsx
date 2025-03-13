import React from "react";
import { Link } from "react-router-dom";
import About_bg from "../../assets/About1.png";

const PlatformIntro = () => {
  return (
    <div className="mx-auto px-4 py-16 rounded-lg shadow-lg bg-default">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="lg:w-1/2 animate__fadeInUp animate__animated">
          <h2 className="text-3xl sm:text-4xl font-bold text-first mb-6">
            Welcome to FitHub
          </h2>
          <p className="text-base sm:text-lg text-second mb-6">
            FitHub is a platform designed to make finding and joining gyms effortless. Gym owners can showcase their facilities, and fitness enthusiasts can discover, book, and manage memberships—all in one place.
          </p>
          <p className="text-base sm:text-lg text-second mb-8">
            Whether you're looking for a state-of-the-art facility or aiming to grow your fitness business, FitHub has the tools to help you achieve your goals.
          </p>
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-first text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow hover:bg-third transition-all duration-300"
            >
              Register with Us
            </Link>
            <Link
              to="/all-gyms"
              className="bg-second text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow hover:bg-first transition-all duration-300"
            >
              Publish Your Gym
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 bg-third animate__fadeInRight animate__animated">
          <img
            src={About_bg}
            alt="About FitHub"
            className="rounded-lg shadow-md max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformIntro;
