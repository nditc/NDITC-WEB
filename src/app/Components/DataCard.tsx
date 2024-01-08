import React from 'react';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { MdOutlinePeopleOutline } from 'react-icons/md';
import { PiGraduationCapBold } from 'react-icons/pi';
const DataCard = () => {
  return (
    <div className="flex-1   w-full lg:w-0  flex flex-col md:flex-row lg:flex-col  gap-4">
      <div className="lg:h-1/2 flex-1 shadow-lg bg-[#1A6EFF] rounded-xl grid grid-cols-[1fr_auto] sm:grid-cols-[3fr_2fr] grid-rows-[auto_1fr] p-4 lg:p-6 text-white gap-3">
        <div className="col-span-2 flex gap-3">
          <BsCalendar2EventFill className={'w-11 h-11'} />
          <div>
            <h3 className="text-2xl leading-none mb-[3.5px] font-Nunito font-extrabold">Events</h3>
            <p className="text-lg leading-none "> Organized by NDITC</p>
          </div>
        </div>
        <div className="col-start-1 row-start-2 self-end flex flex-col sm:gap-2">
          <p className="sm:text-lg lg:text-xl flex items-center">
            Intra Events
            <span className="ml-3 font-extrabold">14</span>
          </p>
          <p className="sm:text-lg lg:text-xl flex items-center">
            National Events
            <span className="ml-3 font-extrabold">6</span>
          </p>
        </div>
        <div className="col-start-2 row-start-2 justify-self-end self-end text-right">
          <h3 className="text-7xl sm:text-8xl mt-4 lg:text-[10rem]  leading-[0.8]">20</h3>
          <p className="flex justify-end flex-col lg:gap-[.325rem] lg:flex-row sm:text-lg lg:text-xl leading-none ">
            Total <span>Events</span>
          </p>
        </div>
      </div>
      <div className="lg:h-1/2 flex-1 shadow-lg  bg-white grid grid-rows-2 grid-cols-[1fr_auto] p-3 lg:p-6 gap-4 rounded-xl items-center">
        <div className="bg-gray-100 h-full rounded-lg col-start-1 grid grid-cols-[auto_1fr_auto] p-3 lg:p-6 items-center lg:gap-3">
          <MdOutlinePeopleOutline
            className={
              'row-start-1 self-end lg:self-center lg:row-start-1  w-10 xl:w-14 h-10 xl:h-14 text-blue-500'
            }
          />
          <p className="row-start-2 lg:row-start-1  sm:text-lg xl:text-xl leading-[1.3_!important] gap-0 2xl:gap-[0.375rem] flex flex-col 2xl:flex-row">
            Total <span>Members</span>
          </p>
          <h4 className="row-span-2 justify-self-end  lg:row-span-1 text-4xl xl:text-6xl text-blue-500">
            286
          </h4>
        </div>
        <div className="bg-gray-100 h-full rounded-lg col-start-1 grid grid-cols-[auto_1fr_auto] p-3 lg:p-6 items-center lg:gap-3">
          <PiGraduationCapBold
            className={
              'row-start-1 self-end lg:self-center lg:row-start-1  w-10 xl:w-14 h-10 xl:h-14 text-blue-500'
            }
          />
          <p className="row-start-2 lg:row-start-1  sm:text-lg xl:text-xl leading-[1.3_!important] gap-0 2xl:gap-[0.375rem] flex flex-col 2xl:flex-row">
            Total <span>Alumni</span>
          </p>
          <h4 className="row-span-2 justify-self-end  lg:row-span-1 text-4xl xl:text-6xl text-blue-500">
            2472
          </h4>
        </div>
        <div className="col-start-2 bg-[conic-gradient(#60a5fa_30%,#3b82f6_75%,#fff_0)]  row-start-1 row-span-2 w-32 sm:w-40 2xl:h-48 h-32 sm:h-40 2xl:w-48 rounded-full aspect-square flex flex-col justify-center items-center ">
          <div className="bg-white  text-center  rounded-full w-28 sm:w-36 2xl:w-44 h-28 sm:h-36 2xl:h-44 flex flex-col justify-center items-center">
            <h3 className="leading-[.7_!important] text-6xl sm:text-7xl 2xl:text-8xl  text-blue-500">
              6
            </h3>
            <p className="leading-none text-sm sm:text-base">
              <span className="text-lg sm:text-2xl ">Years</span> <br></br> of journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
