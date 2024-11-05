import Image from "next/image";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import "../../styles/eventCard.css";
import { encrypt } from "@/util/Encrypt";
interface Props {
  title: string;
  imageURL: string;
  descURL: string;
  type: string;
  timestamp: number;
  shortDesc: string;
  isOngoing: boolean;
}

const Event = ({
  title,
  imageURL,
  descURL,
  type,
  timestamp,
  shortDesc,
  isOngoing,
}: Props) => {
  const DateData = new Date(timestamp * 1000);
  const detailsEncrypt = encrypt(descURL);
  return (
    <div id="init" className="card relative flex flex-col">
      {isOngoing ? (
        <div className="absolute right-3 top-2 rounded-md bg-orange-600 px-3 py-1 text-sm text-white shadow-md">
          On Going!
        </div>
      ) : null}
      <img
        src={imageURL}
        alt={"Card Image"}
        className="card_banner"
        width={1024}
        height={512}
      />
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="flex flex-col justify-center gap-2 p-5 pb-4 text-center md:pb-6">
          <h1 className="grid min-h-[48px] place-items-center text-2xl md:min-h-[64px]">
            {title}
          </h1>
          <div className="line-clamp-5 flex items-center justify-center font-Nunito font-semibold">
            <MdOutlineDateRange className={"mr-1 h-6 w-6 text-blue-500"} />
            {"   "}
            {DateData.toLocaleString("default", { month: "short" }) +
              ", " +
              DateData.getFullYear()}
          </div>
          <p className="line-clamp-4">{shortDesc}</p>
        </div>
        <div className="grid w-full place-items-center justify-self-end">
          <Link
            className="learn_more relative flex cursor-pointer items-center justify-center overflow-hidden bg-gray-800 text-lg text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-700 before:duration-500 before:ease-out hover:shadow-blue-700 hover:before:h-56 hover:before:w-56"
            href={`/details/${encodeURIComponent(detailsEncrypt.toString())}/${type}/${timestamp}`}
          >
            <span className="relative z-10">Learn More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
