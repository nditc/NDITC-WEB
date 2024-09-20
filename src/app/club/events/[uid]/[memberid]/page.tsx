import EventCard from "@/app/club/Components/Events/EventCard";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initAdmin } from "@/config/firebaseAdmin";
import { createDecipheriv } from "crypto";
import ActualUser from "@/util/ActualUser";
import MemberCheck from "@/util/MemberCheck";
import EventList from "@/app/club/Components/Events/EventList";

export const dynamic = "force-dynamic";

const page = async ({
  params,
}: {
  params: { uid: string; memberid: string };
}) => {
  await initAdmin();

  const encryption_key = "kjfofvdhjHjgrmgherTtyLJfVbshJbvQ"; // Must be 32 characters
  const initialization_vector = "X05IGQ5qdBnIqAWD"; // Must be 16 characters

  function decrypt(text: any) {
    const decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector),
    );
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }

  const uidVal = params.uid && (await decrypt(params.uid));
  const memberidVal = params.memberid && (await decrypt(params.memberid));

  const now = Timestamp.now();

  const firestore = getFirestore();

  const getUserParticipatedSnapshot = await firestore
    .collection("eventparticipant")
    .doc(uidVal)
    .get();

  const userParticipated: string[] = getUserParticipatedSnapshot.data()?.events;

  const ongoingSnapshot =
    memberidVal != "none"
      ? await firestore
          .collection("events")
          .where("date", "<=", now)
          .where("enddate", ">=", now)
          .orderBy("enddate", "asc")
          .get()
      : await firestore
          .collection("events")
          .where("date", "<=", now)
          .where("enddate", ">=", now)
          .where("intra", "==", false)
          .orderBy("enddate", "asc")
          .get();

  const ongoingList: any[] = ongoingSnapshot.docs
    .map((e) => ({
      id: e.id,
      ...e.data(),
    }))
    .filter((e) => {
      if (userParticipated) {
        return !userParticipated.includes(e.id);
      } else {
        return e;
      }
    });

  const collectionSnapshot = await firestore
    .collection("events")
    .orderBy("date", "desc")
    .limit(5)
    .get();

  const eventList: any[] = collectionSnapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <ActualUser passedUID={uidVal} />
      <MemberCheck urlMemberID={memberidVal} noDeepMemberCheck={true} />
      <div className="container py-[81px]">
        {ongoingList.length != 0 && (
          <div>
            <h1 className="container my-8 text-5xl">
              <span className="text-primary">ONGOING</span> EVENTS
            </h1>

            <EventList eventList={ongoingList} participate />
          </div>
        )}

        <h1 className="container my-8 text-5xl">
          <span className="text-primary">ALL</span> EVENTS
        </h1>

        <EventList eventList={eventList} />
      </div>
    </main>
  );
};

export default page;
