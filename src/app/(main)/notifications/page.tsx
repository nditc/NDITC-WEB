import SingleNotification from "./_components/SingleNotification";

const Notifications = async () => {
  const res = await fetch(
    "https://nditc.pythonanywhere.com/api/v1/notifications/web?page=1&limit=5",
    { cache: "no-store" },
  );

  const NotificationData: NotificationDataFormat[] = await res.json();

  return (
    <div className="h-screen overflow-x-hidden bg-[#F6F6F6] pb-10 pt-32">
      <div className="container flex w-screen items-center justify-center gap-3 md:justify-start">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[010px_20px_15px_10px_#00000024]">
          <svg
            className="h-12 w-12 text-gray-800 transition-all hover:rotate-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 20"
          >
            <path d="M18.012 13.453c-.219-1.173-2.163-1.416-2.6-3.76l-.041-.217c0 .006 0-.005-.007-.038v.021l-.017-.09-.005-.025v-.006l-.265-1.418a5.406 5.406 0 0 0-5.051-4.408.973.973 0 0 0 0-.108L9.6 1.082a1 1 0 0 0-1.967.367l.434 2.325a.863.863 0 0 0 .039.1A5.409 5.409 0 0 0 4.992 9.81l.266 1.418c0-.012 0 0 .007.037v-.007l.006.032.009.046v-.01l.007.038.04.215c.439 2.345-1.286 3.275-1.067 4.447.11.586.22 1.173.749 1.074l12.7-2.377c.523-.098.413-.684.303-1.27ZM1.917 9.191h-.074a1 1 0 0 1-.924-1.07 9.446 9.446 0 0 1 2.426-5.648 1 1 0 1 1 1.482 1.343 7.466 7.466 0 0 0-1.914 4.449 1 1 0 0 1-.996.926Zm5.339 8.545A3.438 3.438 0 0 0 10 19.1a3.478 3.478 0 0 0 3.334-2.5l-6.078 1.136Z" />
          </svg>
        </div>

        <h1 className="text-4xl xsm:text-5xl md:text-6xl">ALL</h1>
        <h1 className="text-4xl text-blue-500 xsm:text-5xl md:text-6xl">
          NOTIFICATIONS
        </h1>
      </div>

      <div className="flex w-screen justify-center">
        <div className="container mt-10 flex flex-col items-center gap-7">
          {NotificationData.map((e, i) => {
            return (
              <SingleNotification
                title={e.title}
                subtitle={e.subtitle}
                detailsURL={e.details_url}
                imageURL={e.image_url}
                index={i}
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
  subtitle: string;
  details_url: string;
  image_url: string;
}

export default Notifications;
