"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import mainActivities from "@/data/mainActivities";

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
        className={`relative h-full min-h-[360px] cursor-pointer overflow-hidden rounded-xl bg-[#2E2E2E] shadow-lg duration-300`}
      >
        <p
          className={
            "absolute right-5 top-5 z-20 font-bold text-white transition-transform" +
            " " +
            (hover ? "translate-x-0" : "translate-x-60")
          }
        >
          Click to know More →{" "}
        </p>
        <img
          src={imgURL}
          alt={"Image"}
          width={512}
          height={512}
          className={
            "aspect-video w-full rounded-t-xl object-cover " +
            " " +
            (hover ? "opacity-0" : "")
          }
        />
        <img
          src={imgURL}
          alt={"Image"}
          width={512}
          height={512}
          className={
            "transition-filter absolute top-0 aspect-video w-full rounded-t-xl object-cover transition-all" +
            " " +
            (hover
              ? "h-full opacity-100 blur-sm brightness-50"
              : "h-[250px] opacity-0")
          }
        />
        <div
          className={
            "flex flex-1 flex-col gap-2 p-5 text-center " +
            " " +
            (hover ? "opacity-0" : "")
          }
        >
          <h1
            className={
              "grid min-h-[64px] place-items-center break-words text-2xl text-white" +
              " "
            }
          >
            {title}
          </h1>
          <p
            style={{ textAlignLast: "center" }}
            className={
              "pb-2 text-center font-Nunito text-base font-light text-white"
            }
          >
            {desc}
          </p>
        </div>
        <div
          className={
            "absolute bottom-0 flex flex-1 flex-col gap-2 p-5 text-center transition-all" +
            " " +
            (hover ? "-translate-y-0 opacity-100" : "-translate-y-12 opacity-0")
          }
        >
          <h1
            className={
              "grid min-h-[64px] place-items-center break-words text-2xl text-white" +
              " "
            }
          >
            {title}
          </h1>
          <p
            style={{ textAlignLast: "center" }}
            className={
              "pb-2 text-center font-Nunito text-base font-light text-white"
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
    <>
      <div className="relative mt-16 w-screen">
        <section className="container relative flex w-full flex-col items-start justify-start md:gap-3">
          <div className="flex flex-col self-center md:flex-row md:gap-2">
            <h1 className="mx-auto text-center text-4xl text-blue-500 md:text-left md:text-5xl">
              OUR ACTIVITIES
            </h1>
            <h1 className="mx-auto text-center text-4xl md:text-left md:text-5xl">
              INCLUDE
            </h1>
          </div>
          <div className="grid w-full justify-center gap-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
            {mainActivities.map(({ imgURL, title, href, desc }, i) => {
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
        </section>
      </div>
    </>
  );
};

export default ActivityCards;
