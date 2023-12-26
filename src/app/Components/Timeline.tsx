"use client";

import { useState } from "react";

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const timelineData = [
    { time1: "2018", time2: "27 June", data: "" },
    { time1: "2018", time2: "31 June", data: "" },
    { time1: "2018", time2: "23 Nov", data: "" },
    { time1: "2019", time2: "01 June", data: "" },
    { time1: "2024", time2: "Jan 01", data: "" },
  ];
  return (
    <section className="h-96 w-full mb-16 px-10 md:px-32 flex justify-center">
      <div className="flex gap-5">
        <div className="h-full flex flex-col flex-1 justify-center gap-5">
          {timelineData.map((e, i) => {
            return (
              <Time
                time1={e.time1}
                time2={e.time2}
                index={i}
                current={selectedIndex == i}
                setCurrentAsSelected={setSelectedIndex}
                key={i}
              />
            );
          })}
        </div>
        <div className="w-1 h-full bg-gray-400 rounded-3xl gradient-mask-t-70-d" />
      </div>

      <div className="flex-[10] flex justify-center items-center">
        <div className="h-[90%] w-[90%] bg-black rounded-xl shadow-2xl"></div>
      </div>
    </section>
  );
};

export default Timeline;

const Time = ({
  time1,
  time2,
  index,
  current,
  setCurrentAsSelected,
}: {
  time1: string;
  time2: string;
  index: number;
  current: boolean;
  setCurrentAsSelected: (i: number) => void;
}) => {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        setCurrentAsSelected(index);
      }}
    >
      <div className="w-10">
        <h1
          className={`transition-all ${
            current ? "text-2xl" : "text-gray-400 text-xl"
          }`}
        >
          {time1}
        </h1>
        <h1
          className={`transition-all ${
            current ? "text-base" : "text-gray-400 text-sm"
          }`}
        >
          {time2}
        </h1>
      </div>

      <div
        className={`transition-all duration-300 w-5 h-5 rounded-full absolute bg-blue-500 z-10 left-[3.25rem] top-[50%] -translate-y-[50%] flex items-center justify-center shadow-[5px_5px_20px_10px_#00000024] ${
          current ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
  );
};
