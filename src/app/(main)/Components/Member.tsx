/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
type memberProps = {
  img: string;
  imgInCenter?: boolean;
  name: string;
  designation: string;
  department?: string | null;
  hasClickHandler?: boolean;
  hoverText?: string;
};

const Member = ({
  img,
  imgInCenter,
  name,
  designation,
  department,
  hasClickHandler,
  hoverText,
}: memberProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      className={
        "text-center flex md:flex-col place-items-center md:gap-2 gap-4 hover:scale-105 transition-all " +
        (hasClickHandler ? "cursor-pointer" : "saa")
      }
    >
      <div className="w-full grid place-items-center max-w-[120px] md:max-w-[280px]">
        <span
          className={
            "absolute z-10 font-semibold font-Bebas text-white transition-opacity opacity-0" +
            " " +
            (hasClickHandler && hover ? "opacity-100 " : "")
          }
        >
          {hoverText}
        </span>
        <img
          className={`rounded-full max-w-[120px] md:max-w-[280px] w-full transition-all aspect-square object-cover ${
            hasClickHandler && hover
              ? "brightness-50 object-center"
              : `${imgInCenter ? "" : "object-top"}`
          }`}
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
