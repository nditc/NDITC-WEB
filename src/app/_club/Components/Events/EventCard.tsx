import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";
import { BsStopwatch } from "react-icons/bs";
import { timeValue } from "../Time";
import { PiStudent } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { Timestamp } from "firebase/firestore";
import PartcipateButton from "./PartcipateButton";
import { MdOutlineTimer } from "react-icons/md";
import { createCipheriv } from "crypto";
import _L0 from "@/util/leadingzero";
import { RemainingTimeHM } from "@/util/Time";

const EventCard = ({
  title,
  date,
  endDate,
  ongoingForParticipate,
  image,
  desc,
  id,
  category,
  participated,
}: {
  title: string;
  date: any;
  endDate: any;
  ongoingForParticipate: boolean;
  image: string;
  desc: string;
  id: string;
  category: string;
  participated: boolean;
}) => {
  const now = Timestamp.now();

  const ongoing = now > date && now < endDate;

  const upcoming = now < date;

  const ended = now > endDate;

  const dateData = timeValue(date);

  const remainingTime = RemainingTimeHM(date, endDate);

  return (
    <div className="hover: relative flex flex-col overflow-hidden rounded-xl bg-white shadow lg:h-[20rem] lg:flex-row">
      {participated && (
        <div className="absolute right-5 top-5 rounded-xl bg-green-500 px-3 py-1 text-sm text-white">
          Participated
        </div>
      )}

      {ongoing && !participated && (
        <div className="absolute right-5 top-5 animate-pulse rounded-xl bg-orange-500 px-3 py-1 text-sm text-white">
          Ongoing
        </div>
      )}

      {upcoming && !participated && (
        <div className="absolute right-5 top-5 rounded-xl bg-primary px-3 py-1 text-sm text-white">
          Upcoming
        </div>
      )}

      {ended && !participated && (
        <div className="absolute right-5 top-5 rounded-xl bg-red-500 px-3 py-1 text-sm text-white">
          Ended
        </div>
      )}

      <img
        className="h-1/3 w-full flex-1 bg-black object-cover lg:h-auto lg:w-1/3"
        src={
          image ||
          "https://firebasestorage.googleapis.com/v0/b/nditc-club.appspot.com/o/ep%2F123456789?alt=media&token=e4b46f56-b13c-4798-a6a6-47a634c3f20b"
        }
        alt="Event Image"
      />

      <div className="flex h-full flex-1 flex-col justify-between gap-2 p-5">
        <div className="flex h-full flex-1 flex-col justify-start pt-2 lg:pt-6">
          <p className="Inter text-sm font-medium text-primary">{category}</p>
          <h5 className="Inter mb-1.5 line-clamp-1 flex items-center justify-between text-2xl font-bold tracking-wide text-gray-900">
            {title}
          </h5>
          <div className="Inter flex items-center gap-1 text-sm font-medium">
            <IoCalendarOutline className="h-6 w-6 pb-1 text-primary" />
            {`${dateData.date} ${dateData.monthText} ${dateData.year}`}{" "}
            <span className="text-zinc-300">|</span>{" "}
            {`${_L0(dateData.hour - (dateData.hour > 12 ? 12 : 0))}:${_L0(dateData.minute)} ${dateData.hour >= 12 ? "PM" : "AM"}`}
          </div>
          <div className="Inter mb-3 flex items-center justify-start gap-1 text-sm font-medium tracking-normal text-black">
            <MdOutlineTimer className="mt-1 h-6 w-6 pb-1 text-primary" />
            {remainingTime.hours > 0 && `${remainingTime.hours}h `}
            {remainingTime.mins}min
          </div>
          <p className="mb-2 line-clamp-3 h-[4.3rem] font-normal text-gray-700">
            {desc}
          </p>
        </div>
        <div>
          {ongoingForParticipate && <PartcipateButton id={id} />}
          {!ongoingForParticipate && (
            <Link
              href={`/club/eventdetails/${id}`}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
            >
              <TbListDetails className="h-5 w-5" />
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
