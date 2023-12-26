"use client";

import Image from "next/image";
import { useState } from "react";

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const timelineData = [
    {
      time1: "2018",
      time2: "27 June",
      title: "CLUB STARTED",
      description:
        "Born in 2018, NDITC sprouted at Notre Dame College to nurture tech talent and bridge the gap between knowledge and innovation.",
      imgURL: "/Timeline.png",
    },
    { time1: "2018", time2: "31 June", title: "", description: "", imgURL: "" },
    { time1: "2018", time2: "23 Nov", title: "", description: "", imgURL: "" },
    { time1: "2019", time2: "01 June", title: "", description: "", imgURL: "" },
    { time1: "2024", time2: "Jan 01", title: "", description: "", imgURL: "" },
  ];

  const [currentTitle, setCurrentTitle] = useState(timelineData[0].title);

  const [currentDescription, setCurrentDescription] = useState(
    timelineData[0].description
  );

  const [currentImage, setCurrentImage] = useState(timelineData[0].imgURL);

  const setCurrentData = (i: number) => {
    setSelectedIndex(i);
    setCurrentTitle(timelineData[i].title);
    setCurrentDescription(timelineData[i].description);
    setCurrentImage(timelineData[i].imgURL);
  };

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
                setCurrentAsSelected={setCurrentData}
                key={i}
              />
            );
          })}
        </div>
        <div className="w-1 h-full bg-gray-400 rounded-3xl gradient-mask-t-70-d" />
      </div>

      <div className="flex-[10] flex justify-center items-center">
        <div className="h-[90%] w-[90%] rounded-xl shadow-[020px_20px_20px_10px_#00000024] flex flex-col md:flex-row items-center justify-center gap-5 px-[1rem]">
          <div className="gap-5 flex-col">
            <h1 className="text-5xl">{currentTitle}</h1>
            <p>{currentDescription}</p>
          </div>
          <Image
            src={currentImage}
            alt="Image"
            className="w-full h-[90%] rounded-[.75rem] object-cover"
            width={1024}
            height={1024}
          />
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
