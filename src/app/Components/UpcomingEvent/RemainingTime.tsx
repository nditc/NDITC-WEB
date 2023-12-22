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
    const remainingTime = targetTime - currentTime;

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
    <div className="right-part">
      <div className="circle1">
        <div className="number">{timeLeft.days}</div>
        <div className="word">Days</div>
      </div>
      <div className="circle2">
        <div className="number">{timeLeft.minutes}</div>
        <div className="word">Minutes</div>
      </div>
      <div className="circle3">
        <span className="number">{timeLeft.seconds}</span>
        <span className="word">Seconds</span>
      </div>
    </div>
  );
};

export default RemainingTime;
