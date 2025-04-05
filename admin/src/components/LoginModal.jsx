// src/components/LoginModal.jsx
import React from 'react';

const LoginModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-first p-6 rounded-xl w-96 glow-border">
        <h2 className="text-xl font-semibold mb-4 text-center text-six">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border-first px-3 py-2 mb-3 rounded-md bg-third text-white "
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-first px-3 py-2 mb-4 rounded-md bg-third text-white"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-500 rounded-md text-white hover:bg-red-950"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-first text-white rounded-md hover:bg-second">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
