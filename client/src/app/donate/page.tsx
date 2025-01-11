"use client";

import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

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
        "pk_test_51JwIBsFBTfTsSwmz8bqtyXmnIOlnITi40PZxeH94CVw4gw41R2R6chUyOdKef9J0CCNKuB22rOlGeVlfUcS2L9Nf008TuoJ83R"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/create-checkout-session",
        donationData
      );
      const sessionId = response.data.sessionId;

      // Redirect to Stripe Checkout
      const stripe = await getStripe(); // Assuming you have a helper function to load Stripe.js
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
                    type="text"
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

/* backend */

// import Fastify from 'fastify';
// import Stripe from 'stripe';

// const fastify = Fastify();
// const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', { apiVersion: '2020-08-27' });

// fastify.post('/api/create-checkout-session', async (request, reply) => {
//   const { name, email, phone, occupation, amount } = request.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Donation',
//             },
//             unit_amount: parseInt(amount, 10) * 100,  // Stripe expects amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'https://yourdomain.com/success',
//       cancel_url: 'https://yourdomain.com/cancel',
//       metadata: {
//         name,
//         email,
//         phone,
//         occupation,
//       },
//     });

//     reply.send({ sessionId: session.id });
//   } catch (error) {
//     reply.status(500).send({ error: error.message });
//   }
// });

// fastify.listen(3000, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });
