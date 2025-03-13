import { useParams } from "react-router-dom";
import GymData from "../../assets/GymData.js";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import RequestForm from "./RequestForm.jsx";

const GymDetailsPage = () => {
  const { id } = useParams();
  const gym = GymData.find((gym) => gym.id === parseInt(id));

  if (!gym) {
    return (
      <p className="text-center text-red-500 text-2xl font-bold">
        Gym not found
      </p>
    );
  }

  const welcomeMessage = `Welcome to ${gym.name} in ${gym.location}`;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-first p-4 sm:p-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-default text-center mb-8 mt-5 w-full">
        {welcomeMessage}
      </h1>

      {/* Big Card Container */}
      <div className="bg-second shadow-xl rounded-lg overflow-hidden flex flex-col sm:flex-row w-full h-auto sm:h-[600px] glow-border">
        {/* Left Side: Gym Image */}
        <div className="sm:w-1/2 w-full h-full">
          <img
            src={gym.image}
            alt={gym.location}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Gym Details */}
        <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-white w-full h-full">
          <h1 className="text-2xl sm:text-4xl font-bold text-first">{gym.name}</h1>
          <p className="text-sm sm:text-lg mt-4">{gym.description}</p>

          {/* Gym Location */}
          <div className="mt-4 flex items-center text-gray-300">
            <FaMapMarkerAlt className="mr-2 text-xl" />
            <span className="text-sm sm:text-lg">{gym.location}</span>
          </div>

          {/* Gym Rating */}
          <div className="mt-4 flex items-center text-yellow-500">
            {Array.from({ length: Math.round(gym.rating) }).map((_, index) => (
              <FaStar key={index} />
            ))}
            <span className="ml-2 text-xl text-six font-bold">{gym.rating}</span>
          </div>

          {/* Owner Section */}
          {gym.owner && (
            <div className="flex items-center mt-6 p-4 bg-third rounded-lg shadow-md glow-border">
              <img
                src={gym.owner.image}
                alt={gym.owner.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-sm sm:text-lg font-semibold">Owner: {gym.owner.name}</p>
                <p className="text-xs sm:text-sm text-gray-300">Certified Gym Trainer</p>
              </div>
            </div>
          )}

          {/* Join Gym Button */}
          <button className="glow-border mt-6 bg-first hover:bg-third text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300">
            Enquiry now
          </button>
        </div>
      </div>

      {/* Request Form */}
      <RequestForm />
    </div>
  );
};

export default GymDetailsPage;
