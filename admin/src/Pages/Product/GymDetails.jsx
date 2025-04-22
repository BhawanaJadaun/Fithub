import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../server.js";

const GymDetails = () => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/gym/gym/${id}`, {
          withCredentials: true,
        });
        setGym(res.data.gym); // Adjust based on your backend response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gym details:", error);
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;
  }

  if (!gym) {
    return <div className="text-center mt-10 text-lg text-red-500">Gym not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">{gym.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={gym.image}
            alt={gym.name}
            className="w-full h-64 object-cover rounded"
          />
        </div>

        <div>
          <p className="text-gray-700 mb-4">
            <strong>Location:</strong> {gym.location}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {gym.description}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Contact:</strong> {gym.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
