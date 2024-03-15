'use client';

import { useState, useEffect } from 'react';

const RemainingTime = ({ time }: { time: number }) => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
  });
  function getTimeLeft(targetTime: any) {
    // Get the current time and target time
    const currentTime = new Date().getTime();
    const remainingTime = Math.abs(targetTime * 1000 - currentTime);

    // Calculate the remaining time
    const months = remainingTime / (1000 * 60 * 60 * 24 * 30);
    const days = (remainingTime / (1000 * 60 * 60 * 24)) % 30;
    const hours = (remainingTime / (1000 * 60 * 60)) % 24;

    setTimeLeft({
      months: months,
      days: days,
      hours: hours,
    });
  }
  useEffect(() => {
    setInterval(() => {
      getTimeLeft(time);
    }, 1000);
  }, []);

  return (
    <div className="right-part pt-5 ml-5 md:ml-0">
      <div className="circle1">
        <div className="number text-white">{Math.floor(timeLeft.months)}</div>
        <div className="word text-white">Months</div>
      </div>
      <div className="circle2">
        <div className="number text-white">{Math.floor(timeLeft.days)}</div>
        <div className="word text-white">Days</div>
      </div>
      <div className="circle3">
        <span className="number text-white">{Math.floor(timeLeft.hours)}</span>
        <span className="word text-white">Hours</span>
      </div>
    </div>
  );
};

export default RemainingTime;
