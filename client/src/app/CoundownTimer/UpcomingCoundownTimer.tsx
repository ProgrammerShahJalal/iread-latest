"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import UpClock from "./Clock/UpClock";
import { Event } from "@/types/event";
import Link from "next/link";

interface UpcomingCountdownTimerProps {
  events: Event[];
}

const UpcomingCountdownTimer: React.FC<UpcomingCountdownTimerProps> = ({
  events,
}) => {
  const [timerDays, setTimerDays] = useState<number>(0);
  const [timerHours, setTimerHours] = useState<number>(0);
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventId, setEventId] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!events.length) return;

    // Find the upcoming event
    const upcomingEvent = events.reduce((prev, curr) => {
      return curr.reg_end_date > prev.reg_end_date
        ? curr
        : prev;
    }, events[0]);

    setEventTitle(upcomingEvent.title);
    setEventId(upcomingEvent?.event_id);

    const countDownDate = new Date(upcomingEvent.reg_end_date).getTime();

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        // Optional: Set all values to 0 if time is up
        setTimerDays(0);
        setTimerHours(0);
        setTimerMinutes(0);
        setTimerSeconds(0);
      } else {
        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor(
          (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
        const seconds = Math.floor((distance % (60 * 1000)) / 1000);

        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }, [events]);

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

  return (
    <div>
      {eventTitle && <h3><strong>Next Up: </strong><Link className="text-[#138E6B] hover:text-[#206a55] font-semibold" href={`/events/${eventId}`}>{eventTitle.slice(0, 24)}{eventTitle?.length > 22 && '..'}</Link></h3>}
      <UpClock
        timerDays={timerDays}
        timerHours={timerHours}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
      />
    </div>
  );
};

export default UpcomingCountdownTimer;
