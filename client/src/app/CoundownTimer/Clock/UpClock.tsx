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
          <p className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>{timerDays ?? 0}</p>
          <small className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>Days</small>
        </div>
        <span className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>:</span>
        <div>
          <p className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>{timerHours ?? 0}</p>
          <small className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>Hours</small>
        </div>
        <span className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>:</span>
        <div>
          <p className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>{timerMinutes ?? 0}</p>
          <small className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>Minutes</small>
        </div>
        <span className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>:</span>
        <div>
          <p className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>{timerSeconds ?? 0}</p>
          <small className='font-semibold text-2xl md:text-sm lg:text-xs text-black'>Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default UpClock;
