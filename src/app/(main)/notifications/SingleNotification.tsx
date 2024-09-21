"use client";

import { encrypt } from "@/util/Encrypt";
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
  const detailsEncrypt = encrypt(detailsURL);
  return (
    <Link
      href={`/notifications/details/${encodeURIComponent(
        detailsEncrypt.toString(),
      )}`}
      className="relative flex h-[7.9rem] w-[96vw] justify-between rounded-xl border-gray-200 bg-white px-3 shadow-[5px_5px_30px_5px_#00000024] transition-all duration-500 hover:scale-105 hover:cursor-pointer md:h-[8.6rem] md:w-[70vw]"
    >
      {index == 0 && (
        <div className="absolute -right-1 -top-3 z-10 flex h-9 w-28 items-center justify-center rounded-xl bg-blue-600 md:-right-3">
          <div className="Bebas text-2xl text-white">NEW</div>
        </div>
      )}
      <div className="flex flex-[6] flex-col gap-1 p-5">
        <h1 className="text-xl md:text-3xl">{title}</h1>
        <p className="line-clamp-1 max-w-[90%] break-words text-sm md:line-clamp-2 md:text-base">
          {subtitle}
        </p>
      </div>

      <div className="relative h-full flex-[10] rounded-r-xl bg-black object-cover gradient-mask-l-50">
        <img
          src={imageURL}
          alt="Image"
          className="absolute w-full object-cover"
          fill
        />
      </div>
    </Link>
  );
};

export default SingleNotification;
