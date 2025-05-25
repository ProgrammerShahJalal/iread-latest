"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import apiClient from "../lib/apiClient";

// Custom hook for userId
const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user: { id: string; token?: string } = JSON.parse(userData);
          return user.id || null;
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    return null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user: { id: string; token?: string } = JSON.parse(userData);
          setUserId(user.id || null);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Error handling storage change:", error);
        setUserId(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return userId;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const EventEnrollProcess = ({
  eventId,
  eventPrice,
}: {
  eventId: number;
  eventPrice: number;
}) => {
  const userId = useUserId();
  const [eventEnrollmentId, setEventEnrollmentId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = apiClient.defaults.baseURL;

  const handleEnrollment = async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Enroll the user
      const enrollmentResponse = await axios.post(
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

      const eventEnrollmentId = enrollmentResponse?.data?.data?.data?.id;
      if (!eventEnrollmentId) throw new Error("Failed to enroll in the event");

      // Step 2: Initiate payment immediately after successful enrollment
      await handlePayment(eventEnrollmentId);
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const handlePayment = async (eventEnrollmentId: string) => {
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
      <button
        onClick={handleEnrollment}
        disabled={isLoading}
        className="btn bg-[#202C45] text-white w-full mt-3"
      >
        {isLoading ? "Processing..." : "Enroll Now"}
      </button>
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
