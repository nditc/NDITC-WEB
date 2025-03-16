import React from "react";
import Upcoming from "./Upcoming";
import { getEventData } from "@/data/events";

const UpcomingEvents = async () => {
  const upcoming = await getEventData("upcoming");

  return (
    <>
      {Array.isArray(upcoming) && upcoming?.length > 0 && upcoming ? (
        <>
          <div className="mb-4 flex items-end justify-center gap-3 self-start md:justify-start">
            <h1 className="pb-1 text-3xl md:text-5xl">UPCOMING</h1>
            <h1 className="text-5xl text-blue-500 md:text-7xl">EVENTS</h1>
          </div>
          <section className="mb-8 flex h-fit w-full flex-col gap-8">
            {upcoming.map((d, ind) => {
              return (
                <Upcoming
                  key={ind}
                  category={d.category}
                  title={d.title}
                  description={d.short_description}
                  actionButtonTitle1="Learn More"
                  actionButtonRedirect1={d.details_url}
                  image={d.image_url}
                  timestamp={d.timestamp}
                />
              );
            })}
          </section>
        </>
      ) : null}
    </>
  );
};

export default UpcomingEvents;
