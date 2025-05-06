import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../server.js";

const AllGyms = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Get token from localStorage
        if (!token || token === 'null' || token === 'undefined') {
          toast.error('Admin not authenticated. Please login again.');
          navigate("/register");
          return;
        }
      
        const res = await axios.get(`${API_URL}/gyms/all-gyms`, {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Include token in header
          },
          withCredentials: true,
        });
        setGyms(res.data);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGyms();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium">Loading...</div>
    );
  }

  return (
    <div className="p-6 lg:ml-60 w-screen/ overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center text-default bg-second w-full">
        All Listed Gyms
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mr-5">
        {gyms.length === 0 ? (
          <p className="col-span-full text-center text-default">
            No gyms found.
          </p>
        ) : (
          gyms.map((gym) => (
            <div key={gym._id} className="gym-card max-w-72 w-full mx-auto">
              <img
                src={
                  gym.image ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={gym.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between text-md">
                  <span className="font-semibold text-fifth">Gym in</span>
                  <span className="text-fifth">{gym.city}</span>
                </div>

                <p className="text-xl font-semibold mt-3 mb-2 text-six">
                  {gym.gymName}
                </p>

                <p className="text-sm text-default mb-2">
                  {gym.description?.slice(0, 60)}...
                </p>

                <div className="flex gap-2 mb-4">
                  <span className="bg-second px-2 py-1 text-xs font-semibold uppercase rounded-full">
                    {gym.category || "General"}
                  </span>
                  <span className="bg-second px-2 py-1 text-xs font-semibold uppercase rounded-full">
                    {gym.city}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm font-semibold text-[#717171]">
                  <Link
                    to={`/gym/${gym._id}`}
                    className="hover:underline text-blue-400"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-gym/${gym._id}`}
                    className="hover:underline text-green-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllGyms;

