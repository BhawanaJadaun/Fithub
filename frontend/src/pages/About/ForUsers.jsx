import React from "react";
import UserImage from "../../assets/User.jpg"; // Replace with the actual image path
import { FaSearch, FaInfoCircle, FaCalendarCheck, FaTags } from "react-icons/fa";

const ForUsers = () => {
  return (
    <div className="mx-auto px-4 py-16 bg-default">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="lg:w-1/2 animate__fadeInLeft animate__animated">
          <h2 className="text-3xl font-semibold text-first mb-4">
            For Users
          </h2>
          <p className="text-lg text-second mb-8">
            As a user, you can search for gyms based on your location, preferred
            equipment, or available classes. Fitbnexus allows you to easily
            browse gym profiles, read reviews, and book your membership
            seamlessly. Join today and take the first step toward a healthier
            lifestyle!
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-lg text-gray-600">
              <FaSearch className="text-indigo-600 w-6 h-6 mr-4" />
              Search for gyms based on location, equipment, or class
              preferences.
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <FaInfoCircle className="text-green-600 w-6 h-6 mr-4" />
              View detailed gym profiles and member reviews to make informed
              decisions.
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <FaCalendarCheck className="text-blue-600 w-6 h-6 mr-4" />
              Easily book gym memberships and manage your fitness journey.
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <FaTags className="text-yellow-600 w-6 h-6 mr-4" />
              Access exclusive discounts and offers from top gyms near you.
            </li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 animate__fadeInRight animate__animated">
          <img
            src={UserImage}
            alt="For Users"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ForUsers;
