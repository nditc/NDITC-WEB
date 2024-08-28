import EventCard from "@/Components/Events/EventCard";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initAdmin } from "@/config/firebaseAdmin";

const page = async () => {
  await initAdmin();

  const now = Timestamp.now();

  const firestore = getFirestore();

  const collectionSnapshot = await firestore
    .collection("events")
    .orderBy("date", "desc")
    .limit(9)
    .get();

  const eventList: any[] = collectionSnapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <div className="container py-[81px]">
        <h1 className="container my-8 text-5xl">
          <span className="text-primary">ALL</span> EVENTS
        </h1>

        <div className="flex flex-wrap justify-between gap-5">
          {eventList.map((e, i) => {
            return (
              <EventCard
                title={e.eventName}
                date={e.date}
                endDate={e.enddate}
                ongoingForParticipate={false}
                image={e.imageURL}
                desc={e.description}
                id={e.id}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
