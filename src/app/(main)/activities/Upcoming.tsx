"use client";
import Image from "next/image";
import "./upcoming.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { encrypt } from "@/util/Encrypt";

interface Props {
  category: string;
  title: string;
  description: string;
  actionButtonTitle1: string;
  actionButtonRedirect1: string;
  actionButtonTitle2: string;
  actionButtonRedirect2: string;
  image: string;
  timestamp: number;
}

const RemainingTime = ({ time }: { time: number }) => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
  });
  function getTimeLeft(targetTime: any) {
    // Get the current time and target time
    const currentTime = new Date().getTime();
    const remainingTime = targetTime * 1000 - currentTime;

    // Calculate the remaining time
    const months = remainingTime / (1000 * 60 * 60 * 24 * 30);
    const days = (remainingTime / (1000 * 60 * 60 * 24)) % 30;
    const hours = (remainingTime / (1000 * 60 * 60)) % 24;

    setTimeLeft({
      months: months,
      days: days,
      hours: hours,
    });
  }
  useEffect(() => {
    setInterval(() => {
      getTimeLeft(time);
    }, 1000);
  }, [time]);

  return (
    <div className="right-part ml-5 pt-5 md:ml-0">
      <div className="circle1">
        <div className="number text-white">
          {timeLeft.hours >= 1 ? Math.floor(timeLeft.months) : 0}
        </div>
        <div className="word text-white">Months</div>
      </div>
      <div className="circle2">
        <div className="number text-white">
          {timeLeft.hours >= 1 ? Math.floor(timeLeft.days) : 0}
        </div>
        <div className="word text-white">Days</div>
      </div>
      <div className="circle3">
        <span className="number text-white">
          {timeLeft.hours >= 1 ? Math.floor(timeLeft.hours) : 0}
        </span>
        <span className="word text-white">Hours</span>
      </div>
    </div>
  );
};

const Upcoming = ({
  category,
  title,
  description,
  actionButtonTitle1,
  actionButtonRedirect1,
  actionButtonTitle2,
  actionButtonRedirect2,
  image,
  timestamp,
}: Props) => {
  // Split the sentence into words
  const words = title.split(" ");

  // Get the first two words
  const firstTwoWords = words.slice(0, 2).join(" ");
  const restOfSentence = words.slice(2).join(" ");

  const detailsEncrypt = encrypt(actionButtonRedirect2);

  return (
    <div id="upcoming_event_container relative bg-white">
      <div className="blog-section shadow-[09px_13px_40px_10px_#00000024]">
        <div className="absolute right-0 -z-10 h-full w-full">
          <img
            src={image}
            alt={"Image"}
            className="object-cover object-right gradient-mask-b-10 md:gradient-mask-l-40"
            fill
          />
        </div>
        <div className="left-part m-5 md:ml-10 md:mr-0">
          <div id="blg_hdr">
            <h1 className="blog-title-1">{firstTwoWords}</h1>
            <h1 className="blog-title-2 break-words text-black">
              {restOfSentence}
            </h1>
          </div>
          <p className="blog-content line-clamp-5">{description}</p>
          <div className="buttons mt-2 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:gap-5">
            <a
              href={actionButtonRedirect1}
              className="register-button flex items-center justify-center"
            >
              <div>{actionButtonTitle1}</div>
            </a>
            <Link
              href={`/details/${encodeURIComponent(
                detailsEncrypt.toString(),
              )}/${category}/${timestamp}`}
              className="learn-more-button flex items-center justify-center"
            >
              <div>{actionButtonTitle2}</div>
            </Link>
          </div>
        </div>
        <RemainingTime time={timestamp} />
      </div>
    </div>
  );
};

export default Upcoming;
