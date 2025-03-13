import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GymData from "../../assets/GymData.js";
import { FaMapMarkerAlt, FaStar, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Card component
const Card = ({ location, description, rating, image, name, gymId }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gym/${gymId}`);
  };

  return (
    <div className="p-4 cursor-pointer" onClick={handleCardClick}>
      {/* 3D Perspective wrapper */}
      <div className="cards group relative bg-second shadow-lg rounded-lg overflow-hidden transition-transform transform-style[perspective:500px]">
        <div className="card group-hover:translate-z-10 group-hover:rotate-x-20 group-hover:rotate-y-20 transition-transform duration-500 ease-in-out">
          {/* Image */}
          <img
            src={image}
            alt={location}
            className="h-48 w-full object-cover"
          />

          {/* Card Content */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-six">{name}</h2>
            <p className="text-white mt-2">{description}</p>
            <div className="mt-4 flex items-center text-gray-700">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span className="text-default">{location}</span>
            </div>

            <div className="mt-2 flex items-center text-yellow-500">
              {Array.from({ length: Math.round(rating) }).map((_, index) => (
                <FaStar key={index} />
              ))}
              <span className="ml-2 text-six font-bold">{rating}</span>
            </div>
            <Button
              onClick={handleCardClick}
              className="bg-second text-white py-2 mt-3 px-4 rounded-lg hover:bg-first transition-colors duration-300"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// AllGymPage component
const AllGymPage = () => {
  const [search, setSearch] = useState("");

  // Filter gyms based on search input (location or gym name)
  const filteredGyms = GymData.filter((gym) =>
    gym.location.toLowerCase().includes(search.toLowerCase()) ||
    gym.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-8 bg-default min-h-screen">
      {/* Header Section */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-first">All GYMS</h1>
        {/* Search Bar with Icon */}
        <div className="mt-6 max-w-md mx-auto relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gyms by location or name"
            className="w-full bg-first px-4 py-2 text-six border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-second pr-12"
          />
          {/* Search Icon */}
          <FaSearch
            className={`absolute right-4 top-1/2 text-six transform -translate-y-1/2 text-2xl transition-opacity duration-300 ${
              search ? "opacity-100" : "opacity-30"
            }`}
          />
        </div>
      </div>

      {/* Gym Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGyms.length > 0 ? (
          filteredGyms.map((gym, index) => (
            <Card
              key={index}
              location={gym.location}
              description={gym.description}
              rating={gym.rating}
              image={gym.image}
              name={gym.name}
              gymId={gym.id} // Pass gym ID for navigation
            />
          ))
        ) : (
          <p className="text-center text-first font-bold text-2xl mt-8 col-span-full">
            No gyms found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllGymPage;
