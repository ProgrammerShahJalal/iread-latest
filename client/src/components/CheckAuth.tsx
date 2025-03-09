"use client"; // Mark as a client component

import { useState, useEffect } from "react";

const CheckAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.token && user?.id) {
        setUserId(user.id);
      }
    }
  }, []);

  return userId ? (
    <p className="text-green-500">Authenticated (User ID: {userId})</p>
  ) : (
    <p className="text-red-500">
      You need to log in or register to enroll in this event.
    </p>
  );
};

export default CheckAuth;
