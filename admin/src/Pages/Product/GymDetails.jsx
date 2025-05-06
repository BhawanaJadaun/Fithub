import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../server.js';

const GymDetails = () => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/gyms/gym/${id}`, {
          withCredentials: true,
        });
        setGym(res.data.gym);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gym details:', error);
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (!gym) {
    return <div className="text-center mt-10 text-lg text-red-500">Gym not found.</div>;
  }

  return (
    <div className="max-w-full md:max-w-3xl lg:max-w-6xl mx-auto px-4 py-10  lg:ml-64 md:ml-0 sm:ml-0 transition-all duration-300">
      <div className="bg-third glow-border shadow-lg rounded-lg overflow-hidden">
        <img
          src={gym.image}
          alt={gym.gymName}
          className="w-full h-64 md:h-96 object-cover"
        />
  
        <div className="p-4 sm:p-6 md:flex md:gap-6">
          <div className="md:w-1/2 space-y-2">
            <h1 className="text-3xl font-bold mb-4 text-six">{gym.gymName}</h1>
            <p className="text-default"><strong className="text-fourth">Owner:</strong> {gym.ownerName}</p>
            <p className="text-default"><strong className="text-fourth">Email:</strong> {gym.email}</p>
            <p className="text-default"><strong className="text-fourth">Phone:</strong> {gym.phone}</p>
            <p className="text-fourth">
              <strong>Website:</strong>{" "}
              <a
                href={gym.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-six underline"
              >
                {gym.website}
              </a>
            </p>
          </div>
  
          <div className="md:w-1/2 mt-6 md:mt-0 space-y-2">
            <p className="text-default"><strong className="text-fourth">Address:</strong> {gym.address}, {gym.city}, {gym.state} - {gym.pincode}</p>
            <p className="text-default"><strong className="text-fourth">Open Time:</strong> {gym.openTime}</p>
            <p className="text-default"><strong className="text-fourth">Close Time:</strong> {gym.closeTime}</p>
            <p className="text-default"><strong className="text-fourth">Monthly Price:</strong> ₹{gym.monthlyPrice}</p>
            <p className="text-default"><strong className="text-fourth">Facilities:</strong> {gym.facilities?.join(', ') || 'N/A'}</p>
            <p className="text-default"><strong className="text-fourth">Description:</strong> {gym.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}  
export default GymDetails;
