import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.webp";
import demoVideo from "../assets/gym.mp4";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (isClosed) setIsClosed(false);
    setIsPlaying(!isPlaying);
  };

  const closeVideo = () => {
    setIsPlaying(false);
    setIsClosed(true);
    if (videoRef.current) videoRef.current.pause(); // Stop video playback
  };

  return (
    <section className="relative bg-first text-default h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        {/* Text Content */}
        <motion.div
          className="relative z-10 text-center md:text-left max-w-3xl px-6 py-10 md:py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-fifth">Discover</span> Your Perfect Gym
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Find, Compare, and Join the Best Gyms Near You. Your Fitness Journey Starts Here.
          </p>
          <div className="flex justify-center md:justify-start gap-4 items-center">
            <button
              className="bg-second px-6 py-3 text-white rounded-md hover:bg-third transition shadow-lg"
              onClick={() => (window.location.href = "/all-gyms")}
            >
              Explore Gyms
            </button>
            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-second to-fifth text-white hover:opacity-90 transition shadow-lg"
            >
              {isPlaying ? (
                <>
                  <AiOutlineClose size={30} />
                  Close Video
                </>
              ) : (
                <>
                  <AiFillPlayCircle size={30} />
                  {isClosed ? "Demo Video" : "Play Video"}
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="w-full md:w-2/3 h-full relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src={heroImage}
            alt="Hero Gym"
            className="w-full h-auto object-cover mt-10  animate-float shiny-bottom-only"
          />
        </motion.div>
      </div>

      {/* Video Modal */}
      {isPlaying && !isClosed && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-30">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <video ref={videoRef} className="w-3/4 h-auto rounded-lg shadow-xl" autoPlay loop controls>
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          <button
            onClick={closeVideo}
            className="absolute top-6 right-6 text-white p-3 bg-black rounded-full hover:bg-gray-800 transition"
          >
            <AiOutlineClose size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
