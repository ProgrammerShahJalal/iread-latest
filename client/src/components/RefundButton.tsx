"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const RefundButton = ({
  paymentId,
  userId,
  eventId,
  eventEnrollmentId,
  trxId,
  amount,
  media,
}: {
  paymentId: number;
  userId: number;
  eventId: number;
  eventEnrollmentId: number;
  trxId: string;
  amount: number;
  media?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleRefundRequest = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/event-payment-refunds/store`,
        {
          user_id: userId,
          event_id: eventId,
          event_enrollment_id: eventEnrollmentId,
          event_payment_id: paymentId,
          trx_id: trxId,
          amount: amount,
          media: media,
        }
      );

      toast.success(response.data.message || "Refund request submitted successfully.");
      setRequested(true);
    } catch (error: any) {
      console.error("Error requesting refund:", error);
      toast.error(error.response?.data?.message || "Failed to request refund.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRefundRequest}
        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading || requested}
      >
        {loading ? "Processing..." : "Request Refund"}
      </button>
    </div>
  );
};

export default RefundButton;
