"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  title: string;
  date: string;
  index: number;
  imageURL: string;
}

const BlogPost = ({ title, date, index, imageURL }: Props) => {
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
      className={`bg-[#2E2E2E] shadow-lg h-96 rounded-xl duration-1000 cursor-pointer`}
    >
      <Image
        src={imageURL}
        alt={"Image"}
        width={512}
        height={512}
        className="w-full h-[60%] object-cover rounded-t-xl"
      />
      <div className="p-3 flex-1 flex flex-col gap-2">
        <h1
          className={
            "font-Roboto font-bold text-white  text-sm  w-[90%] break-words" +
            " " +
            (hover ? "underline" : "")
          }
        >
          {title}
        </h1>
        <p className={"font-Roboto text-xs text-white font-light"}>{date}</p>
      </div>
    </div>
  );
};

export default BlogPost;
