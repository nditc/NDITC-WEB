'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  title: string;
  desc: string;
  imageURL: string;
}

const HashtechPosts = ({ title, desc, imageURL }: Props) => {
  const ref = useRef(null);

  // const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className={`bg-[#2E2E2E] shadow-xl flex flex-col sm:flex-row rounded-xl duration-1000 overflow-hidden min-w-[290px]`}
    >
      <Image
        src={imageURL}
        alt={'Image'}
        width={512}
        height={512}
        className="w-full sm:w-1/2 aspect-square object-cover  flex-1"
      />
      <div className="p-5 py-10 flex-1 flex flex-col gap-3 text-left">
        <h1 className={'text-white font-Roboto text-xl font-medium  break-words' + ' '}>{title}</h1>
        <p className={'font-Roboto text-base text-white font-light pb-2'}>{desc}</p>
      </div>
    </div>
  );
};

export default HashtechPosts;
