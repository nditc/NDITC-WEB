"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  title: string;
  date: string;
  index: number;
}

const BlogPost = ({ title, date, index }: Props) => {
  const ref = useRef(null);

  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className={`w-60 h-72 bg-[#2E2E2E] shadow-xl rounded duration-1000 ${
        inView ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"
      }`}
    >
      <Image
        src="/Ryzen.jpg"
        alt={"Image"}
        width={256}
        height={256}
        className="w-full object-cover"
      />
      <h1 className="p-1 font-Roboto text-white font-medium text-sm w-[90%] break-words mt-1">
        {title}
      </h1>
      <p className="font-Roboto text-sm text-white ml-1 mt-1 font-light">
        {date}
      </p>
    </div>
  );
};

export default BlogPost;
