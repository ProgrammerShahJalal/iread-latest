"use client";

import React, { FC } from 'react';

interface ClockProps {
  timerDays?: number | null;
  timerHours?: number | null;
  timerMinutes?: number | null;
  timerSeconds?: number | null;
}

const Clock: FC<ClockProps> = ({
  timerDays = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
}) => {
  return (
    <div>
      <div className="flex justify-start items-center gap-2">
        <div>
          <p className='text-4xl'>{timerDays ?? 0}</p>
          <small className='text-white text-xl font-semibold'>Days</small>
        </div>
        <span className='text-4xl'>:</span>
        <div>
          <p className='text-4xl'>{timerHours ?? 0}</p>
          <small className='text-white text-xl font-semibold'>Hours</small>
        </div>
        <span className='text-4xl'>:</span>
        <div>
          <p className='text-4xl'>{timerMinutes ?? 0}</p>
          <small className='text-white text-xl font-semibold'>Minutes</small>
        </div>
        <span className='text-4xl'>:</span>
        <div>
          <p className='text-4xl'>{timerSeconds ?? 0}</p>
          <small className='text-white text-xl font-semibold'>Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default Clock;
