/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
type memberProps = {
  img: string;
  name: string;
  designation: string;
  department?: string | null;
};

const Members = ({ img, name, designation, department }: memberProps) => {
  return (
    <div className="text-center grid place-items-center ">
      <Image
        className="rounded-full max-w-[250px] w-full grayscale hover:grayscale-0 transition-all aspect-square object-cover"
        width={256}
        height={256}
        src={img}
        alt=""
      ></Image>
      <h3 className="text-2xl pt-2">{name}</h3>
      <p className="text-blue-500 font-bold">{designation}</p>
      <p>{department}</p>
    </div>
  );
};

export default Members;
