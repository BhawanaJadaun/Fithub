import React from "react";
import GymOwnerImage from "../../assets/gymowner.webp"; // Replace with the actual image path
import { FaEye, FaUsers, FaCalendarAlt, FaPercentage } from "react-icons/fa";

const GymOwner = () => {
  return (
    <div className="mx-auto px-4 py-16 bg-six">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2 animate__fadeInLeft animate__animated">
          <img
            src={GymOwnerImage}
            alt="Gym Owner Benefits"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 ml-10 animate__fadeInRight animate__animated">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            For Gym Owners
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            <strong>Why List Your Gym?</strong> By listing your gym on Fitbnexus, you'll gain exposure to a larger audience
            of fitness seekers looking for the right gym to meet their needs. From managing memberships to promoting
            special offers, our platform offers all the tools to make gym ownership easier.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-lg text-gray-600">
              <FaEye className="text-indigo-600 w-6 h-6 mr-4" />
              Increase your gym's visibility to a broader audience.
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <FaUsers className="text-green-600 w-6 h-6 mr-4" />
              Manage memberships, schedules, and bookings effortlessly.
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <FaCalendarAlt className="text-blue-600 w-6 h-6 mr-4" />
              Access a community of motivated gym-goers ready to join.
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <FaPercentage className="text-yellow-600 w-6 h-6 mr-4" />
              Promote special offers and memberships to increase your revenue.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GymOwner;
