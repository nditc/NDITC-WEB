import EventCard from "@/app/club/Components/Events/EventCard";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initAdmin } from "@/config/firebaseAdmin";
import EventList from "../Components/Events/EventList";
import { createCipheriv } from "crypto";

const page = async () => {
  await initAdmin();

  const encryption_key = "kjfofvdhjHjgrmgherTtyLJfVbshJbvQ"; // Must be 32 characters
  const initialization_vector = "X05IGQ5qdBnIqAWD"; // Must be 16 characters

  function encrypt(text: string) {
    const cipher = createCipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector),
    );
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  //const now = Timestamp.now();

  const firestore = getFirestore();

  const collectionSnapshot = await firestore
    .collection("events")
    .orderBy("date", "desc")
    .limit(9)
    .get();

  const eventList: any[] = collectionSnapshot.docs.map((e) => ({
    id: encrypt(e.id),
    ...e.data(),
  }));

  console.log(eventList);

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <div className="container py-[81px]">
        <h1 className="container my-8 text-5xl">
          <span className="text-primary">ALL</span> EVENTS
        </h1>

        <EventList eventList={eventList} />
      </div>
    </main>
  );
};

export default page;
