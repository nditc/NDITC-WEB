"use client";

import { useSearchParams } from "next/navigation";
import Event from "../Components/Event";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PiSmileySad } from "react-icons/pi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { GrWorkshop } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";

type Events = {
  data: [
    {
      category: "event" | "workshop";
      details_url: string;
      image_url: string;
      subtitle: string;
      timestamp: number;
      title: string;
    },
  ];
};

const EventsList = ({ data }: { data: any[] }) => {
  const [typeString, setTypeString] = useState<string>("events");
  const type = useSearchParams().get("type");
  const scroll = useSearchParams().get("scroll");

  useEffect(() => {
    if (scroll) {
      document.getElementById("SCROLLHERE")?.scrollIntoView();
    }

    if (
      type != "event" &&
      type != "project" &&
      type != "publication" &&
      type != "workshop"
    ) {
      setTypeString("event");
    } else {
      setTypeString(type);
    }
  }, [type, scroll]);

  return (
    <section className="w-full">
      <div className="my-auto mb-5 flex flex-col justify-between gap-3 lg:mb-6 lg:flex-row lg:gap-8">
        <h1
          className="my-auto ml-1 items-center justify-center self-start text-[2.5rem] leading-none md:justify-start md:text-5xl"
          id="SCROLLHERE"
        >
          <span className="text-blue-500">ALL</span>
          {" " + typeString + "S"}
        </h1>
        <div className="my-auto flex flex-wrap justify-between gap-2 sm:relative sm:justify-start">
          <Link
            href="/activities?type=event&scroll=true"
            type="button"
            className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
              type == "event"
                ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <BsCalendar2EventFill
              className={
                "h-[1.125rem] w-[1.125rem] " +
                (type === "event" ? "text-blue-200" : "text-blue-500")
              }
            />
            Events
          </Link>
          <Link
            href="/activities?type=workshop&scroll=true"
            type="button"
            className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
              type == "workshop"
                ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <GrWorkshop
              className={
                "h-[1.125rem] w-[1.125rem] " +
                (type === "workshop" ? "text-blue-200" : "text-blue-500")
              }
            />
            Workshop
          </Link>
          <Link
            href="/activities?type=project&scroll=true"
            type="button"
            className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
              type == "project"
                ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <FaProjectDiagram
              className={
                "h-[1.125rem] w-[1.125rem] " +
                (type === "project" ? "text-blue-200" : "text-blue-500")
              }
            />
            Projects
          </Link>
          <Link
            href="/activities?type=publication&scroll=true"
            type="button"
            className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 active:outline-none sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
              type == "publication"
                ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <BiSolidBook
              className={
                "h-[1.125rem] w-[1.125rem] " +
                (type === "publication" ? "text-blue-200" : "text-blue-500")
              }
            />
            Publication
          </Link>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="w-full justify-items-center gap-3 grid-fluid-fill-[16.5rem] 2xl:gap-5">
          {data.map((e, i) => {
            return (
              <Event
                title={e.title}
                imageURL={e.image_url || e.images[0]}
                descURL={
                  e.details_url ||
                  "https://nditc.pythonanywhere.com/api/v1/" +
                    type +
                    "s/" +
                    e.id
                }
                isOngoing={e.isUpcoming}
                timestamp={e.timestamp}
                shortDesc={e.short_description}
                key={i}
                type={typeString}
              />
            );
          })}
        </div>
      ) : (
        <div className="my-5 flex min-h-[50vh] w-full flex-col place-items-center justify-center rounded-lg py-5 text-center text-2xl md:rounded-xl">
          <PiSmileySad color={"#3b82f6"} size={150} />
          <p>
            We have <span className="inline text-blue-500">nothing</span>
            <br></br> to show here
          </p>
        </div>
      )}
    </section>
  );
};

interface EventDataFormat {
  title: string;
  description: string;
  imageURL: string;
}

export default EventsList;
