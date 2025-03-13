import React from "react";
import { Link } from "react-scroll";

const AboutIntro = () => {
  return (
    <div className="bg-first py-16">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          Get to Know <span className="text-fifth">About Us</span>
        </h1>
        <p className="text-xl text-white mb-8">
          Connecting <span className="text-fourth">Fitness</span> Enthusiasts
          with <span className="text-fourth">Top Local Gyms</span>
        </p>
      </div>

      {/* Introduction and Buttons to navigate */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg text-white mb-6">
          Learn more about <span className="text-fourth">FitHub</span>, a
          platform designed to connect{" "}
          <span className="text-fourth">gym owners</span> and users.
        </p>
        <div className="space-x-4 flex justify-center flex-wrap">
          <Link
            to="platform-introduction"
            smooth={true}
            duration={500}
            className="inline-block bg-white text-first font-semibold py-2 px-6 rounded-lg hover:bg-fourth mb-4 sm:mb-0 text-base sm:text-lg"
          >
            Learn More About Fitbnexus
          </Link>
          <Link
            to="for-gym-owners"
            smooth={true}
            duration={500}
            className="inline-block bg-third text-white font-semibold py-2 px-6 rounded-lg mb-4 sm:mb-0 text-base sm:text-lg"
          >
            For Gym Owners
          </Link>
          <Link
            to="for-users"
            smooth={true}
            duration={500}
            className="inline-block bg-fifth text-first font-semibold py-2 px-6 rounded-lg text-base sm:text-lg mb-4 sm:mb-0"
          >
            For Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;
