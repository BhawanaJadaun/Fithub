import React from "react";
import { MagnifyingGlassIcon, UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"; // Import icons

const Features = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      {/* Section Heading */}
      <h2 className="text-4xl font-extrabold text-first mb-6">FitHub Features</h2>
      <p className="text-lg text-third font-bold mb-8">
        Fitbnexus offers a variety of features that make your fitness journey easy and enjoyable.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-first p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
          <MagnifyingGlassIcon className="h-12 w-12 text-white mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-six mb-4">Gym Search</h4>
          <p className="text-lg text-white">
            Find the perfect gym based on your needs, including equipment, classes, and location. All in one place.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-first p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
          <UserCircleIcon className="h-12 w-12 text-white mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-six mb-4">Membership Management</h4>
          <p className="text-lg text-white">
            Seamlessly manage your gym memberships, track visits, and keep up with your fitness progress.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-first p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
          <CalendarDaysIcon className="h-12 w-12 text-white mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-six mb-4">Booking System</h4>
          <p className="text-lg text-white">
            Easily book your gym visits, classes, and memberships with our user-friendly interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
