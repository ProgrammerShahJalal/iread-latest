"use client";
import Invoice from '@/Invoice/Invoice';
import React from 'react';

import { useSearchParams } from 'next/navigation';


const DonationSuccessPage = () => {

  const searchParams = useSearchParams();

  // console.log('searchParams', searchParams);

  // Ensure searchParams is a URLSearchParams instance
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const occupation = searchParams.get('occupation');
  const amount = searchParams.get('amount');


  return (
    <>
      <div className=" text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4 mt-16">Thank You for Your Donation!</h1>
        <p className="text-gray-700 mb-6">
          Your donation was successful. Your support helps us make a difference.
        </p>
      </div>
      <Invoice  name={name} email={email} phone={phone} occupation={occupation} amount={amount} />
    </>
  );
};

export default DonationSuccessPage;
