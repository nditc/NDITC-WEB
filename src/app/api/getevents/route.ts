import { initAdmin } from "@/config/firebaseAdmin";
import { createCipheriv, createDecipheriv } from "crypto";
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

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

  const uidVal = data.uid;
  const memberidVal = data.ndc_id;
  const ndc_roll = data.ndc_roll;

  const now = Timestamp.now();

  const firestore = getFirestore();

  const getUserParticipatedSnapshot = await firestore
    .collection("eventparticipant")
    .doc(uidVal)
    .get();

  const userParticipated: string[] = getUserParticipatedSnapshot.data()?.events;

  const query = firestore
    .collection("events")
    .where("date", "<=", now)
    .where("enddate", ">=", now)
    .orderBy("enddate", "asc");

  if (memberidVal == "none" || memberidVal == "")
    query.where("intra", "==", false);

  if (ndc_roll == "") query.where("intra_college", "==", false);

  const ongoingSnapshot = await query.get();

  /*.catch(() => {
    return NextResponse.json({ error: "Error Occurred" }, { status: 404 });
  });*/

  const ongoingList: any[] = ongoingSnapshot.docs
    .map((e) => ({
      id: e.id,
      eventName: e.data().eventName,
      date: e.data().date,
      enddate: e.data().enddate,
      imageURL: e.data().imageURL,
      description: e.data().description,
      category: e.data().category,
    }))
    .filter((e) => {
      if (userParticipated) {
        return !userParticipated.includes(e.id);
      } else {
        return e;
      }
    })
    .map((e) => ({ ...e, id: encrypt(e.id) }));

  const collectionSnapshot = await firestore
    .collection("events")
    .orderBy("date", "desc")
    .limit(5)
    .get();

  const eventList: any[] = collectionSnapshot.docs.map((e: any) => ({
    id: encrypt(e.id),
    eventName: e.data().eventName,
    date: e.data().date,
    enddate: e.data().enddate,
    imageURL: e.data().imageURL,
    description: e.data().description,
    category: e.data().category,
    participated: userParticipated.includes(e.id),
  }));

  return NextResponse.json({
    ongoingList: ongoingList,
    eventList: eventList,
  });
}
