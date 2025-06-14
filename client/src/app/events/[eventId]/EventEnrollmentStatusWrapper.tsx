"use client";

import { useState, useEffect } from 'react';
import EventEnrollProcess from '../../../components/EventEnrollProcess';
import apiClient from '../../../lib/apiClient';

interface EventEnrollmentStatusWrapperProps {
  eventId: number;
  eventPrice: number;
  isRegistrationOpen: boolean;
}

const EventEnrollmentStatusWrapper: React.FC<EventEnrollmentStatusWrapperProps> = ({
  eventId,
  eventPrice,
  isRegistrationOpen,
}) => {
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingEnrollmentStatus, setIsLoadingEnrollmentStatus] = useState<boolean>(true);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        if (userData && userData.id) {
          setUserId(String(userData.id));
        } else {
          console.error("User ID not found in localStorage data (user.id).");
          setIsLoadingEnrollmentStatus(false); 
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        setIsLoadingEnrollmentStatus(false);
      }
    } else {
      // User data not found, not an error, just means user isn't logged in or data isn't stored as 'user'
      setIsLoadingEnrollmentStatus(false);
    }
  }, []);

  useEffect(() => {
    if (!isRegistrationOpen) {
      setIsLoadingEnrollmentStatus(false);
      setIsEnrolled(false); 
      return;
    }

    if (userId && eventId) {
      setIsLoadingEnrollmentStatus(true);
      const url = `${apiClient.defaults.baseURL}/api/v1/event-enrollments/check?eventId=${eventId}&userId=${userId}`;
      
      apiClient.get(url)
        .then(response => {
          if (response.data && typeof response.data.isEnrolled === 'boolean') {
            setIsEnrolled(response.data.isEnrolled);
          } else {
            console.error("Invalid response structure from enrollment check API. Expected { isEnrolled: boolean }.", response.data);
            setIsEnrolled(false); 
          }
        })
        .catch(error => {
          console.error("Error fetching enrollment status:", error.response ? error.response.data : error.message);
          if (error.response && error.response.status === 404) {
            setIsEnrolled(false); 
          } else {
            setIsEnrolled(false);
          }
        })
        .finally(() => {
          setIsLoadingEnrollmentStatus(false);
        });
    } else {
      if (isRegistrationOpen) { // Only if registration is open, otherwise the first check handles it.
        // Not an error if userId is not available (e.g. user not logged in)
      }
      setIsLoadingEnrollmentStatus(false);
      setIsEnrolled(false);
    }
  }, [userId, eventId, isRegistrationOpen]);

  if (!isRegistrationOpen) {
    return (
      <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p className="font-bold">Registration Closed</p>
        <p>This event&apos;s registration period has ended.</p>
      </div>
    );
  }

  if (isLoadingEnrollmentStatus) {
    return <p className="mt-4 p-4">Checking enrollment status...</p>;
  }

  if (isEnrolled) {
    return (
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        <p className="font-bold">Enrolled</p>
        <p>You are enrolled in this event.</p>
      </div>
    );
  }
  
  return (
    <EventEnrollProcess
      eventId={eventId}
      eventPrice={eventPrice}
    />
  );
};

export default EventEnrollmentStatusWrapper;
