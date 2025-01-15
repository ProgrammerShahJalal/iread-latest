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
          <p className='text-2xl md:text-sm lg:text-xs'>{timerDays ?? 0}</p>
          <small className='text-2xl md:text-sm lg:text-xs'>Days</small>
        </div>
        <span className='text-2xl md:text-sm lg:text-xs'>:</span>
        <div>
          <p className='text-2xl md:text-sm lg:text-xs'>{timerHours ?? 0}</p>
          <small className='text-2xl md:text-sm lg:text-xs'>Hours</small>
        </div>
        <span className='text-2xl md:text-sm lg:text-xs'>:</span>
        <div>
          <p className='text-2xl md:text-sm lg:text-xs'>{timerMinutes ?? 0}</p>
          <small className='text-2xl md:text-sm lg:text-xs'>Minutes</small>
        </div>
        <span className='text-2xl md:text-sm lg:text-xs'>:</span>
        <div>
          <p className='text-2xl md:text-sm lg:text-xs'>{timerSeconds ?? 0}</p>
          <small className='text-2xl md:text-sm lg:text-xs'>Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default UpClock;
