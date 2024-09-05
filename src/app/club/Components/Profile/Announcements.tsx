"use client";
import { db } from "@/config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { GrAnnounce } from "react-icons/gr";
import { toast } from "react-toastify";
const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  useEffect(() => {
    getDocs(query(collection(db, "announcements"), orderBy("order"), limit(3)))
      .then((docs) => {
        const annc: any[] = [];
        docs.forEach((data) => {
          annc.push(data.data());
        });
        annc.reverse();
        setAnnouncements(annc);
      })
      .catch((err) => {
        toast.error("Announcements can't be loaded");
        console.error(err);
      });
  }, []);
  return (
    <div className="container my-4 rounded-xl bg-white p-5 pb-2 pt-6 md:my-8 md:p-8 md:pb-4">
      <div className="ml-2 flex items-center gap-3">
        <GrAnnounce className="h-8 w-8 text-primary xsm:h-10 xsm:w-10" />
        <h1 className="mt-1 text-3xl leading-none xsm:text-4xl">
          ANNOUNCEMENTS
        </h1>
      </div>
      <div className="my-5 flex max-h-[550px] flex-col gap-5 overflow-x-clip overflow-y-scroll">
        {announcements.map((data: any, index: number) => {
          return (
            <div className="rounded-xl bg-gray-100 p-5" key={index}>
              <h3 className="Nunito text-xl font-bold">{data.title}</h3>
              <p className="min-h-[80px] md:min-h-0">{data.description}</p>

              <div className="Nunito mt-2 flex items-center justify-end gap-2 text-sm text-zinc-500">
                <BsClock className="h-4 w-4 text-zinc-500" />
                {new Date(data.timestamp.seconds * 1000).toDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
