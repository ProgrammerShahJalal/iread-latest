"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const EventEnrollProcess = ({
  eventId,
  eventPrice,
}: {
  eventId: string;
  eventPrice: number;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [eventEnrollmentId, setEventEnrollmentId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.token && user?.id) {
        setUserId(user.id);
      }
    }
  }, []);

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleEnrollment = async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/event-enrollments/store`,
        {
          event_id: eventId,
          user_id: userId,
          date: new Date().toISOString(),
          status: "pending",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setEventEnrollmentId(response?.data?.data?.data?.id);
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const trxId = uuidv4().split("-")[0]; // Generate a unique transaction ID

      const response = await fetch(
        `${BASE_URL}/api/v1/event-payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_id: eventId,
            user_id: userId,
            event_enrollment_id: eventEnrollmentId,
            date: new Date().toISOString(),
            amount: eventPrice,
            media: "Stripe",
            trx_id: trxId, // Use dynamically generated transaction ID
          }),
        }
      );

      const session = await response.json();

      if (!response.ok)
        throw new Error(session.message || "Failed to initiate payment");

      const { error } = await stripe.redirectToCheckout({
        sessionId: session?.data?.data?.session_id,
      });

      if (error) throw new Error(error.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return userId ? (
    <>
      {/* <p className="text-green-500">Authenticated (User ID: {userId})</p> */}
      {error && <p className="text-red-500">{error}</p>}

      {eventEnrollmentId ? (
        <button
          onClick={handlePayment}
          disabled={isLoading}
          style={{ backgroundColor: "#ec4899" }} // Tailwind's pink-500 color in HEX
          className="w-full mt-3 text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:bg-gray-400"
        >
          {isLoading ? "Redirecting..." : "Checkout"}
        </button>
      ) : (
        <button
          onClick={handleEnrollment}
          disabled={isLoading}
          className="btn bg-[#202C45] text-white w-full mt-3"
        >
          {isLoading ? "Processing..." : "Enroll Now"}
        </button>
      )}
    </>
  ) : (
    <>
      <p className="text-red-500">
        You need to log in or register to enroll in this event.
      </p>
      <Link href="/login" className="btn bg-[#202C45] text-white w-full mt-3">
        Login/Register
      </Link>
    </>
  );
};

export default EventEnrollProcess;
