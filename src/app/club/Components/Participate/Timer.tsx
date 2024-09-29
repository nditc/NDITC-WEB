"use client";

import { useEffect, useState } from "react";
import { timeValue } from "../Time";
import { Timestamp } from "firebase/firestore";

const Timer = ({
  endTime,
  onEnd,
  submitClicked,
  setSubmitClicked,
}: {
  endTime: number;
  onEnd: () => void;
  submitClicked: boolean;
  setSubmitClicked: (value: boolean) => void;
}) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(1);

  const calculateTimeLeft = async () => {
    const now = await Date.now();
    const timeLeft = endTime - now;

    setHours(timeValue(Timestamp.fromMillis(timeLeft)).hour - 6);
    setMinutes(timeValue(Timestamp.fromMillis(timeLeft)).minute);
    setSeconds(timeValue(Timestamp.fromMillis(timeLeft)).seconds);

    if (
      timeValue(Timestamp.fromMillis(timeLeft)).hour - 6 <= 0 &&
      timeValue(Timestamp.fromMillis(timeLeft)).minute <= 0 &&
      timeValue(Timestamp.fromMillis(timeLeft)).seconds <= 15 &&
      !submitClicked
    ) {
      setSubmitClicked(true);
      console.log("Hi");
      onEnd();
    }
  };

  useEffect(() => {
    setInterval(() => {
      calculateTimeLeft();
    }, 1000);
  }, []);

  return (
    <div className="Inter inline-flex h-20 items-center justify-start rounded-xl">
      <div className="flex h-full items-center justify-start gap-1 rounded-xl text-primary">
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
