import EventsList from './EventsList';

const Activities = () => {
  return (
<<<<<<< Updated upstream
    <div className="mt-32 container pt-0 flex flex-col items-center">
=======
    <div className="mt-32 p-10 pt-0 flex flex-col items-center overflow-x-hidden gap-10">
>>>>>>> Stashed changes
      <div className="flex gap-3 items-end justify-center self-start md:justify-start">
        <h1 className="text-3xl md:text-5xl pb-1">UPCOMING</h1>
        <h1 className="text-5xl md:text-7xl text-blue-600">EVENT</h1>
      </div>
      <section>
        <div className="w-screen h-60 bg-slate-500"></div>
      </section>
      <EventsList />
    </div>
  );
};

export default Activities;
