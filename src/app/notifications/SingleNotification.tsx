"use client";

import { AES } from "crypto-js";
import Image from "next/image";
import Link from "next/link";

const SingleNotification = ({
  title,
  subtitle,
  imageURL,
  detailsURL,
  index,
}: {
  title: string;
  subtitle: string;
  imageURL: string;
  detailsURL: string;
  index: number;
}) => {
  const detailsEncrypt = AES.encrypt(detailsURL, "Anime");
  return (
    <Link
      href={`/notifications/details/${encodeURIComponent(
        detailsEncrypt.toString()
      )}`}
      className="relative hover:cursor-pointer w-full h-[7.9rem] md:h-[8.6rem] border-gray-200 shadow-[5px_5px_30px_5px_#00000024] transition-all duration-500 hover:scale-110 rounded-xl flex justify-between"
    >
      {index == 0 && (
        <div className="absolute z-10 w-28 h-9 bg-blue-600 -right-3 -top-3 rounded-xl flex items-center justify-center">
          <div className="Bebas text-2xl text-white">NEW</div>
        </div>
      )}
      <div className="flex flex-col gap-1 flex-[6] p-5">
        <h1 className="text-base md:text-2xl">{title}</h1>
        <p className="text-sm md:text-base break-words max-w-[90%] line-clamp-1 md:line-clamp-2">
          {subtitle}
        </p>
      </div>

      <Image
        src={imageURL}
        alt="Image"
        width={512}
        height={512}
        className="bg-black object-cover flex-[4.5] h-full rounded-r-xl gradient-mask-l-50"
      />
    </Link>
  );
};

export default SingleNotification;
