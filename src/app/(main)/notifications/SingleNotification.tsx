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
      className="relative flex h-36 w-full justify-between rounded-xl border-gray-200 bg-white shadow-lg transition-all duration-500 hover:scale-105 hover:cursor-pointer"
    >
      {index == 0 && (
        <div className="absolute -right-1 -top-3 z-10 flex h-9 w-28 items-center justify-center rounded-xl bg-blue-600 md:-right-3">
          <div className="Bebas text-2xl text-white">NEW</div>
        </div>
      )}
      <div className="ml-2 flex flex-[6] flex-col justify-center gap-1 p-5">
        <h1 className="text-xl md:text-3xl">{title}</h1>
        <p className="line-clamp-1 hidden max-w-[90%] break-words text-sm md:line-clamp-2 md:text-base lg:block">
          {subtitle}
        </p>
      </div>

      <div className="relative h-full w-full flex-[10] rounded-r-xl bg-black object-cover gradient-mask-l-50">
        <img
          src={imageURL}
          alt="Image"
          className="absolute h-full w-full object-cover"
        />
      </div>
    </Link>
  );
};

export default SingleNotification;
