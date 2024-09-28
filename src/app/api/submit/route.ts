import { initAdmin } from "@/config/firebaseAdmin";
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  await initAdmin();

  const now = Timestamp.now();

  const firestore = getFirestore();

  const correctAnswer = await firestore
    .collection("answers")
    .doc(data.id)
    .get();

  if (!correctAnswer.exists) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const correctAnswerDoc = correctAnswer.data();

  const timeUp = now > correctAnswerDoc?.enddate;
  const notTime = now < correctAnswerDoc?.date;

  const intra = await correctAnswerDoc?.intra;
  const intraCollege = await correctAnswerDoc?.intraCollege;
  const publicQuiz = await correctAnswerDoc?.public;

  if (timeUp || notTime) {
    return NextResponse.json({ error: "Time Error" }, { status: 999 });
  }

  const eventParticipantDoc = await firestore
    .collection("eventparticipant")
    .doc(data.uid)
    .get();

  const participatedEvents: any[] = eventParticipantDoc.exists
    ? eventParticipantDoc.data()?.events
    : [];

  const totalPoints = eventParticipantDoc.exists
    ? eventParticipantDoc.data()?.points
    : 0;

  if (participatedEvents && participatedEvents.includes(data.id)) {
    return NextResponse.json(
      { error: "You have already taken the exam!" },
      { status: 555 },
    );
  }

  let marks: number = 0;
  let examMarks: number = 0;

  correctAnswerDoc?.answers.forEach(
    async (
      e: {
        mcq: boolean;
        point: number;
        correctOption: number;
        correctAnswers: string;
      },

      i: number,
    ) => {
      examMarks = examMarks + e.point;

      if (e.mcq) {
        if (data.answers[i].option == e.correctOption) {
          marks = marks + e.point;
        }
      } else {
        const correctAnswers = e.correctAnswers.toString().split(";");

        if (correctAnswers.includes(data.answers[i].answer)) {
          marks = marks + e.point;
        }
      }
    },
  );

  const newParticipatedEvents = [...participatedEvents, data.id];

  if (intra || intraCollege) {
    firestore
      .collection("eventparticipant")
      .doc(data.uid)
      .set({
        points: totalPoints,
        events: newParticipatedEvents,
      })
      .then(() => {
        firestore
          .collection("eventparticipant")
          .doc(data.uid)
          .collection("eventsData")
          .doc(data.id)
          .set({
            marks: marks,
            uid: data.uid,
            time: now,
            answers: data.answers,
          })
          .then(() => {
            firestore
              .collection("answers")
              .doc(data.id)
              .collection("eventparticipant")
              .doc(data.uid)
              .set({
                marks: marks,
                uid: data.uid,
                time: now,
                answers: data.answers,
              })
              .catch(() => {
                return NextResponse.json(
                  { error: "Internal Server Error" },
                  { status: 500 },
                );
              });
          })
          .catch(() => {
            return NextResponse.json(
              { error: "Internal Server Error" },
              { status: 500 },
            );
          });
      })
      .catch(() => {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      });
  } else {
    firestore
      .collection("eventparticipant")
      .doc(data.uid)
      .set({
        points: totalPoints + marks,
        events: newParticipatedEvents,
      })
      .then(() => {
        firestore
          .collection("eventparticipant")
          .doc(data.uid)
          .collection("eventsData")
          .doc(data.id)
          .set({
            marks: marks,
            uid: data.uid,
            time: now,
            answers: data.answers,
          })
          .catch(() => {
            return NextResponse.json(
              { error: "Internal Server Error" },
              { status: 500 },
            );
          });
      })
      .catch(() => {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      });
  }

  return NextResponse.json({
    examMarks: examMarks,
    result: marks,
    totalMarks: totalPoints + marks,
  });
}
