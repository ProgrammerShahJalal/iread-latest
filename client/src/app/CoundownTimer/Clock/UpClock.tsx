"use client";

import React, { FC } from 'react';

interface ClockProps {
  timerDays?: number | null;
  timerHours?: number | null;
  timerMinutes?: number | null;
  timerSeconds?: number | null;
}

const UpClock: FC<ClockProps> = ({
  timerDays = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
}) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-2">
        <div>
          <p >{timerDays ?? 0}</p>
          <small >Days</small>
        </div>
        <span >:</span>
        <div>
          <p >{timerHours ?? 0}</p>
          <small >Hours</small>
        </div>
        <span >:</span>
        <div>
          <p >{timerMinutes ?? 0}</p>
          <small >Minutes</small>
        </div>
        <span >:</span>
        <div>
          <p >{timerSeconds ?? 0}</p>
          <small >Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default UpClock;
