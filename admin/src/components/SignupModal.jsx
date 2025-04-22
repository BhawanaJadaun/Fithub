import React from "react";

const SignupModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {/* Signup form */}
        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
