"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import UpClock from "./Clock/UpClock";

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

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!events.length) return;

    // Get the upcoming session date
    let dateTill = events.reduce((prev, curr) => {
      return curr.session_start_date_time > prev.session_start_date_time
        ? curr
        : prev;
    }, events[0])?.session_start_date_time;

    const countDownDate = new Date(dateTill).getTime();

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
