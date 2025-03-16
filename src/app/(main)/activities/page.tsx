import CodeCompass from "../Components/NewsLAndApp";
import Upcoming from "./_components/Upcoming";
import EventsList from "./_components/EventsList";
import { Suspense } from "react";
import { getEventData } from "@/data/events";
import UpcomingEvents from "./_components/UpcomingEvents";

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

const Activities = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { type } = await searchParams;
  const events = await getEventData(type + "s");

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img
        src="/image/bg2.svg"
        className="absolute right-0 top-1/4 z-0"
        alt=""
      ></img>
      <div className="container relative z-10 flex flex-col items-center gap-5 bg-transparent pt-28 sm:gap-10 sm:pt-[7.5rem]">
        {/* Upcoming Events */}
        <UpcomingEvents />
        <Suspense>
          <EventsList data={events} />
        </Suspense>
        <CodeCompass />
      </div>
    </div>
  );
};

export default Activities;
