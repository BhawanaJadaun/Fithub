import React from 'react';

const RequestForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8">
      {/* Full-Screen Container with Border Animation */}
      <div className="w-full max-w-screen-xl flex flex-col sm:flex-row gap-8 bg-second glow-border p-8">
        {/* Left Side - Description Box */}
        <div className="w-full sm:w-1/2 p-4">
          <p className="text-xl sm:text-2xl font-semibold mb-4 text-six">Description - Add Gym</p>
          <textarea
            placeholder="Provide details about the gym..."
            className="w-full text-six h-64 sm:h-72 p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-six transition-all duration-300 resize-none glow-border"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full sm:w-1/2 p-4 mt-8 sm:mt-14">
          <form className="space-y-4">
            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-six mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="text-default p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 glow-border"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-six mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="text-default p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 glow-border"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all glow-border"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
