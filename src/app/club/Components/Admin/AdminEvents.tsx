import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import AdminEventCard from "./AdminEventCard";
import { db } from "@/config/firebase";
import { getDocs, query, collection, orderBy, limit } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AdminEvents = ({ adminAuth }: { adminAuth: boolean }) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!adminAuth) return;
    const docs = getDocs(
      query(collection(db, "events"), limit(10), orderBy("addTime", "desc"))
    ).then(async (data) => {
      const eventData: any = [];
      await data.forEach((e) => {
        eventData.push({ id: e.id, data: e.data() });
      });

      setEvents(eventData);
    });
  }, [adminAuth]);

  return (
    <div className="container p-6 md:p-8 pb-2 md:pb-4 bg-white rounded-xl my-8">
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          <MdOutlineEventNote className="w-12 h-12 text-primary" />

          <h1 className="text-4xl leading-none">
            <span className="">EVENTS</span>
          </h1>
        </div>
        <div>
          <Link
            type={"button"}
            href={`/admin/events/new`}
            className="hover:bg-primary_dark hover:text-white  text-sm flex-1 justify-center transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
          >
            <FaPlus className="w-6 h-6" />
            Add Event
          </Link>
        </div>
      </div>

      <div className="flex gap-5 my-10 h-[650px] resize-y overflow-y-scroll overflow-x-clip flex-wrap">
        {events.map((e: any, i: number) => {
          return (
            <AdminEventCard
              title={e.data.eventName}
              date={e.data.date}
              endDate={e.data.enddate}
              image={e.data.imageURL}
              desc={e.data.description}
              ongoing={false}
              id={e.id}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminEvents;
