import CodeCompass from '../Components/NewsLAndApp';
import Upcoming from '../Components/UpcomingEvent/Upcoming';
import EventsList from './EventsList';

type Events = {
  data: [
    {
      category: 'event' | 'workshop';
      details_url: string;
      image_url: string;
      subtitle: string;
      timestamp: number;
      title: string;
    }
  ];
};

const getEventData = async (type: string) => {
  let modifiedType;
  if (type == 'projects' || type == 'publications') {
    modifiedType = type;
  } else {
    modifiedType = 'activities/' + type;
  }
  const res = await fetch('https://nditc.pythonanywhere.com/api/v1/' + modifiedType, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Problem Occurred');
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
  const events = await getEventData(searchParams?.type + 's');
  const upcoming = await getEventData('upcoming');
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img src="/image/bg2.svg" className="absolute top-1/4 right-0 z-0" alt=""></img>
      <div className="container pt-28 sm:pt-[7.5rem] flex flex-col items-center  gap-5 sm:gap-10 z-10 bg-transparent relative">
        {Array.isArray(upcoming) && upcoming?.length > 0 && upcoming ? (
          <>
            <div className="flex gap-3 items-end justify-center self-start md:justify-start">
              <h1 className="text-3xl md:text-5xl pb-1">UPCOMING</h1>
              <h1 className="text-5xl md:text-7xl text-blue-500">EVENT</h1>
            </div>
            <section className="w-full h-fit">
              <Upcoming
                title={upcoming[0].title}
                description={upcoming[0].short_description}
                actionButtonTitle1="Register"
                actionButtonTitle2="Learn More"
                actionButtonRedirect1=""
                actionButtonRedirect2=""
                image={upcoming[0].image_url}
                timestamp={upcoming[0].timestamp}
              />
            </section>
          </>
        ) : null}
        <EventsList data={events} />
        <CodeCompass />
      </div>
    </div>
  );
};

export default Activities;
