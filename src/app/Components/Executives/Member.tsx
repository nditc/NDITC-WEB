/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
type memberProps = {
  img: string;
  name: string;
  designation: string;
  department?: string | null;
  hasClickHandler?: boolean;
};

const Member = ({ img, name, designation, department, hasClickHandler }: memberProps) => {
  const [hover, setHover] = useState<boolean>(false);
  useEffect(() => {
    console.log('Component Re rendring');
  });
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      className={
        'text-center flex md:flex-col place-items-center md:gap-2 gap-4 hover:scale-105 transition-all ' +
        (hasClickHandler ? 'cursor-pointer' : 'saa')
      }
    >
      <div className="w-full grid place-items-center max-w-[120px] md:max-w-[230px]">
        <span
          className={
            'absolute z-10 font-semibold font-Bebas text-white transition-opacity opacity-0' +
            ' ' +
            (hasClickHandler && hover ? 'opacity-100 ' : '')
          }
        >
          Click for Details
        </span>
        <Image
          className={
            'rounded-full max-w-[120px] md:max-w-[230px] w-full transition-all aspect-square object-cover ' +
            (hasClickHandler && hover ? 'brightness-50' : '')
          }
          width={320}
          height={320}
          src={img}
          alt=""
        ></Image>
      </div>
      <div className="text-left md:text-center">
        <h3 className="text-2xl">{name}</h3>
        <p className="text-blue-500 font-bold">{designation}</p>
        <p>{department}</p>
      </div>
    </div>
  );
};

export default Member;
