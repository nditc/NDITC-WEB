"use client";
import { db } from "@/config/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { MdAnnouncement } from "react-icons/md";

interface Announcement {
  id: string;
  title: string;
  description: string;
  timestamp: Timestamp;
  order: number;
  club: boolean;
}

const Announcements = ({ club }: { club?: boolean }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);

        const querySnapshot = await getDocs(collection(db, "announcements"));
        const allAnnouncements: Announcement[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Announcement[];

        // Filter by club only if prop is provided
        const filtered = club === undefined
          ? allAnnouncements
          : allAnnouncements.filter(a => a.club === club);

        // Sort locally by order descending (latest first)
        const sorted = filtered.sort((a, b) => (b.order || 0) - (a.order || 0));

        // Take first 3
        setAnnouncements(sorted.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError("general");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [club]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="container my-4 rounded-xl bg-white p-5 pb-2 pt-6 md:my-8 md:p-8 md:pb-4">
        <div className="ml-2 flex items-center gap-3">
          <MdAnnouncement className="h-8 w-8 text-primary xsm:h-10 xsm:w-10" />
          <h1 className="mt-1 text-3xl leading-none xsm:text-4xl">
            <span className="text-primary">{club ? "NDITC" : ""}</span> NOTICE
          </h1>
        </div>
        <div className="my-5 flex max-h-[550px] flex-col gap-5">
          {[1, 2, 3].map((item) => (
            <div className="rounded-xl bg-gray-100 p-5" key={item}>
              <div className="h-6 w-3/4 animate-pulse bg-gray-300 mb-3"></div>
              <div className="h-4 w-full animate-pulse bg-gray-300 mb-2"></div>
              <div className="h-4 w-2/3 animate-pulse bg-gray-300"></div>
              <div className="flex justify-end mt-3">
                <div className="h-4 w-1/4 animate-pulse bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // General error
  if (error === "general") {
    return (
      <div className="container my-4 rounded-xl bg-white p-5 pb-2 pt-6 md:my-8 md:p-8 md:pb-4">
        <div className="ml-2 flex items-center gap-3">
          <MdAnnouncement className="h-8 w-8 text-primary xsm:h-10 xsm:w-10" />
          <h1 className="mt-1 text-3xl leading-none xsm:text-4xl">
            <span className="text-primary">{club ? "NDITC" : ""}</span> NOTICE
          </h1>
        </div>
        <div className="my-4 rounded-xl bg-red-50 p-4 border border-red-200">
          <p className="text-red-700">Failed to load announcements. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="container my-4 rounded-xl bg-white p-5 pb-2 pt-6 md:my-8 md:p-8 md:pb-4">
      <div className="ml-2 flex items-center gap-3">
        <MdAnnouncement className="h-8 w-8 text-primary xsm:h-10 xsm:w-10" />
        <h1 className="mt-1 text-3xl leading-none xsm:text-4xl">
          <span className="text-primary">{club ? "NDITC" : ""}</span> NOTICE
        </h1>
      </div>

      <div className="my-5 flex max-h-[550px] flex-col gap-5 overflow-x-clip overflow-y-scroll">
        {announcements.length > 0 ? (
          announcements.map((data) => {
            let dateString = "Date not available";
            try {
              if (data.timestamp && typeof data.timestamp.toDate === "function") {
                dateString = data.timestamp.toDate().toDateString();
              } else if (data.timestamp && data.timestamp.seconds) {
                dateString = new Date(data.timestamp.seconds * 1000).toDateString();
              }
            } catch (error) {
              console.error("Error parsing timestamp:", error);
            }

            return (
              <div className="rounded-xl bg-gray-100 p-5" key={data.id}>
                <h3 className="Nunito text-xl font-bold">{data.title || "Untitled Announcement"}</h3>
                <p className="min-h-[80px] md:min-h-0 mt-2 text-gray-700">
                  {data.description || "No description available"}
                </p>
                <div className="Nunito mt-4 flex items-center justify-end gap-2 text-sm text-zinc-500">
                  <BsClock className="h-4 w-4 text-zinc-500" />
                  {dateString}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg p-8 text-center text-zinc-400 bg-gray-100">
            <p className="text-lg">No Notices Yet</p>
            <p className="text-sm mt-1">Check back later for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
