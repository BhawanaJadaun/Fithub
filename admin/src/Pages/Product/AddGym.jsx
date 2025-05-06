import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../server.js";
import { toast } from "react-toastify";

const AddGym = () => {
  const [formData, setFormData] = useState({
    gymName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    openTime: '',
    closeTime: '',
    monthlyPrice: '',
    facilities: [],
    image: null,
    description: '',
    website: '',
  });

  const [loading, setLoading] = useState(false);

  const facilitiesList = ['Cardio', 'Weights', 'Zumba', 'Yoga', 'Sauna'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    let updated = [...formData.facilities];
    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((item) => item !== value);
    }
    setFormData({ ...formData, facilities: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions

    setLoading(true);

    try {
      const gymData = new FormData();
      gymData.append("gymName", formData.gymName);
      gymData.append("ownerName", formData.ownerName);
      gymData.append("email", formData.email);
      gymData.append("phone", formData.phone);
      gymData.append("address", formData.address);
      gymData.append("city", formData.city);
      gymData.append("state", formData.state);
      gymData.append("pincode", formData.pincode);
      gymData.append("openTime", formData.openTime);
      gymData.append("closeTime", formData.closeTime);
      gymData.append("monthlyPrice", formData.monthlyPrice);
      gymData.append("description", formData.description);
      gymData.append("website", formData.website);

      if (formData.image) {
        gymData.append("image", formData.image);
      }

      formData.facilities.forEach((facility) => {
        gymData.append("facilities", facility);
      });

      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error('No token found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/gyms/add-gym`, gymData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Gym added successfully!');
      console.log('Gym added successfully:', response.data);

      // Clear form after submission
      setFormData({
        gymName: '',
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        openTime: '',
        closeTime: '',
        monthlyPrice: '',
        facilities: [],
        image: null,
        description: '',
        website: '',
      });

    } catch (error) {
      toast.error(`Error adding gym: ${error.response?.data?.message || error.message}`);
      console.error('Error adding gym:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-first rounded-lg shadow-md border border-first mb-10 mr-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-six">Add Gym</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="gymName"
          placeholder="Gym Name"
          value={formData.gymName}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="text"
          name="monthlyPrice"
          placeholder="Monthly Price"
          value={formData.monthlyPrice}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="time"
          name="openTime"
          value={formData.openTime}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />
        <input
          type="time"
          name="closeTime"
          value={formData.closeTime}
          onChange={handleChange}
          className="w-full p-3 border-none rounded bg-second text-six hover:focus:bg-first"
          required
        />

        <div className="md:col-span-2">
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3  rounded h-20 bg-second text-six hover:focus:bg-first border-none"
            required
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border-none rounded h-20 bg-second text-six hover:focus:bg-first"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-5 font-semibold text-fourth text-xl">Facilities</label>
          <div className="flex flex-wrap gap-4">
            {facilitiesList.map((facility) => (
              <label key={facility} className="flex items-center gap-2 text-lg  text-six hover:focus:bg-first">
                <input
                  type="checkbox"
                  value={facility}
                  checked={formData.facilities.includes(facility)}
                  onChange={handleFacilityChange}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="website"
          placeholder="Website (optional)"
          value={formData.website}
          onChange={handleChange}
          className="w-full p-3 border-none rounded md:col-span-2 bg-second text-six hover:focus:bg-first"
        />

        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-fourth text-lg">Upload Gym Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange} className = "text-six hover:focus:bg-first"
          />
        </div>

        <button
          type="submit"
          className="w-full md:col-span-2 bg-second text-six py-3 px-6 rounded hover:bg-third transition"
          disabled={loading}
        >
          {loading ? 'Adding Gym...' : 'Add Gym'}
        </button>
      </form>
    </div>
  );
};

export default AddGym;
