import SingleNotification from "./_components/SingleNotification";
import { MdAnnouncement } from "react-icons/md";

const Notifications = async () => {
  let NotificationData: NotificationDataFormat[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      "https://nditc.pythonanywhere.com/api/v1/notifications/web?page=1&limit=5",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch notifications");
    }

    NotificationData = await res.json();
  } catch (err) {
    console.error("Error fetching notifications:", err);
    error = "general";
  }

  return (
    <div className="h-screen overflow-x-hidden bg-[#F6F6F6] pb-10 pt-32">
      {/* Header */}
      <div className="container flex w-screen items-center justify-center gap-3 md:justify-start">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[010px_20px_15px_10px_#00000024]">
          <MdAnnouncement className="h-12 w-12 text-gray-800 transition-all hover:rotate-12" />
        </div>
        <h1 className="text-4xl xsm:text-5xl md:text-6xl">ALL</h1>
        <h1 className="text-4xl text-blue-500 xsm:text-5xl md:text-6xl">
          NOTIFICATIONS
        </h1>
      </div>

      <div className="flex w-screen justify-center">
        <div className="container mt-10 flex flex-col items-center gap-7">
          {/* Error */}
          {error === "general" && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-200 w-full max-w-2xl text-center">
              <p className="text-red-700">
                Failed to load notifications. Please try again later.
              </p>
            </div>
          )}

          {/* No Data */}
          {!error && NotificationData.length === 0 && (
            <div className="rounded-xl bg-gray-100 p-8 text-center text-zinc-400 w-full max-w-2xl">
              <p className="text-lg">No Notifications Yet</p>
              <p className="text-sm mt-1">Check back later for updates</p>
            </div>
          )}

          {/* Main Data */}
          {!error &&
            NotificationData.length > 0 &&
            NotificationData.map((e, i) => (
              <SingleNotification
                title={e.title}
                subtitle={e.subtitle}
                detailsURL={e.details_url}
                imageURL={e.image_url}
                index={i}
                key={i}
              />
            ))}
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
