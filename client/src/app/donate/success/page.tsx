"use client";
import Invoice from '@/Invoice/Invoice';
import React from 'react';

const DonationSuccessPage = () => {
  return (
    <>
      <div className=" text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4 mt-16">Thank You for Your Donation!</h1>
        <p className="text-gray-700 mb-6">
          Your donation was successful. Your support helps us make a difference.
        </p>
        
      </div>
      <Invoice/>
    </>
  );
};

export default DonationSuccessPage;
