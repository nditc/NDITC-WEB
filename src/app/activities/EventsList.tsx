"use client";

import { useSearchParams } from "next/navigation";
import Event from "../Components/Event";
import { useEffect, useState } from "react";
import Link from "next/link";

const EventsList = () => {
  const EventData: EventDataFormat[] = [
    {
      title: "Title of something",
      description:
        "This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.",
      imageURL:
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Title of something",
      description:
        "This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.",
      imageURL:
        "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Title of something",
      description:
        "This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.",
      imageURL:
        "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Title of something",
      description:
        "This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.",
      imageURL:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Title of something",
      description:
        "This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.",
      imageURL:
        "https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Title of something",
      description:
        "This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.",
      imageURL:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const [typeString, setTypeString] = useState<any>("events");

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
          className={`bg-white border font-Nunito font-bold border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-all hover:scale-105 ${
            type == "event" ? "text-blue-500" : "text-black"
          }`}
        >
          Events
        </Link>
        <Link
          href="/activities?type=workshop"
          type="button"
          className={`bg-white border font-Nunito font-bold border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-all hover:scale-105 ${
            type == "workshop" ? "text-blue-500" : "text-black"
          }`}
        >
          Workshop
        </Link>

        <Link
          href="/activities?type=project"
          type="button"
          className={`bg-white border font-Nunito font-bold border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-all hover:scale-105 ${
            type == "project" ? "text-blue-500" : "text-black"
          }`}
        >
          Projects
        </Link>

        <Link
          href="/activities?type=publication"
          type="button"
          className={`bg-white border font-Nunito font-bold border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-all hover:scale-105 ${
            type == "publication" ? "text-blue-500" : "text-black"
          }`}
        >
          Publication
        </Link>
      </div>
      <div className="flex gap-3 ml-1 mt-8 items-end justify-center self-start md:justify-start pb-7">
        <h1 className="text-3xl md:text-5xl text-blue-600">ALL</h1>
        <h1 className="text-3xl md:text-5xl">{typeString + "S"}</h1>
      </div>

      <div className="grid-fluid-fill-[19rem]  gap-5 md:gap-8 justify-items-center w-full">
        {EventData.map((e, i) => {
          return (
            <Event
              title={e.title}
              description={e.description}
              imageURL={e.imageURL}
              key={i}
            />
          );
        })}
      </div>
    </section>
  );
};

interface EventDataFormat {
  title: string;
  description: string;
  imageURL: string;
}

export default EventsList;
