import React from "react";
import AllGym from "../../assets/AllGym.js";
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const Card = ({ location, description, rating, image }) => {
  return (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 p-4">
      <div className="cards group relative bg-second shadow-lg rounded-lg overflow-hidden transition-transform transform-style[perspective:500px]">
        <div className="card group-hover:translate-z-10 group-hover:rotate-x-10 group-hover:rotate-y-10 transition-transform duration-500 ease-in-out">
          {/* Image */}
          <img src={image} alt={location} className="h-48 w-full object-cover" />
          
          {/* Card Content */}
          <div className="p-4">
            <h2 className="text-xl font-semibold text-six text-center">{location}</h2>
            <p className="text-white mt-2 text-sm text-center">{description}</p>
            
            <div className="mt-3 flex items-center justify-center text-gray-700">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span className="text-default">{location}</span>
            </div>
            
            <div className="mt-2 flex justify-center items-center text-yellow-500">
              {Array.from({ length: Math.round(rating) }).map((_, index) => (
                <FaStar key={index} />
              ))}
              <span className="ml-2 text-six font-bold">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BestGym = () => {
  const cardsData = [
    { location: "New York", description: "A bustling city known for its iconic landmarks.", rating: 4.5, image: AllGym.gym1 },
    { location: "Paris", description: "The city of lights and love with rich culture.", rating: 4.8, image: AllGym.gym2 },
    { location: "Tokyo", description: "A vibrant city blending tradition and technology.", rating: 4.7, image: AllGym.gym3 },
    { location: "Sydney", description: "Famous for its opera house and beautiful beaches.", rating: 4.6, image: AllGym.gym4 },
  ];

  return (
    <div className="px-6 py-8 w-full min-h-screen bg-default">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-first text-center sm:text-left">
          Best Gyms Near You
        </h1>
        <Link to="/all-gyms">
          <button className="bg-gradient-to-r from-first via-fifth to-third text-white px-6 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition duration-300 sm:mt-0 mt-4">
            View All
          </button>
        </Link>
      </div>

      {/* Gym Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto px-2">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            location={card.location}
            description={card.description}
            rating={card.rating}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestGym;
