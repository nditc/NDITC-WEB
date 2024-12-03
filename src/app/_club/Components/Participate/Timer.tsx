"use client";

import { useEffect, useState } from "react";
import { timeValue } from "../Time";
import { Timestamp } from "firebase/firestore";
import Countdown from "react-countdown";

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
  return (
    <div className="Inter inline-flex h-20 items-center justify-start rounded-xl">
      <Countdown
        date={endTime - 10000}
        intervalDelay={0}
        precision={3}
        onComplete={() => {
          if (!submitClicked) {
            onEnd();
          }
          setSubmitClicked(true);
        }}
        renderer={(props) => (
          <div className="flex h-full items-center justify-start gap-1 rounded-xl text-primary">
            {props.hours > 0 && (
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-3xl font-extrabold">{props.hours}</div>
                  <div className="text-base">Hours</div>
                </div>
                <div className="self-start pt-2 font-extrabold">:</div>
              </>
            )}
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-extrabold">{props.minutes}</div>
              <div className="text-base">Minutes</div>
            </div>
            <div className="self-start pt-2 font-extrabold">:</div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-extrabold">{props.seconds}</div>
              <div className="text-base">Seconds</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Timer;
