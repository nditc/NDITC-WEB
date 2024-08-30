import Link from "next/link";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { BsStopwatch } from "react-icons/bs";
import { timeValue } from "../Time";
import { Timestamp } from "firebase/firestore";

const AdminEventCard = ({
  title,
  date,
  endDate,
  image,
  desc,
  id,
  ongoing,
}: {
  title: string;
  date: Timestamp;
  endDate: Timestamp;
  image: string;
  desc: string;
  id: string;
  ongoing: boolean;
}) => {
  const dateData = timeValue(date);

  return (
    <div className="relative h-[40rem] w-[24rem] rounded-lg border border-gray-200 bg-white shadow">
      {ongoing && (
        <div className="absolute right-0 top-0 rounded-xl bg-primary px-3 py-1 text-white">
          Ongoing
        </div>
      )}

      <img
        className="h-[60%] w-full rounded-t-lg object-cover"
        src={image}
        alt="Event Image"
      />

      <div className="flex flex-col gap-2 p-5">
        <h5 className="mb-2 line-clamp-1 flex items-center justify-between text-2xl font-bold tracking-wide text-gray-900">
          {title}
          <div className="flex items-center justify-center gap-1 rounded-xl bg-primary px-1 py-1 text-xl tracking-normal text-white">
            <BsStopwatch />
            {timeValue(endDate).minute - dateData.minute} Minutes
          </div>
        </h5>

        <div className="flex items-center gap-1 text-xl">
          <IoCalendarOutline className="h-6 w-6 pb-1" />
          {`${dateData.date} ${dateData.monthText} ${dateData.year}`} |{" "}
          {`${dateData.hour}:${dateData.minute}`}
        </div>

        <p className="mb-3 line-clamp-3 h-[4.3rem] font-normal text-gray-700">
          {desc}
        </p>
        <Link
          href={`/club/admin/events/${id}`}
          className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
        >
          <IoSettingsOutline className="h-7 w-7" />
          EDIT
        </Link>
      </div>
    </div>
  );
};

export default AdminEventCard;