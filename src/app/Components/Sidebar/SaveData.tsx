"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SaveData = ({ data }: { data: any }) => {
  const [isNew, setIsNew] = useState(false);

  const NewNotification = JSON.stringify(data[0].title);

  useEffect(() => {
    const savedNotification = localStorage.getItem("latestNotification");

    if (savedNotification != null) {
      if (NewNotification != savedNotification) {
        setIsNew(true);
      } else {
        setIsNew(false);
      }
    } else {
      setIsNew(true);
    }
  }, [NewNotification]);

  return (
    <div
      onClick={() => {
        localStorage.setItem("latestNotification", NewNotification);
        setIsNew(false);
      }}
      className="transition-all rounded-full bg-white shadow-[5px_5px_20px_15px_#00000024] p-1"
    >
      <Link
        href={
          isNew
            ? `/notifications/details/${encodeURIComponent(
                data[0].details_url
              )}`
            : "/notifications"
        }
        className="text-black mt-2 relative"
      >
        {isNew && (
          <div className="w-3 h-3 bg-red-700 rounded-full absolute right-0 top-0" />
        )}
        <svg
          className="bellSVG w-6 h-6 transition-all hover:scale-125"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19 19"
        >
          <g className="too-big-actually">
            <g className={`${isNew ? "bell-whole" : ""}`}>
              <path
                className={`bell-part ${isNew ? "bell-part--ringer" : ""}`}
                d="M9.5,17.5a2,2,0,0,0,2-2h-4A2,2,0,0,0,9.5,17.5Z"
              />
              <path
                className="bell-part bell-part--main"
                d="M16.23,12.82c-.6-.65-1.73-1.62-1.73-4.82a4.93,4.93,0,0,0-4-4.85V2.5a1,1,0,0,0-2,0v.65A4.94,4.94,0,0,0,4.5,8c0,3.2-1.13,4.17-1.73,4.82a1,1,0,0,0-.27.68,1,1,0,0,0,1,1h12a1,1,0,0,0,1-1A1,1,0,0,0,16.23,12.82Z"
              />
            </g>
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default SaveData;
