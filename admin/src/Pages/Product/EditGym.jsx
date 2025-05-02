import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../server.js';
import {toast} from "react-toastify";
const EditGym = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/gyms/gym/${id}`, {
          withCredentials: true,
        });
        setGym(res.data.gym);
        setImagePreview(res.data.gym.image);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gym details:', error);
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGym((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilitiesChange = (e) => {
    const facilitiesArray = e.target.value.split(',').map(f => f.trim());
    setGym((prev) => ({ ...prev, facilities: facilitiesArray }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGym((prev) => ({
      ...prev,
      image: file,
    }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in gym) {
      if (key === 'facilities') {
        formData.append(key, JSON.stringify(gym[key]));
      } else {
        formData.append(key, gym[key]);
      }
    }

    try {
      // Updated the endpoint URL to include `/edit/` as per the backend routing
      await axios.put(`${API_URL}/gyms/edit/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success('Gym updated successfully');
      navigate('/all-gyms');
    } catch (error) {
      console.error('Error updating gym:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (!gym) {
    return <div className="text-center mt-10 text-lg text-red-500">Gym not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 ml-0 lg:ml-64 transition-all duration-300 glow-border">
      <div className="bg-second shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-six">Edit Gym</h2>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Gym Preview"
            className="w-full h-full mb-6 rounded"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="gymName"
            value={gym.gymName}
            onChange={handleChange}
            placeholder="Gym Name"
            className="w-full p-2 border-none rounded text-six bg-third"
          />
          <input
            type="text"
            name="ownerName"
            value={gym.ownerName}
            onChange={handleChange}
            placeholder="Owner Name"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="email"
            name="email"
            value={gym.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border-none  bg-third text-six rounded"
          />
          <input
            type="tel"
            name="phone"
            value={gym.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="text"
            name="address"
            value={gym.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="text"
            name="city"
            value={gym.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="text"
            name="state"
            value={gym.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="text"
            name="pincode"
            value={gym.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="time"
            name="openTime"
            value={gym.openTime}
            onChange={handleChange}
            placeholder="Open Time"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="time"
            name="closeTime"
            value={gym.closeTime}
            onChange={handleChange}
            placeholder="Close Time"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="number"
            name="monthlyPrice"
            value={gym.monthlyPrice}
            onChange={handleChange}
            placeholder="Monthly Price"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="text"
            value={gym.facilities?.join(', ')}
            onChange={handleFacilitiesChange}
            placeholder="Facilities (comma separated)"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <textarea
            name="description"
            value={gym.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          <input
            type="text"
            name="website"
            value={gym.website}
            onChange={handleChange}
            placeholder="Website URL"
            className="w-full p-2 border-none rounded bg-third text-six"
          />
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border-none rounded bg-third text-six"
          />

          <button type="submit" className="bg-first  text-six py-2 px-4 rounded hover:bg-fifth hover:text-first">
            Update Gym
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGym;
