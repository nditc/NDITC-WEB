import AboutData from "@/data/about";
import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { PiGraduationCapBold } from "react-icons/pi";

const DataCard = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 md:flex-row lg:w-0 lg:flex-col">
      <div className="grid flex-1 grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-3 rounded-xl bg-gray-100 p-4 text-black sm:grid-cols-[3fr_2fr] lg:h-1/2 lg:p-6">
        <div className="col-span-2 flex gap-3">
          <BsCalendar2EventFill className={"h-11 w-11 text-blue-500"} />
          <div>
            <h3 className="mb-[3.5px] font-Nunito text-2xl font-extrabold leading-none text-blue-500">
              Events
            </h3>
            <p className="text-lg leading-none"> Organized by NDITC</p>
          </div>
        </div>
        <div className="col-start-1 row-start-2 flex flex-col self-end sm:gap-2">
          <p className="flex items-center sm:text-lg lg:text-xl">
            Intra Events
            <span className="ml-3 font-extrabold text-blue-500">
              {AboutData.events.intra}
            </span>
          </p>
          <p className="flex items-center sm:text-lg lg:text-xl">
            National Events
            <span className="ml-3 font-extrabold text-blue-500">
              {AboutData.events.national}
            </span>
          </p>
        </div>
        <div className="col-start-2 row-start-2 self-end justify-self-end text-right">
          <h3 className="mt-4 text-7xl leading-[0.8] text-blue-500 sm:text-8xl lg:text-[10rem]">
            {AboutData.events.national + AboutData.events.intra}
          </h3>
          <p className="flex flex-col justify-end leading-none sm:text-lg lg:flex-row lg:gap-[.325rem] lg:text-xl">
            Total <span>Events</span>
          </p>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-[1fr_auto] grid-rows-2 items-center gap-4 rounded-xl bg-white lg:h-1/2">
        <div className="col-start-1 grid h-full grid-cols-[auto_1fr_auto] items-center rounded-lg bg-gray-100 p-3 lg:gap-3 lg:p-6">
          <MdOutlinePeopleOutline
            className={
              "row-start-1 h-10 w-10 self-end text-blue-500 lg:row-start-1 lg:self-center xl:h-14 xl:w-14"
            }
          />
          <p className="row-start-2 flex flex-col gap-0 leading-[1.3_!important] sm:text-lg lg:row-start-1 xl:text-xl 2xl:flex-row 2xl:gap-[0.375rem]">
            Total <span>Members</span>
          </p>
          <h4 className="row-span-2 justify-self-end text-4xl text-blue-500 lg:row-span-1 xl:text-6xl">
            {AboutData.members}+
          </h4>
        </div>
        <div className="col-start-1 grid h-full grid-cols-[auto_1fr_auto] items-center rounded-lg bg-gray-100 p-3 lg:gap-3 lg:p-6">
          <PiGraduationCapBold
            className={
              "row-start-1 h-10 w-10 self-end text-blue-500 lg:row-start-1 lg:self-center xl:h-14 xl:w-14"
            }
          />
          <p className="row-start-2 flex flex-col gap-0 leading-[1.3_!important] sm:text-lg lg:row-start-1 xl:text-xl 2xl:flex-row 2xl:gap-[0.375rem]">
            Total <span>Alumni</span>
          </p>
          <h4 className="row-span-2 justify-self-end text-4xl text-blue-500 lg:row-span-1 xl:text-6xl">
            {AboutData.alumni}+
          </h4>
        </div>
        <div className="col-start-2 row-span-2 row-start-1 flex aspect-square h-32 w-32 flex-col items-center justify-center rounded-full bg-[conic-gradient(#60a5fa_30%,#3b82f6_75%,#fff_0)] sm:h-40 sm:w-40 2xl:h-44 2xl:w-44">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-center sm:h-36 sm:w-36 2xl:h-40 2xl:w-40">
            <h3 className="text-6xl leading-[.7_!important] text-blue-500 sm:text-7xl 2xl:text-8xl">
              {AboutData.years}
            </h3>
            <p className="text-sm leading-none sm:text-base">
              <span className="text-lg sm:text-2xl">Years</span> <br></br> of
              journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
