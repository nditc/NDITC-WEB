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

  if (!docSnapshot.exists)
    return NextResponse.json(
      { error: "No such Event exists" },
      { status: 404 },
    );

  const userSnapshot = await firestore
    .collection("eventparticipant")
    .doc(data.uid)
    .get();

  if (userSnapshot.exists && userSnapshot.data()?.events.includes(data.id)) {
    return NextResponse.json(
      { error: "You have already taken the exam" },
      { status: 404 },
    );
  }

  const starTime: Timestamp = await docSnapshot.data()?.date;
  const endTime: Timestamp = await docSnapshot.data()?.enddate;

  const intra = await docSnapshot.data()?.intra;
  const intraCollege = await docSnapshot.data()?.intraCollege;
  const publicQuiz = await docSnapshot.data()?.public;

  if (now < starTime) {
    return NextResponse.json(
      { error: "The exam hasn't started yet" },
      { status: 404 },
    );
  } else if (now > endTime) {
    return NextResponse.json(
      { error: "The exam was over decades ago" },
      { status: 404 },
    );
  }

  if ((data.ndc_id == "" || data.ndc_id == "none") && intra) {
    return NextResponse.json({ error: "Authorization Error" }, { status: 404 });
  }

  if (data.ndc_id != "" && data.ndc_id != "none" && intra) {
    getConnectToNDITC(data.ndc_id, data.email)
      .then((r) => r.json())
      .then((resp) => {
        if (!resp.success) {
          return NextResponse.json(
            { error: "No such Member exists" },
            { status: 404 },
          );
        }
      })
      .catch(() => {
        return NextResponse.json(
          { error: "No such Member exists" },
          { status: 404 },
        );
      });
  }

  if (intraCollege && (!data.ndc_roll || data.ndc_roll == "")) {
    return NextResponse.json(
      { error: "Only Damians are allowed in this exam" },
      { status: 404 },
    );
  }

  if (!data.uid || data.uid == "") {
    return NextResponse.json({ error: "Authorization Error" }, { status: 404 });
  }

  return NextResponse.json({
    ...docSnapshot.data(),
    enddate: docSnapshot.data()?.enddate.toMillis(),
    date: "",
    addTime: "",
  });
}
