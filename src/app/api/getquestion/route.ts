import { initAdmin } from "@/config/firebaseAdmin";
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

const getConnectToNDITC = async (ndc_id: string, email: string) => {
  const res = await fetch("/api/createaccountndc", {
    method: "POST",
    body: JSON.stringify({ ndc_id: ndc_id, email: email }),
  });

  return res;
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  await initAdmin();

  const now = Timestamp.now();

  const firestore = getFirestore();

  const docSnapshot = await firestore.collection("events").doc(data.id).get();

  if (!docSnapshot.exists) return NextResponse.error();

  const userSnapshot = await firestore
    .collection("eventparticipant")
    .doc(data.uid)
    .get();

  if (userSnapshot.exists && userSnapshot.data()?.events.includes(data.id)) {
    return NextResponse.error();
  }

  const starTime: Timestamp = await docSnapshot.data()?.date;
  const endTime: Timestamp = await docSnapshot.data()?.enddate;

  const intra = await docSnapshot.data()?.intra;
  const intraCollege = await docSnapshot.data()?.intraCollege;
  const publicQuiz = await docSnapshot.data()?.public;

  if (now < starTime) {
    return NextResponse.error();
  } else if (now > endTime) {
    return NextResponse.error();
  }

  if ((data.ndc_id == "" || data.ndc_id == "none") && intra) {
    return NextResponse.error();
  }

  if (data.ndc_id != "" && data.ndc_id != "none" && intra) {
    getConnectToNDITC(data.ndc_id, data.email)
      .then(() => {})
      .catch(() => {
        return NextResponse.error();
      });
  }

  if (intraCollege) {
  }

  return NextResponse.json({
    ...docSnapshot.data(),
    enddate: docSnapshot.data()?.enddate.toMillis(),
    date: "",
    addTime: "",
  });
}