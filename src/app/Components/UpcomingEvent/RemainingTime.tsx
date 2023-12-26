"use client";

import { useState, useEffect } from "react";

const RemainingTime = ({ time }: { time: number }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    minutes: 0,
    seconds: 0,
  });
  function getTimeLeft(targetTime: any) {
    // Get the current time and target time
    const currentTime = new Date().getTime();
    const remainingTime = Math.abs(targetTime - currentTime);

    // Calculate the remaining time
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    setTimeLeft({
      days: days,
      minutes: minutes,
      seconds: seconds,
    });
  }
  useEffect(() => {
    setInterval(() => {
      getTimeLeft(time);
    }, 1000);
  }, []);

  return (
    <div className="right-part pt-5">
      <div className="circle1">
        <div className="number text-white">{timeLeft.days}</div>
        <div className="word text-white mix-blend-difference md:text-black">
          Days
        </div>
      </div>
      <div className="circle2">
        <div className="number text-white">{timeLeft.minutes}</div>
        <div className="word text-white mix-blend-difference md:text-black">
          Minutes
        </div>
      </div>
      <div className="circle3">
        <span className="number text-white">{timeLeft.seconds}</span>
        <span className="word text-white mix-blend-difference md:text-black">
          Seconds
        </span>
      </div>
    </div>
  );
};

export default RemainingTime;
