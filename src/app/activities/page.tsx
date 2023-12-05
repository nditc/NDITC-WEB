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

const getData = async () => {
  const res = await fetch('https://nditc.pythonanywhere.com/activities/past', {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Problem Occurred');
  }
  return res.json();
};

const Activities = async () => {
  const events = await getData();

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img src="/image/bg2.svg" className="absolute top-1/4 right-0 z-0" alt=""></img>
      <div className="container pt-32 py-10  flex flex-col items-center gap-10 z-10 bg-transparent relative">
        <div className="flex gap-3 items-end justify-center self-start md:justify-start">
          <h1 className="text-3xl md:text-5xl pb-1">UPCOMING</h1>
          <h1 className="text-5xl md:text-7xl text-blue-500">EVENT</h1>
        </div>
        <section className="w-full ">
          <div className="w-full grid place-items-center h-60 bg-slate-400 rounded-xl text-slate-100 shadow-xl ">
            <p className="Bebas text-2xl">No Events Upcoming</p>
          </div>
        </section>
        <EventsList data={events} />
      </div>
    </div>
  );
};

export default Activities;
