import CodeCompass from "../Components/NewsLAndApp";
import Upcoming from "./_components/Upcoming";
import EventsList from "./_components/EventsList";
import { Suspense } from "react";

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

const getEventData = async (type: string) => {
  let modifiedType;
  if (type == "projects" || type == "publications") {
    modifiedType = type;
  } else {
    modifiedType = "activities/" + type;
  }
  const res = await fetch(
    "https://nditc.pythonanywhere.com/api/v1/" + modifiedType,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("Problem Occurred");
    return [];
  }
  return res.json();
};
const Activities = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { type } = await searchParams;
  const events = await getEventData(type + "s");
  const upcoming = await getEventData("upcoming");

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img
        src="/image/bg2.svg"
        className="absolute right-0 top-1/4 z-0"
        alt=""
      ></img>
      <div className="container relative z-10 flex flex-col items-center gap-5 bg-transparent pt-28 sm:gap-10 sm:pt-[7.5rem]">
        {/* Upcoming Events */}
        {Array.isArray(upcoming) && upcoming?.length > 0 && upcoming ? (
          <>
            <div className="flex items-end justify-center gap-3 self-start md:justify-start">
              <h1 className="pb-1 text-3xl md:text-5xl">UPCOMING</h1>
              <h1 className="text-5xl text-blue-500 md:text-7xl">EVENT</h1>
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
        <Suspense>
          <EventsList data={events} />
        </Suspense>
        <CodeCompass />
      </div>
    </div>
  );
};

export default Activities;
