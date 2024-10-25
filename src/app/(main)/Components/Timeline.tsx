"use client";

import timelineData from "@/data/timeline";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [currentTitle, setCurrentTitle] = useState(timelineData[0].title);

  const [currentDescription, setCurrentDescription] = useState(
    timelineData[0].description,
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollTo({ top: selectedIndex * (16 * 5) });
  }, [selectedIndex]);

  const [currentImage, setCurrentImage] = useState(timelineData[0].imgURL);

  const setCurrentData = (i: number) => {
    setSelectedIndex(i);
  };
  useEffect(() => {
    const s = setInterval(() => {
      setSelectedIndex((s) => {
        if (s === timelineData.length - 1) {
          return 0;
        } else {
          return s + 1;
        }
      });
    }, 4000);

    return () => {
      clearInterval(s);
    };
  }, [timelineData.length]);
  useEffect(() => {
    setCurrentTitle(timelineData[selectedIndex].title);
    setCurrentDescription(timelineData[selectedIndex].description);
    setCurrentImage(timelineData[selectedIndex].imgURL);
  }, [selectedIndex]);

  return (
    <section className="relative flex w-full flex-1 flex-col justify-center gap-2 md:flex-row md:gap-0 lg:w-0">
      <div className="hidden max-h-[600px] flex-col gap-2 overflow-y-clip overflow-x-visible md:flex md:flex-row">
        <div
          style={{
            top: (4 - selectedIndex) * 4.5 * 16,
          }}
          className="relative flex h-full flex-1 flex-row justify-start scrollbar-hide md:flex-col"
        >
          {timelineData.map((e, i) => {
            return (
              <Time
                time1={e.time1}
                time2={e.time2}
                index={i}
                current={selectedIndex == i}
                setCurrentAsSelected={setCurrentData}
                key={i}
              />
            );
          })}
        </div>
        <div className="my-auto hidden h-1 w-full rounded-3xl bg-gray-400 md:flex md:h-4/5 md:w-1 md:gradient-mask-t-90-d" />
      </div>

      <div className="relative my-auto flex h-[600px] items-center justify-center md:ml-6 md:flex-[10]">
        <div className="grid h-full w-full grid-rows-[auto_auto_1fr] items-stretch justify-items-start gap-5 rounded-xl bg-white pb-1 pt-4">
          <div className="mt-2 flex w-full items-center justify-between gap-2 md:mt-0 md:justify-start">
            <MdKeyboardArrowUp
              onClick={() => {
                if (selectedIndex > 0) {
                  setSelectedIndex(selectedIndex - 1);
                }
              }}
              className={`h-10 w-10 -rotate-90 cursor-pointer rounded-full p-2 transition-all md:rotate-0 ${
                selectedIndex > 0
                  ? "scale-100 bg-gray-200 hover:bg-blue-100 hover:text-blue-500"
                  : "bg-gray-100 text-gray-500"
              }`}
            />
            <p className="flex flex-col items-center text-base font-bold md:order-3 md:flex-row md:gap-[0.375rem] md:text-xl">
              <span className="Bebas text-3xl font-normal leading-none text-blue-500 md:font-Nunito md:text-xl md:font-extrabold">
                {timelineData[selectedIndex].time1}{" "}
              </span>
              {timelineData[selectedIndex].time2}
            </p>
            <MdKeyboardArrowDown
              onClick={() => {
                if (selectedIndex < timelineData.length - 1) {
                  setSelectedIndex(selectedIndex + 1);
                }
              }}
              className={`] z-20 h-10 w-10 -rotate-90 cursor-pointer rounded-full p-2 transition-all md:rotate-0 ${
                selectedIndex < timelineData.length - 1
                  ? "scale-100 bg-gray-200 hover:bg-blue-100 hover:text-blue-500"
                  : "bg-gray-100 text-gray-500"
              }`}
            />
          </div>
          <div className="flex-col gap-5">
            <h1 className="text-left text-3xl md:text-4xl">{currentTitle}</h1>
            <p>{currentDescription}</p>
          </div>
          <div className="flex overflow-hidden rounded-[.75rem]">
            <img
              src={currentImage}
              alt="Image"
              className="h-full flex-1 rounded-[.75rem] object-cover"
              width={720}
              height={720}
            />
          </div>
        </div>
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
      className={`relative cursor-pointer ${current ? "" : "hidden"} mb-1 md:mb-0 md:flex`}
      onClick={() => {
        setCurrentAsSelected(index);
      }}
    >
      <div className="h-[4.5rem] w-16">
        <h1
          className={`transition-all ${
            current
              ? "text-3xl text-blue-500"
              : "scale-85 text-2xl text-gray-400"
          }`}
        >
          {time1}
        </h1>
        <p
          className={`transition-all ${
            current ? "text-base font-bold" : "scale-85 text-sm text-gray-400"
          }`}
        >
          {time2}
        </p>
      </div>

      <div
        className={`absolute left-[50%] top-[4.25rem] z-10 hidden h-5 w-5 -translate-x-[50%] items-center justify-center rounded-full bg-blue-500 shadow-[5px_5px_20px_10px_#00000024] transition-all duration-300 md:left-[4rem] md:top-[50%] md:flex md:-translate-y-[50%] md:translate-x-0 ${
          current ? "scale-100" : "scale-0"
        }`}
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </div>
    </div>
  );
};
