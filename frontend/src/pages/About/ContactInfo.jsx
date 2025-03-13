import React from "react";
import { FaPhone, FaMailBulk, FaMapPin } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center bg-gradient-to-b from-gray-50 via-white to-gray-100 shadow-lg rounded-lg">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-first mb-8 tracking-wide">
        Contact Us
      </h2>

      {/* Section Description */}
      <p className="text-lg text-third mb-12 leading-relaxed">
        Have questions or need support? We're here to help! Reach out to our team through any of the following channels, and we'll assist you promptly.
      </p>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Phone */}
        <div className="flex flex-col items-center bg-third p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <FaPhone className="h-12 w-12 text-white mb-4" />
          <h3 className="text-xl font-bold text-six mb-2">Call Us</h3>
          <p className="text-lg text-white">+1 (555) 123-4567</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center bg-third p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <FaMailBulk className="h-12 w-12 text-white mb-4" />
          <h3 className="text-xl font-bold text-six mb-2">Email Us</h3>
          <p className="text-lg text-white">support@fitbnexus.com</p>
        </div>

        {/* Address */}
        <div className="flex flex-col items-center bg-third p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <FaMapPin className="h-12 w-12 text-white mb-4" />
          <h3 className="text-xl font-bold text-six mb-2">Visit Us</h3>
          <p className="text-lg text-white">
            123 Fitness Street, Wellness City
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
