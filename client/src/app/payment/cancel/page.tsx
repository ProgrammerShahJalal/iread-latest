"use client";
import React from 'react';

const PaymentCancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-gray-700 mb-6">
        Your payment process was cancelled. If this was a mistake, you can try again.
      </p>
      <button
        onClick={() => window.location.href = '/events'}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back to Events Page
      </button>
    </div>
  );
};

export default PaymentCancelPage;