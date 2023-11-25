import Event from '../Components/Event';

const Activities = () => {
  const EventData: EventDataFormat[] = [
    {
      title: 'Title of something',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imageURL:
        'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Title of something',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imageURL:
        'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Title of something',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imageURL:
        'https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Title of something',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imageURL:
        'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Title of something',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imageURL:
        'https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Title of something',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imageURL:
        'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="mt-32 container pt-0 flex flex-col items-center">
      <div className="flex gap-3 items-end justify-center self-start md:justify-start">
        <h1 className="text-3xl md:text-5xl pb-1">UPCOMING</h1>
        <h1 className="text-5xl md:text-7xl text-blue-600">EVENT</h1>
      </div>
      <section>
        <div className="w-screen h-60 bg-slate-500"></div>
      </section>
      <section className="w-full">
        <div className="flex gap-3 items-end justify-center self-start md:justify-start pb-7">
          <h1 className="text-3xl md:text-5xl text-blue-600">ALL</h1>
          <h1 className="text-3xl md:text-5xl">EVENTS</h1>
        </div>
        <div className="grid-fluid-fill-[18rem] gap-8 w-full justify-items-center">
          {EventData.map((e, i) => {
            return (
              <Event title={e.title} description={e.description} imageURL={e.imageURL} key={i} />
            );
          })}
        </div>
      </section>
    </div>
  );
};

interface EventDataFormat {
  title: string;
  description: string;
  imageURL: string;
}

export default Activities;
