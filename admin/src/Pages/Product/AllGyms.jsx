
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from "../../server.js";

const AllGyms = () => {
  const [gyms, setGyms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = axios.post(`${API_URL}/gyms/all-gyms`, formData, {
          withCredentials: true,
        });
        setGyms(res.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching gyms:", error)
        setLoading(false)
      }
    }

    fetchGyms()
  }, [])

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium">Loading...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Listed Gyms</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym) => (
          <div
            key={gym._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
          >
            <img
              src={gym.image}
              alt={gym.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{gym.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{gym.location}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{gym.description}</p>

              <div className="flex justify-between">
                <Link
                  to={`/gym/${gym._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View
                </Link>
                <Link
                  to={`/edit-gym/${gym._id}`}
                  className="text-green-500 hover:underline text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllGyms
