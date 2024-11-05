"use client";

import { useSearchParams } from "next/navigation";
import Event from "./Event";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PiSmileySad } from "react-icons/pi";
import Nav from "./EventNav";
import EventNav from "./EventNav";
import Fallback from "../../Components/Fallback";

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
        <EventNav type={type} />
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
                key={(type || "") + i}
                type={typeString}
              />
            );
          })}
        </div>
      ) : (
        // fallback ui
        <Fallback />
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
