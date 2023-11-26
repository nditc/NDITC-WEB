'use client';

import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  title: string;
  date: string;
  index: number;
}

const BlogPost = ({ title, date, index }: Props) => {
  const ref = useRef(null);
  const [hover, setHover] = useState<boolean>(false);

  // const inView = useInView(ref, { once: true });
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      ref={ref}
      className={`bg-[#2E2E2E] shadow-lg  rounded-xl duration-1000 cursor-pointer`}
    >
      <Image
        src="/Ryzen.jpg"
        alt={'Image'}
        width={256}
        height={256}
        className="w-full object-cover aspect-video"
      />
      <div className="p-3 flex flex-col gap-2">
        <h1
          className={
            'font-Roboto font-bold text-white  text-sm  w-[90%] break-words' +
            ' ' +
            (hover ? 'underline' : '')
          }
        >
          {title}
        </h1>
        <p className={'font-Roboto text-xs text-white font-light'}>{date}</p>
      </div>
    </div>
  );
};

export default BlogPost;
