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
      query(collection(db, "events"), limit(10), orderBy("addTime", "desc")),
    ).then(async (data) => {
      const eventData: any = [];
      await data.forEach((e) => {
        eventData.push({ id: e.id, data: e.data() });
      });

      setEvents(eventData);
    });
  }, [adminAuth]);

  return (
    <div className="container my-8 rounded-xl bg-white p-6 pb-2 md:p-8 md:pb-4">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-5">
          <MdOutlineEventNote className="h-12 w-12 text-primary" />

          <h1 className="text-4xl leading-none">
            <span className="">EVENTS</span>
          </h1>
        </div>
        <div>
          <Link
            type={"button"}
            href={`/club/admin/eventEdit/new`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
          >
            <FaPlus className="h-6 w-6" />
            Add Event
          </Link>
        </div>
      </div>

      <div className="my-10 flex resize-y flex-wrap gap-5 overflow-x-clip overflow-y-scroll">
        {events.map((e: any, i: number) => {
          return (
            <AdminEventCard
              title={e.data.eventName}
              date={e.data.date}
              endDate={e.data.enddate}
              image={e.data.imageURL}
              desc={e.data.description}
              ongoing={false}
              category={e.data.category}
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
