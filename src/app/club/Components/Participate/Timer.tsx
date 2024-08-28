"use client";

import { useEffect, useState } from "react";
import { timeValue } from "../Time";
import { Timestamp } from "firebase/firestore";

const Timer = ({ endTime, onEnd }: { endTime: number; onEnd: () => void }) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(1);

  const calculateTimeLeft = async () => {
    const now = await Date.now();
    const timeLeft = endTime - now;

    setHours(timeValue(Timestamp.fromMillis(timeLeft)).hour - 6);
    setMinutes(timeValue(Timestamp.fromMillis(timeLeft)).minute);
    setSeconds(timeValue(Timestamp.fromMillis(timeLeft)).seconds);

    if (hours <= 0 && minutes <= 0 && seconds <= 5) {
      onEnd();
    }
  };

  useEffect(() => {
    setInterval(() => {
      calculateTimeLeft();
    }, 1000);
  }, []);

  return (
    <div className="flex h-20 w-full items-center justify-center rounded-xl bg-primary p-1">
      <div className="flex h-full w-full items-center justify-center gap-1 rounded-xl bg-white text-primary">
        {hours > 0 && (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-extrabold">{hours}</div>
              <div className="text-base">Hours</div>
            </div>
            <div className="self-start pt-2 font-extrabold">:</div>
          </>
        )}
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold">{minutes}</div>
          <div className="text-base">Minutes</div>
        </div>
        <div className="self-start pt-2 font-extrabold">:</div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold">{seconds}</div>
          <div className="text-base">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
