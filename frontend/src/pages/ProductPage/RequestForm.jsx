import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../server.js";
import { toast } from "react-toastify";

const RequestForm = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    gymName: '',
    message: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    try {
      let imageUrl = '';
      if (image) {
        const imageData = new FormData();
        imageData.append('file', image);
        imageData.append('upload_preset', uploadPreset);
  
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          imageData
        );
        imageUrl = res.data.secure_url;
      }
  
      await axios.post(`${API_URL}/enquiry/enquiry`, {
        ...formData,
        image: imageUrl,
      });
  
      toast.success('Enquiry sent!');
      setFormData({ name: '', email: '', location: '', gymName: '', message: '' });
      setImage(null);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8">
      <div className="w-full max-w-screen-xl flex flex-col sm:flex-row gap-8 bg-second glow-border p-8">
        <div className="w-full sm:w-1/2 p-4">
          <p className="text-xl sm:text-2xl font-semibold mb-4 text-six text-inline">
            Requested Form - To Add Your Gym
          </p>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Provide details about the gym..."
            className="w-full text-six h-64 sm:h-72 p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-six transition-all duration-300 resize-none glow-border"
          />
        </div>

        <div className="w-full sm:w-1/2 p-4 mt-8 sm:mt-14">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-six mb-1">Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="text-default p-4 border-2 border-gray-300 rounded-md glow-border"
              />
            </div>
            <div className="flex flex-col">
             <label className="text-six mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="text-default p-4 border-2 border-gray-300 rounded-md glow-border"
            />
            </div>

            <div className="flex flex-col">
              <label className="text-six mb-1">Location</label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="text-default p-4 border-2 border-gray-300 rounded-md glow-border"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-six mb-1">Gym Name</label>
              <input
                name="gymName"
                type="text"
                value={formData.gymName}
                onChange={handleChange}
                placeholder="Enter gym name"
                className="text-default p-4 border-2 border-gray-300 rounded-md glow-border"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-six mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

           <button type="submit" disabled={isSubmitting}
          className={`w-full text-white py-2 px-4 rounded-md glow-border ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } transition duration-300`}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
