"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const EventEnrollProcess = ({ eventId, eventPrice }: { eventId: string; eventPrice: number }) => {
  const [userId, setUserId] = useState<string | null>(null);
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

  const handlePayment = async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const response = await fetch(`${BASE_URL}/api/v1/event-payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          user_id: userId,
          amount: eventPrice * 100, // Convert to cents
        }),
      });

      const session = await response.json();
      if (!response.ok) throw new Error(session.message || "Failed to initiate payment");

      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) throw new Error(error.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return userId ? (
    <>
      <p className="text-green-500">Authenticated (User ID: {userId})</p>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="btn bg-[#202C45] text-white w-full mt-3"
      >
        {isLoading ? "Processing..." : "Enroll Now"}
      </button>
    </>
  ) : (
    <>
      <p className="text-red-500">You need to log in or register to enroll in this event.</p>
      <Link href="/login" className="btn bg-[#202C45] text-white w-full mt-3">
        Login/Register
      </Link>
    </>
  );
};

export default EventEnrollProcess;
