import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-first text-white py-6">
      <div className="container mx-auto text-center space-y-4 sm:space-y-6">
        {/* About Fitbnexus */}
        <div>
          <h2 className="text-xl font-semibold text-default">About FitHub</h2>
          <p className="text-sm mt-2 text-six sm:text-base">
            FitHub is your ultimate gym platform, connecting fitness enthusiasts with the best gyms in your area. Join us to achieve your fitness goals!
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-white">
            <FaFacebook size={28} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-white">
            <FaTwitter size={28} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-white">
            <FaInstagram size={28} />
          </a>
          <a href="https://www.linkedin.com/in/bhawana-jadaun-801674307/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-white">
            <FaLinkedin size={28} />
          </a>
          <a href="https://github.com/BhawanaJadaun" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
            <FaGithub size={24} />
          </a>
        </div>

        {/* Footer Note */}
        <div>
          <p className="text-sm text-white">&copy; 2025 FitHub. All rights reserved.</p>
        </div>

        {/* Made By BhawanaJadaun */}
        <div className="mt-4">
          <hr className="border-six my-4" />
          <p className="text-sm text-fifth">
            Made with <span className="text-red-500">♥</span> by
            <span className="text-white font-bold ml-1">BhawanaJadaun</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

