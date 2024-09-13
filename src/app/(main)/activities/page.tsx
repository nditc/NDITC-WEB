import CodeCompass from "../Components/NewsLAndApp";
import Upcoming from "./Upcoming";
import EventsList from "./EventsList";
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
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const events = await getEventData(searchParams?.type + "s");
  const upcoming = await getEventData("upcoming");

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img
        src="/image/bg2.svg"
        className="absolute right-0 top-1/4 z-0"
        alt=""
      ></img>
      <div className="container relative z-10 flex flex-col items-center gap-5 bg-transparent pt-28 sm:gap-10 sm:pt-[7.5rem]">
        {Array.isArray(upcoming) && upcoming?.length > 0 && upcoming ? (
          <>
            <div className="flex items-end justify-center gap-3 self-start md:justify-start">
              <h1 className="pb-1 text-3xl md:text-5xl">UPCOMING</h1>
              <h1 className="text-5xl text-blue-500 md:text-7xl">EVENT</h1>
            </div>
            <section className="h-fit w-full">
              <Upcoming
                category={upcoming[0].category}
                title={upcoming[0].title}
                description={upcoming[0].short_description}
                actionButtonTitle1="Register"
                actionButtonTitle2="Learn More"
                actionButtonRedirect1="https://init.nditc.net/registration/participant"
                actionButtonRedirect2={upcoming[0].details_url}
                image={upcoming[0].image_url}
                timestamp={upcoming[0].timestamp}
              />
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
