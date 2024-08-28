import Error from "@/Components/Error";
import { notFound } from "next/navigation";
import AnswerSheet from "@/Components/Participate/AnswerSheet";
import { initAdmin } from "@/config/firebaseAdmin";
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { createDecipheriv } from "crypto";
import ActualUser from "@/util/ActualUser";
import MemberCheck from "@/util/MemberCheck";

const page = async ({
  params,
}: {
  params: { id: string; uid: string; memberid: string };
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
  const memberidval = params.uid && (await decrypt(params.memberid));

  const now = Timestamp.now();

  const firestore = getFirestore();

  const docSnapshot = await firestore
    .collection("events")
    .doc(`${params.id}`)
    .get();

  if (!docSnapshot.exists) notFound();

  const userSnapshot = await firestore
    .collection("eventparticipant")
    .doc(`${uidVal}`)
    .get();

  if (userSnapshot.exists && userSnapshot.data()?.events.includes(params.id)) {
    return (
      <Error
        statusCode={777}
        msg="You have alraedy taken the exam!"
        location="/"
      />
    );
  }

  const starTime: Timestamp = await docSnapshot.data()?.date;
  const endTime: Timestamp = await docSnapshot.data()?.enddate;

  const intra = await docSnapshot.data()?.intra;

  if (now < starTime) {
    return (
      <Error
        statusCode={999}
        msg="The Exam hasn't started yet!"
        location="again"
      />
    );
  } else if (now > endTime) {
    return (
      <Error
        statusCode={999}
        msg="The Exam took place decades ago!"
        location="again"
      />
    );
  }

  if (memberidval == "none" && intra) {
    return (
      <Error
        statusCode={555}
        msg="You can't participate in this exam!"
        location="/"
      />
    );
  }

  const questions = docSnapshot.data()?.questions;

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <ActualUser passedUID={uidVal} />
      <MemberCheck urlMemberID={memberidval} />
      <div className="container py-[81px]">
        <AnswerSheet
          endTime={endTime.toMillis()}
          id={params.id}
          uid={uidVal}
          questions={questions}
        />
      </div>
    </main>
  );
};

export default page;
