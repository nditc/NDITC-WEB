import { AES } from "crypto-js";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";

interface Props {
  title: string;
  imageURL: string;
  descURL: string;
  type: string;
  timestamp: number;
  shortDesc: string;
}

const Event = ({
  title,
  imageURL,
  descURL,
  type,
  timestamp,
  shortDesc,
}: Props) => {
  const DateData = new Date(timestamp * 1000);
  const detailsEncrypt = AES.encrypt(descURL, "SWAPNIL");
  return (
    <div id="init" className="card flex flex-col relative">
      {timestamp * 1000 - new Date().getTime() > 0 ? (
        <div className="absolute text-sm top-2 right-3 bg-red-600 text-white px-3 py-1 rounded-md shadow-md">
          Upcoming!
        </div>
      ) : null}
      <Image
        src={imageURL}
        alt={"Card Image"}
        className="card_banner"
        width={1024}
        height={512}
      />
      <div className="flex flex-1 flex-col justify-between h-full">
        <div className="p-5 pb-6 flex flex-col justify-center gap-2 text-center">
          <h1 className="text-2xl min-h-[64px] grid place-items-center">
            {title}
          </h1>
          <div className="line-clamp-5 font-Nunito flex justify-center font-semibold items-center">
            <MdOutlineDateRange className={"mr-1 w-6 h-6 text-blue-500"} />
            {"   "}
            {DateData.toLocaleString("default", { month: "short" }) +
              ", " +
              DateData.getFullYear()}
          </div>
          <p className="line-clamp-4">{shortDesc}</p>
        </div>
        <div className="w-full grid place-items-center justify-self-end">
          <Link
            className="relative flex items-center justify-center overflow-hidden bg-gray-800 shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-700 before:duration-500 before:ease-out hover:shadow-blue-700 hover:before:h-56 hover:before:w-56 learn_more text-white text-lg cursor-pointer"
            href={`/details/${encodeURIComponent(
              detailsEncrypt.toString()
            )}/${type}/${timestamp}`}
          >
            <span className="relative z-10">Learn More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
