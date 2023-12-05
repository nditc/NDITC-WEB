import SingleNotification from './SingleNotification';

const Notifications = () => {
  const NotificationData: NotificationDataFormat[] = [
    {
      title: 'Father Tim memorial programming contest 3.0',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imgURL:
        'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
      title: 'Father Tim memorial programming contest 3.0',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imgURL:
        'https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
      title: 'Father Tim memorial programming contest 3.0',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imgURL:
        'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
      title: 'Father Tim memorial programming contest 3.0',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imgURL:
        'https://images.pexels.com/photos/982673/pexels-photo-982673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

    {
      title: 'Father Tim memorial programming contest 3.0',
      description:
        'This is a paragraph with more information about something important. This something has many uses and is made of 100% recycled material.',
      imgURL: '/Cover.png',
    },
  ];

  return (
    <div className="pt-32 pb-10 overflow-x-hidden bg-slate-50">
      <div className="flex w-screen justify-center md:justify-start gap-3 md:ml-32 items-center">
        <div className="rounded-full w-16 h-16 grid place-items-center shadow-[010px_20px_15px_10px_#00000024]">
          <svg
            className="h-12 w-12 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 20"
          >
            <path d="M18.012 13.453c-.219-1.173-2.163-1.416-2.6-3.76l-.041-.217c0 .006 0-.005-.007-.038v.021l-.017-.09-.005-.025v-.006l-.265-1.418a5.406 5.406 0 0 0-5.051-4.408.973.973 0 0 0 0-.108L9.6 1.082a1 1 0 0 0-1.967.367l.434 2.325a.863.863 0 0 0 .039.1A5.409 5.409 0 0 0 4.992 9.81l.266 1.418c0-.012 0 0 .007.037v-.007l.006.032.009.046v-.01l.007.038.04.215c.439 2.345-1.286 3.275-1.067 4.447.11.586.22 1.173.749 1.074l12.7-2.377c.523-.098.413-.684.303-1.27ZM1.917 9.191h-.074a1 1 0 0 1-.924-1.07 9.446 9.446 0 0 1 2.426-5.648 1 1 0 1 1 1.482 1.343 7.466 7.466 0 0 0-1.914 4.449 1 1 0 0 1-.996.926Zm5.339 8.545A3.438 3.438 0 0 0 10 19.1a3.478 3.478 0 0 0 3.334-2.5l-6.078 1.136Z" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl">ALL</h1>
        <h1 className="text-5xl md:text-7xl text-blue-600">NOTIFICATIONS</h1>
      </div>

      <div className="w-screen flex justify-center">
        <div className="flex flex-col w-[90%] md:w-[70%] items-center gap-7 mt-10">
          {NotificationData.map((e, i) => {
            return (
              <SingleNotification
                title={e.title}
                description={e.description}
                imageURL={e.imgURL}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface NotificationDataFormat {
  title: string;
  description: string;
  imgURL: string;
}

export default Notifications;
