import React from 'react';
import AllGym from "../../assets/AllGym.js";
import { Link } from 'react-router-dom';

const PremiumGym = () => {
  const gymData = [
    {
      image: AllGym.Premium1,
      heading: "Elite Fitness",
      description: "State-of-the-art equipment and trainers.",
      location: "New York, USA",
      rating: 5,
    },
    {
      image: AllGym.Premium2,
      heading: "Gold's Gym",
      description: "A legacy of strength training excellence.",
      location: "Los Angeles, USA",
      rating: 4,
    },
    {
      image: AllGym.Premium3,
      heading: "Platinum Gym",
      description: "Exclusive facilities for premium members.",
      location: "Chicago, USA",
      rating: 4,
    },
    {
      image: AllGym.Premium4,
      heading: "Iron Paradise",
      description: "Train like a pro in a luxurious setting.",
      location: "Miami, USA",
      rating: 5,
    },
  ];

  return (
    <div className="px-4 sm:px-6 bg-default w-full min-h-screen">
      {/* Heading and Button Section */}
      <div className="flex flex-wrap items-center justify-between mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-first">Premium Gyms</h1>
        <Link to="/all-gyms">
          <button className="bg-gradient-to-r from-first via-fifth to-third text-white px-5 sm:px-6 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition duration-300 mt-4 sm:mt-0">
            View All
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
        {gymData.map((gym, index) => (
          <div
            key={index}
            className="relative w-full h-80 sm:h-96 rounded-3xl shadow-xl cursor-pointer transition-transform duration-300 hover:scale-95"
            style={{
              backgroundImage: `url(${gym.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute bottom-0 bg-first bg-opacity-90 w-full p-5 sm:p-6 rounded-b-3xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-default">{gym.heading}</h3>
              <p className="text-sm sm:text-base text-white mt-2">{gym.description}</p>
              <p className="text-xs sm:text-sm text-six mt-1">{gym.location}</p>
              <p className="text-yellow-500 font-semibold mt-2">{'⭐'.repeat(gym.rating)}</p>
            </div>
            {/* Premium Label */}
            <span className="absolute overflow-hidden w-32 sm:w-44 h-32 sm:h-44 -top-3 sm:-top-4 -left-3 sm:-left-4 flex items-center justify-center">
              <span className="absolute w-[140%] sm:w-[160%] h-10 sm:h-12 bg-gradient-to-r from-first via-third to-six transform -rotate-45 -translate-y-4 sm:-translate-y-5 flex items-center justify-center text-white font-semibold tracking-wide uppercase shadow-md">
                Premium
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumGym;
