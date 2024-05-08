"use client";
import Image from "next/image";
import "./upcoming.css";
import { useState, useEffect } from "react";
import { AES } from "crypto-js";
import Link from "next/link";

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
    <div className="right-part pt-5 ml-5 md:ml-0">
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

  const detailsEncrypt = AES.encrypt(actionButtonRedirect2, "SWAPNIL");

  return (
    <div id="upcoming_event_container relative bg-white">
      <div className="blog-section shadow-[09px_13px_40px_10px_#00000024]">
        <div className="absolute -z-10 right-0 w-full h-full">
          <Image
            src={image}
            alt={"Image"}
            className="object-right object-cover gradient-mask-b-10 md:gradient-mask-l-40"
            fill
          />
        </div>
        <div className="left-part m-5 md:ml-10 md:mr-0">
          <div id="blg_hdr">
            <h1 className="blog-title-1">{firstTwoWords}</h1>
            <h1 className="blog-title-2 text-black break-words">
              {restOfSentence}
            </h1>
          </div>
          <p className="blog-content line-clamp-5">{description}</p>
          <div className="buttons flex flex-col sm:flex-row gap-2 sm:gap-5 mt-2 sm:mt-4">
            <a
              href={actionButtonRedirect1}
              className="register-button flex items-center justify-center"
            >
              <div>{actionButtonTitle1}</div>
            </a>
            <Link
              href={`/details/${encodeURIComponent(
                detailsEncrypt.toString()
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
