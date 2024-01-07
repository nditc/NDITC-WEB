'use client';

import { useEffect, useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const timelineData = [
    {
      time1: '2018',
      time2: '01 Jan',
      title: 'Our journey began',
      description:
        'Born in 2018, NDITC sprouted at Notre Dame College to nurture tech talent and bridge the gap between knowledge and innovation.',
      imgURL: '/image/timeline/1.jpg',
    },
    {
      time1: '2018',
      time2: '21 Mar',
      title: 'College Robotics Contest Winner',
      description:
        'Our first achievement came when we won the 1st robotics competition for college organized by campusbd.net with a price of 1 lakh taka.',
      imgURL: '/image/timeline/Timeline.png',
    },
    {
      time1: '2018',
      time2: '23 Nov',
      title: 'INIT 2018: Our very first national event',
      description:
        'We successfully organized our first event ``NDITC_init 2018`` with 11 different segments.',
      imgURL: '/image/timeline/3.jpg',
    },
    {
      time1: '2019',
      time2: '09 Aug',
      title: 'Tinker, First non-human member, was born',
      description: 'The first robot of our club.',
      imgURL: '/image/timeline/4.jpg',
    },
    {
      time1: '2023',
      time2: '03 Apr',
      title: 'Our AI project, EVYA.AI',
      description:
        'Our R&D team developed a Face Recognition application for our AI project named ‘EVYA.AI’ using the Python programming language.',
      imgURL: '/image/timeline/5.jpg',
    },
    {
      time1: '2023',
      time2: '16 May',
      title: 'Publishing First Monthly Newsletter',
      description:
        'In order to keep ourselves updated about our club activities, trending tech stories and sharing resources, we published our first monthly newsletter ``Code Compass``.',
      imgURL: '/image/timeline/6.jpg',
    },
    {
      time1: '2023',
      time2: '15 Jun',
      title: 'Official Android app was launched',
      description: 'We published an android application to attend many club purposes.',
      imgURL: '/image/timeline/7.jpg',
    },
    {
      time1: '2023',
      time2: '29 Nov',
      title: 'First wall magazine',
      description: "We launched our first wall magazine at the fresher's ceremony",
      imgURL: '/image/timeline/8.jpg',
    },
  ];

  const [currentTitle, setCurrentTitle] = useState(timelineData[0].title);

  const [currentDescription, setCurrentDescription] = useState(timelineData[0].description);

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
    <section className="w-full lg:w-0 flex-1 gap-2 md:gap-0 flex flex-col md:flex-row justify-center relative">
      <MdKeyboardArrowUp
        onClick={() => {
          if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
        }}
        className={`w-10 h-10 cursor-pointer absolute top-2 left-0  z-20 -rotate-90 md:left-auto md:rotate-0 md:-top-2 transition-all ${
          selectedIndex > 0 ? 'scale-110 hover:scale-150' : 'text-gray-500 scale-90'
        }`}
      />
      <MdKeyboardArrowDown
        onClick={() => {
          if (selectedIndex < timelineData.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
        }}
        className={`w-10 h-10 cursor-pointer absolute top-2 md:top-[unset]  z-20  right-0 -rotate-90 md:right-auto md:rotate-0 md:-bottom-2 transition-all ${
          selectedIndex < timelineData.length - 1
            ? 'scale-110 hover:scale-150'
            : 'text-gray-500 scale-90'
        }`}
      />
      <div className="flex flex-col md:flex-row gap-5">
        <div className="h-full flex flex-row md:flex-col flex-1 justify-center gap-5">
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
        <div className="h-1 w-full md:w-1 md:h-full bg-gray-400 rounded-3xl md:gradient-mask-t-90-d hidden md:flex" />
      </div>

      <div className="flex-[10] my-auto  md:ml-10 h-full  flex justify-center items-center relative">
        <div className="w-full  bg-white rounded-xl shadow-xl grid grid-rows-[1fr_280px] items-stretch justify-items-start gap-5 p-4 md:p-6">
          <div className="gap-5 flex-col">
            <h1 className="text-3xl md:text-4xl text-left">{currentTitle}</h1>
            <p>{currentDescription}</p>
          </div>
          <img
            src={currentImage}
            alt="Image"
            className="w-full h-full max-h-[280px] rounded-[.75rem] object-cover"
            width={720}
            height={720}
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
      className={`relative cursor-pointer ${current ? '' : 'hidden'} md:flex mb-1 md:mb-0`}
      onClick={() => {
        setCurrentAsSelected(index);
      }}
    >
      <div className="w-16">
        <h1
          className={`transition-all ${
            current ? 'text-3xl text-blue-500' : 'text-gray-400 text-2xl'
          }`}
        >
          {time1}
        </h1>
        <p
          className={`transition-all  ${current ? 'text-base font-bold' : 'text-gray-400 text-sm'}`}
        >
          {time2}
        </p>
      </div>

      <div
        className={`hidden transition-all duration-300 w-5 h-5 rounded-full absolute bg-blue-500 z-10 left-[50%] -translate-x-[50%] top-[4.25rem] md:translate-x-0 md:left-[4.75rem] md:top-[50%] md:-translate-y-[50%] md:flex items-center justify-center shadow-[5px_5px_20px_10px_#00000024] ${
          current ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
  );
};
