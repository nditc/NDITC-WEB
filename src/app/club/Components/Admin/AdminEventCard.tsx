import Link from "next/link";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { BsStopwatch } from "react-icons/bs";
import { timeValue } from "../Time";
import { Timestamp } from "firebase/firestore";
import _L0 from "@/util/leadingzero";

const AdminEventCard = ({
  title,
  date,
  endDate,
  image,
  desc,
  id,
  ongoing,
  category,
}: {
  title: string;
  date: Timestamp;
  endDate: Timestamp;
  image: string;
  desc: string;
  id: string;
  ongoing: boolean;
  category: string;
}) => {
  const dateData = timeValue(date);

  return (
    <div className="relative flex w-[24rem] flex-col rounded-lg border border-gray-200 bg-white shadow">
      {ongoing && (
        <div className="absolute right-0 top-0 rounded-xl bg-primary px-3 py-1 text-white">
          Ongoing
        </div>
      )}

      <img
        className="mx-auto h-[300px] w-full rounded-t-lg object-cover"
        src={image}
        alt="Event Image"
      />

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h5 className="mb-2 line-clamp-1 flex items-center justify-between text-2xl font-normal tracking-wide text-gray-900">
          {title}
          <div className="flex items-center justify-center gap-1 rounded-xl bg-primary px-1 py-1 text-xl tracking-normal text-white">
            <BsStopwatch />
            {timeValue(endDate).hour - dateData.hour > 0 &&
              `${Math.abs(timeValue(endDate).hour - dateData.hour)}H : `}
            {Math.abs(timeValue(endDate).minute - dateData.minute)}M
          </div>
        </h5>
        <div className="-mt-4 font-semibold text-primary">{category}</div>
        <div className="flex items-center gap-1 text-xl">
          <IoCalendarOutline className="h-6 w-6 pb-1" />
          {`${dateData.date} ${dateData.monthText} ${dateData.year}`} |{" "}
          {`${_L0(dateData.hour - (dateData.hour > 12 ? 12 : 0))}:${_L0(dateData.minute)} ${dateData.hour >= 12 ? "PM" : "AM"}`}
        </div>

        <p className="mb-3 line-clamp-3 h-[4.3rem] flex-1 font-normal text-gray-700">
          {desc}
        </p>
        <Link
          href={`/club/admin/eventEdit/${id}`}
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
