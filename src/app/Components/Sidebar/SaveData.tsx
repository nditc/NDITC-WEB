"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";

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
      localStorage.setItem("latestNotification", NewNotification);
    }

    console.log("---------------------");
    console.log(savedNotification);
    console.log("---------------------");
    console.log(NewNotification);
    console.log("---------------------");
  }, [NewNotification]);

  return (
    <div
      onClick={() => {
        localStorage.setItem("latestNotification", NewNotification);
        setIsNew(false);
      }}
      className="transition-all rounded-full bg-white shadow-[5px_5px_20px_15px_#00000024] p-1"
    >
      <Link href="/notifications" className="text-black mt-2">
        <IoIosNotifications
          className={`w-7 h-7 hover:scale-125 transition-all ${
            isNew ? "animate-bounce" : ""
          }`}
        />
      </Link>
    </div>
  );
};

export default SaveData;
