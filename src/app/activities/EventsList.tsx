"use client";

import { useSearchParams } from "next/navigation";
import Event from "../Components/Event";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PiSmileySad } from "react-icons/pi";

type Events = {
  data: [
    {
      category: "event" | "workshop";
      details_url: string;
      image_url: string;
      subtitle: string;
      timestamp: number;
      title: string;
    }
  ];
};

const EventsList = ({ data }: { data: any[] }) => {
  const [typeString, setTypeString] = useState<string>("events");
  const type = useSearchParams().get("type");

  useEffect(() => {
    if (
      type != "events" &&
      type != "project" &&
      type != "publication" &&
      type != "workshop"
    ) {
      setTypeString("event");
    } else {
      setTypeString(type);
    }
  }, [type]);

  return (
    <section className="w-full">
      <div className="flex gap-3 mb-9 flex-wrap w-full">
        <Link
          href="/activities?type=event"
          type="button"
          className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors  ${
            type == "event" ? "text-blue-500" : "text-black"
          }`}
        >
          Events
        </Link>
        <Link
          href="/activities?type=workshop"
          type="button"
          className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors  ${
            type == "workshop" ? "text-blue-500" : "text-black"
          }`}
        >
          Workshop
        </Link>

        <Link
          href="/activities?type=project"
          type="button"
          className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors  ${
            type == "project" ? "text-blue-500" : "text-black"
          }`}
        >
          Projects
        </Link>

        <Link
          href="/activities?type=publication"
          type="button"
          className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none active:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors  ${
            type == "publication" ? "text-blue-500" : "text-black"
          }`}
        >
          Publication
        </Link>
      </div>
      <div className="flex gap-3 ml-1 mt-8 items-end justify-center self-start md:justify-start pb-7">
        <h1 className="text-3xl md:text-5xl text-blue-500">ALL</h1>
        <h1 className="text-3xl md:text-5xl">{typeString + "S"}</h1>
      </div>

      {data.length > 0 ? (
        <div className="grid-fluid-fill-[16.5rem] gap-3  2xl:gap-5 justify-items-center w-full">
          {data.map((e, i) => {
            return (
              <Event
                title={e.title}
                imageURL={e.image_url}
                descURL={e.details_url}
                timestamp={e.timestamp}
                shortDesc={e.short_description}
                key={i}
                type={typeString}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid place-items-center w-full text-2xl my-5  py-5 rounded-xl text-center">
          <PiSmileySad color={"#3b82f6"} size={150} />
          <p>
            We have <span className="text-blue-500 inline">nothing</span>
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
