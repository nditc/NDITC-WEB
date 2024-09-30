"use client";

import { useEffect, useState } from "react";
import { timeValue } from "../Time";
import { Timestamp } from "firebase/firestore";

const Timer = ({
  currentTime,
  endTime,
  onEnd,
  submitClicked,
  setSubmitClicked,
}: {
  currentTime: number;
  endTime: number;
  onEnd: () => void;
  submitClicked: boolean;
  setSubmitClicked: (value: boolean) => void;
}) => {
  const [timeL, setTimeL] = useState(endTime - currentTime);
  const [clicked, setClicked] = useState(false);

  const calculateTimeLeft = () => {
    setTimeL((prev) => prev - 1000);

    if (
      timeValue(Timestamp.fromMillis(timeL)).hour - 6 <= 0 &&
      timeValue(Timestamp.fromMillis(timeL)).minute <= 0 &&
      timeValue(Timestamp.fromMillis(timeL)).seconds <= 15 &&
      !clicked
    ) {
      setSubmitClicked(true);
      setClicked(true);
      console.log("Hi");
      onEnd();
    }

    /*
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
    }*/
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeL > 0) {
        calculateTimeLeft();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Inter inline-flex h-20 items-center justify-start rounded-xl">
      <div className="flex h-full items-center justify-start gap-1 rounded-xl text-primary">
        {timeValue(Timestamp.fromMillis(timeL)).hour - 6 > 0 && (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-extrabold">
                {timeValue(Timestamp.fromMillis(timeL)).hour - 6}
              </div>
              <div className="text-base">Hours</div>
            </div>
            <div className="self-start pt-2 font-extrabold">:</div>
          </>
        )}
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold">
            {timeValue(Timestamp.fromMillis(timeL)).minute}
          </div>
          <div className="text-base">Minutes</div>
        </div>
        <div className="self-start pt-2 font-extrabold">:</div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold">
            {timeValue(Timestamp.fromMillis(timeL)).seconds}
          </div>
          <div className="text-base">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
