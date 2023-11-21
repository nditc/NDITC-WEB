/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
type memberProps = {
  img: string;
  name: string;
  designation: string;
  department?: string | null;
};

const Member = ({ img, name, designation, department }: memberProps) => {
  return (
    <div className="text-center flex md:flex-col place-items-center md:gap-2 gap-4">
      <Image
        className="rounded-full max-w-[120px] md:max-w-[250px] w-full grayscale hover:grayscale-0 transition-all aspect-square object-cover"
        width={256}
        height={256}
        src={img}
        alt=""
      ></Image>
      <div className="text-left md:text-center">
        <h3 className="text-2xl">{name}</h3>
        <p className="text-blue-500 font-bold">{designation}</p>
        <p>{department}</p>
      </div>
    </div>
  );
};

export default Member;
