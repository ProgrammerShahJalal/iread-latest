"use client";
import React from 'react';

const DonationSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You for Your Donation!</h1>
      <p className="text-gray-700 mb-6">
        Your donation was successful. Your support helps us make a difference.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Return to Home
      </button>
    </div>
  );
};

export default DonationSuccessPage;
