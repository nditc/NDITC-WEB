import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";
import { BsStopwatch } from "react-icons/bs";
import { timeValue } from "../Time";
import { PiStudent } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { Timestamp } from "firebase/firestore";
import PartcipateButton from "./PartcipateButton";

const EventCard = ({
  title,
  date,
  endDate,
  ongoingForParticipate,
  image,
  desc,
  id,
}: {
  title: string;
  date: any;
  endDate: any;
  ongoingForParticipate: boolean;
  image: string;
  desc: string;
  id: string;
}) => {
  const now = Timestamp.now();

  const ongoing = now > date && now < endDate;

  const upcoming = now < date;

  const dateData = timeValue(date);

  return (
    <div className="relative h-[40rem] w-[24rem] rounded-lg border border-gray-200 bg-white shadow">
      {ongoing && (
        <div className="absolute right-0 top-0 rounded-xl bg-primary px-3 py-1 text-white">
          Ongoing
        </div>
      )}

      {upcoming && (
        <div className="absolute right-0 top-0 rounded-xl bg-primary px-3 py-1 text-white">
          Upcoming
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
          <div className="flex items-center justify-center gap-2 rounded-xl bg-primary px-1 py-1 text-xl tracking-normal text-white">
            <BsStopwatch />
            {timeValue(endDate).hour - dateData.hour > 0 &&
              `${timeValue(endDate).hour - dateData.hour}H : `}
            {timeValue(endDate).minute - dateData.minute}M
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
        {ongoingForParticipate && <PartcipateButton id={id} />}

        {!ongoingForParticipate && (
          <Link
            href={`/eventdetails/${encodeURIComponent(title)}/${encodeURIComponent(`${dateData.date} ${dateData.monthText} ${dateData.year} | ${dateData.hour}:${dateData.minute}`)}/${encodeURIComponent(image)}/${encodeURIComponent(desc)}`}
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
          >
            <TbListDetails className="h-7 w-7" />
            Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
