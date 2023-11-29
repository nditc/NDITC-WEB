"use client";

import Image from "next/image";

const SingleNotification = ({
  title,
  description,
  imageURL,
}: {
  title: string;
  description: string;
  imageURL: string;
}) => {
  return (
    <div className="hover:cursor-pointer w-full h-[7.9rem] md:h-[8.6rem] border border-gray-200 shadow-[5px_5px_30px_5px_#a0aec0] transition-all duration-500 hover:scale-110 rounded-xl flex justify-between">
      <div className="flex flex-col gap-1 flex-[6] mt-2 p-3">
        <h1 className="text-base md:text-2xl">{title}</h1>
        <p className="text-sm md:text-base break-words max-w-[90%] line-clamp-1 md:line-clamp-2">
          {description}
        </p>
      </div>

      <Image
        src={imageURL}
        alt="Image"
        width={512}
        height={512}
        className="bg-black object-cover flex-[4.5] h-full rounded-r-xl gradient-mask-l-50"
      />
    </div>
  );
};

export default SingleNotification;
