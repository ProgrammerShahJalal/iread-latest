"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Clock from './Clock/Clock';

interface CountdownTimerProps {
  offerTill: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ offerTill }) => {
  const [timerDays, setTimerDays] = useState<number | null>(null);
  const [timerHours, setTimerHours] = useState<number | null>(null);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    const countDownDate = new Date(offerTill).getTime();

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
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
  }, [offerTill]);

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

  return (
    <div className="text-sm">
      <Clock
        timerDays={timerDays}
        timerHours={timerHours}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
      />
    </div>
  );
};

export default CountdownTimer;
