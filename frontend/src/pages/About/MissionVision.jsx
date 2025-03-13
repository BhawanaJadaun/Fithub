import React from "react";
import { GlobeAltIcon, UsersIcon } from "@heroicons/react/24/outline"; // Import Heroicons

const MissionVision = () => {
  return (
    <div className="bg-first py-12 text-center text-white">
      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-6">Our Mission and Vision</h2>
      
      {/* Icons and Descriptions */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {/* Mission */}
        <div className="flex flex-col items-center">
          <GlobeAltIcon className="h-16 w-16 text-white mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p className="text-lg">
            To make fitness accessible for everyone, connecting gym enthusiasts with the best facilities nearby.
          </p>
        </div>
        
        {/* Vision */}
        <div className="flex flex-col items-center">
          <UsersIcon className="h-16 w-16 text-white mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p className="text-lg">
            Enhance the gym experience through technology, community, and innovative solutions for fitness enthusiasts.
          </p>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <button className="bg-white text-first hover:bg-six hover:text-first transition duration-300 py-3 px-8 text-lg font-semibold rounded-md">
        Register Now
      </button>
    </div>
  );
};

export default MissionVision;
