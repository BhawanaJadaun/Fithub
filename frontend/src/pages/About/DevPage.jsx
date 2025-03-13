import React from 'react';
import developerImage from '../../assets/Dev.png'; // Replace with actual image path
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";

const DevPage = () => {
  return (
    <div className="min-h-screen bg-first glow-border p-6 md:p-8 flex flex-col items-center justify-start">
      
      {/* Page Heading */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fifth to-default 
        uppercase tracking-wide text-center w-full fade-in mb-6 md:mb-10">
        Developer Page
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 md:gap-10">
        
        {/* Developer Image */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <img
            src={developerImage}
            alt="Developer"
            className="w-full rounded-lg shadow-lg fade-in image-hover glow-border transition-transform transform hover:scale-105"
          />
        </div>

        {/* Developer Info */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/3 text-center lg:text-left space-y-4 md:space-y-6 slide-in">
          <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-six  to-first">
            Bhawana Jadaun
          </h1>
          <p className="text-sm md:text-lg text-white font-medium leading-relaxed">
            I am a passionate <span className="text-fifth font-semibold">Full Stack Developer</span> with expertise in building scalable web applications using the 
            <span className="text-pink-500 font-semibold"> MERN stack</span> and designing sleek user interfaces with 
            <span className="text-teal-400 font-semibold"> Tailwind CSS</span>. Always eager to learn and contribute to impactful projects.
          </p>

          {/* Contact Information */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-2xl text-six font-semibold">Connect with me:</h2>

            <p className="flex items-center gap-3 text-sm md:text-lg text-six">
              <IoMdMail className="text-red-500 glow-border p-1 md:p-2" size={30} md:size={40} />
              <span className="hover:text-pink-600 transition">bhawanajadaun0001@gmail.com</span>
            </p>

            <p className="flex items-center gap-3 text-sm md:text-lg text-six">
              <FaPhoneAlt className="text-blue-600 glow-border p-1 md:p-2" size={30} md:size={40} />
              <span className="hover:text-blue-500 transition">+91 75*******</span>
            </p>

            <p className="flex items-center gap-3 text-sm md:text-lg text-six">
              <FaLinkedin className="text-blue-600 glow-border p-1 md:p-2" size={30} md:size={40} />
              <a
                href="https://www.linkedin.com/in/bhawana-jadaun"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-500 transition"
              >
                LinkedIn Profile
              </a>
            </p>

            <p className="flex items-center gap-3 text-sm md:text-lg text-six">
              <FaGithub className="text-black glow-border p-1 md:p-2" size={30} md:size={40} />
              <a
                href="https://github.com/BhawanaJadaun"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-gray-700 transition"
              >
                GitHub Profile
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevPage;
