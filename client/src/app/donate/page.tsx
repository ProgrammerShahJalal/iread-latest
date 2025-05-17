"use client";

import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import apiClient from "../../lib/apiClient";

function DonationPage() {
  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    amount: "",
  });

  // This will load Stripe.js and return the Stripe instance.
  let stripePromise: Promise<any>;

  const getStripe = (): Promise<any> => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
      ); // Use your Stripe public key here
    }
    return stripePromise;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDonationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const BASE_URL = apiClient.defaults.baseURL;
  console.log('base url from donation', BASE_URL);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseFloat(donationData.amount) <= 0) {
      toast.error("Please enter a valid donation amount.")
      return;
    }

    try {
      // console.log('from frontend', donationData)
      const response = await axios.post(
        `${BASE_URL}/api/v1/donations/create-checkout-session`,
        donationData
      );

      const sessionId = response?.data?.data?.sessionId;


      // Redirect to Stripe Checkout
      const stripe = await getStripe(); 
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error(error);
      }
   
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="section-content">
          <div className="row">
            <div className="col-md-7">
              <h4>Be a Hero: Make a Difference with Your Donation Today!</h4>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    Name <small>*</small>
                  </label>
                  <input
                    name="name"
                    className="form-control"
                    type="text"
                    placeholder="Enter Name"
                    value={donationData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Email <small>*</small>
                  </label>
                  <input
                    name="email"
                    className="form-control"
                    type="text"
                    placeholder="Enter Email"
                    value={donationData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Phone <small>*</small>
                  </label>
                  <input
                    name="phone"
                    className="form-control"
                    type="text"
                    placeholder="Enter Phone"
                    value={donationData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Occupation <small>*</small>
                  </label>
                  <input
                    name="occupation"
                    className="form-control"
                    type="text"
                    placeholder="Enter Occupation"
                    value={donationData.occupation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Amount <small>*</small>
                  </label>
                  <input
                    name="amount"
                    className="form-control"
                    type="number"
                    placeholder="Enter Donation Amount"
                    value={donationData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-flat btn-theme-colored"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationPage;