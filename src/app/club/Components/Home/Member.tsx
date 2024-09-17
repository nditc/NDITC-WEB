/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
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
        "flex place-items-center gap-4 text-center transition-all hover:scale-105 md:flex-col md:gap-2 " +
        (hasClickHandler ? "cursor-pointer" : "saa")
      }
    >
      <div className="grid w-full max-w-[120px] place-items-center md:max-w-[280px]">
        <span
          className={
            "font-Bebas absolute z-10 font-semibold text-white opacity-0 transition-opacity" +
            " " +
            (hasClickHandler && hover ? "opacity-100" : "")
          }
        >
          {hoverText}
        </span>
        <Image
          className={`aspect-square w-full max-w-[120px] rounded-full object-cover transition-all md:max-w-[280px] ${
            hasClickHandler && hover
              ? "object-center brightness-50"
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
        <p className="font-bold text-primary">{designation}</p>
        <p>{department}</p>
      </div>
    </div>
  );
};

export default Member;
