"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  href: string;
  desc: string;
  imgURL: string;
}

const Card = ({ title, desc, imgURL, href }: CardProps) => {
  const [hover, setHover] = useState<boolean>();

  return (
    <Link href={"/activities?type=" + href}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`bg-[#2E2E2E] cursor-pointer relative shadow-lg h-full rounded-xl duration-300  overflow-hidden min-h-[360px]`}
      >
        <p
          className={
            "absolute right-5 top-5 z-20 text-white font-bold transition-transform" +
            " " +
            (hover ? "translate-x-0" : "translate-x-60")
          }
        >
          Click to know More →{" "}
        </p>
        <Image
          src={imgURL}
          alt={"Image"}
          width={512}
          height={512}
          className={
            "w-full aspect-video object-cover rounded-t-xl " +
            " " +
            (hover ? "opacity-0" : "")
          }
        />
        <Image
          src={imgURL}
          alt={"Image"}
          width={512}
          height={512}
          className={
            "w-full aspect-video object-cover rounded-t-xl transition-filter transition-all absolute top-0" +
            " " +
            (hover
              ? "h-full brightness-50 blur-sm opacity-100"
              : "h-[250px] opacity-0")
          }
        />
        <div
          className={
            "p-5 flex-1 flex flex-col gap-2 text-center " +
            " " +
            (hover ? "opacity-0" : "")
          }
        >
          <h1
            className={
              "text-white grid place-items-center text-2xl min-h-[64px] break-words" +
              " "
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
        <div
          className={
            "p-5 flex-1 flex flex-col gap-2 text-center absolute bottom-0 transition-all" +
            " " +
            (hover ? "-translate-y-0 opacity-100" : "-translate-y-12 opacity-0")
          }
        >
          <h1
            className={
              "text-white grid place-items-center text-2xl min-h-[64px] break-words" +
              " "
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
      </div>
    </Link>
  );
};
const ActivityCards = () => {
  const blogPosts: CardProps[] = [
    {
      title: "National Level events and festivals",
      href: "event",
      desc: "NDITC hosts electrifying national events like FTMPC 3.0, INIT 3.0, and Thynk 2.0, pushing boundaries in technology engagement.",
      imgURL: "/image/activityCard/1.jpeg",
    },
    {
      title: "ReGular Workshop and seminar",
      href: "workshop",
      desc: "The club conducts diverse workshops, from cryptography to web development bootcamps, fostering continual learning and skill enhancement.",
      imgURL: "/image/activityCard/2.jpeg",
    },
    {
      title: "Research and Development based cloud projects",
      href: "project",
      desc: "NDITC innovates with HashTech, Evya AI, and other cloud-based projects, pioneering research and development in the IT domain.",
      imgURL: "/image/activityCard/3.jpeg",
    },
    {
      title: "Annual publication of the club",
      href: "publication",
      desc: "RECURSION 2019 stands as NDITC's yearly publication, showcasing insights, achievements, and contributions in the technology landscape.",
      imgURL: "/image/activityCard/4.jpeg",
    },
  ];

  const animationVariants = {
    initial: { opacity: 0, x: -100 },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      delay: 0.5,
      transition: { delay: 0.07 * index },
    }),
  };

  return (
    <div className="w-full gap-5 justify-center py-5 grid sm:grid-cols-2 lg:grid-cols-4">
      {blogPosts.map(({ imgURL, title, href, desc }, i) => {
        return (
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={i}
            key={i}
          >
            <Card
              title={title}
              href={href}
              desc={desc}
              imgURL={imgURL}
              key={i}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityCards;
