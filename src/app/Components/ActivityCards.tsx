"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  title: string;
  href: string;
  desc: string;
  imgURL: string;
}

const ActivityCards = () => {
  const blogPosts: BlogPost[] = [
    {
      title: "National Level events and festivals",
      href: "event",
      desc: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ",
      imgURL: "/image/activityCard/1.jpeg",
    },
    {
      title: "ReGular Workshop and seminar",
      href: "workshop",
      desc: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ",
      imgURL: "/image/activityCard/2.jpeg",
    },
    {
      title: "Research and Development based cloud projects",
      href: "project",
      desc: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ",
      imgURL: "/image/activityCard/3.jpeg",
    },
    {
      title: "Annual publication of the club",
      href: "publication",
      desc: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ",
      imgURL: "/image/activityCard/4.jpeg",
    },
  ];
  return (
    <div className="w-full gap-3 justify-center py-5 grid sm:grid-cols-2 lg:grid-cols-4">
      {blogPosts.map(({ imgURL, href, title, desc }, i) => {
        return (
          <Link
            href={`activities?type=${href}`}
            key={i}
            className={`bg-[#2E2E2E] shadow-lg h-full rounded-xl duration-1000 cursor-pointer`}
          >
            <Image
              src={imgURL}
              alt={"Image"}
              width={512}
              height={512}
              className="w-full aspect-video object-cover rounded-t-xl"
            />
            <div className="p-5 flex-1 flex flex-col gap-2 text-center ">
              <h1
                className={
                  "text-white  text-2xl min-h-[64px] break-words" + " "
                }
              >
                {title}
              </h1>
              <p
                style={{ textAlignLast: "center" }}
                className={
                  "font-Nunito text-base text-white  text-justify font-light pb-2"
                }
              >
                {desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ActivityCards;
