import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineDateRange } from 'react-icons/md';

interface Props {
  title: string;
  imageURL: string;
  descURL: string;
  type: string;
  timestamp: number;
  shortDesc: string;
}

const Event = ({ title, imageURL, descURL, type, timestamp, shortDesc }: Props) => {
  const DateData = new Date(timestamp * 1000);
  return (
    <div id="init" className="card flex flex-col relative">
      {timestamp * 1000 - new Date().getTime() > 0 ? (
        <div className="absolute text-sm top-2 right-3 bg-red-600 text-white px-3 py-1 rounded-md shadow-md">
          Upcoming!
        </div>
      ) : null}
      <Image src={imageURL} alt={'Card Image'} className="card_banner" width={1024} height={512} />
      <div className="flex flex-1 flex-col justify-between h-full">
        <div className="p-5 pb-6 flex flex-col justify-center gap-2 text-center">
          <p className="line-clamp-5 flex justify-center items-center mt-1">
            <MdOutlineDateRange className={'mr-1 w-6 h-6'} />
            {'   '}
            {DateData.toLocaleString('default', { month: 'short' }) + ', ' + DateData.getFullYear()}
          </p>
          <h1 className="text-2xl min-h-[64px] grid place-items-center">{title}</h1>
          <p className="line-clamp-4">{shortDesc}</p>
        </div>
        <div className="w-full grid place-items-center justify-self-end">
          <Link
            className="learn_more text-white text-lg cursor-pointer"
            href={`/details/${encodeURIComponent(descURL)}/${type}/${timestamp}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
