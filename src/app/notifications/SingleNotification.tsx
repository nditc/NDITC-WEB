"use client";

import Image from "next/image";
import Link from "next/link";

const SingleNotification = ({
  title,
  subtitle,
  imageURL,
  detailsURL,
}: {
  title: string;
  subtitle: string;
  imageURL: string;
  detailsURL: string;
}) => {
  return (
    <Link
      href={`/notifications/details/${encodeURIComponent(detailsURL)}`}
      className="hover:cursor-pointer w-full h-[7.9rem] md:h-[8.6rem] border-gray-200 shadow-[5px_5px_30px_5px_#00000024] transition-all duration-500 hover:scale-110 rounded-xl flex justify-between"
    >
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
