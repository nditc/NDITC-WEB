import { initAdmin } from "@/config/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await initAdmin();

  const firestore = getFirestore();

  await firestore
    .collection("eventparticipant")
    .doc(data.uid)
    .delete()
    .then(() => {
      return NextResponse.json({});
    })
    .catch((e) => {
      return NextResponse.json({ error: "Server Error" }, { status: 404 });
    });
}
