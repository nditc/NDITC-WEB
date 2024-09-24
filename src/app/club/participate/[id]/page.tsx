"use client";

import Error from "@/app/club/Components/Error";
import AnswerSheet from "@/app/club/Components/Participate/AnswerSheet";
import { createDecipheriv } from "crypto";
import { useUserDataContext } from "../../Components/Layout/UserDataProvider";
import { useAuthContext } from "../../Components/Layout/AuthContextProvider";
import { CgSpinner } from "react-icons/cg";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";

const getQuestions = async (
  id: string,
  ndc_id: string,
  uid: string,
  email: string,
) => {
  const res = await fetch("/api/getquestion", {
    method: "POST",
    body: JSON.stringify({ id: id, ndc_id: ndc_id, uid: uid, email: email }),
  });

  return res;
};

const Page = ({ params }: { params: { id: string } }) => {
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

  const { userData, userDataLoading, dataError } = useUserDataContext();

  const { userAuth, loading, error } = useAuthContext();

  const id = decrypt(params.id);

  const uidVal = userAuth?.uid;
  const memberidval = userData?.ndc_id;

  if (userDataLoading || loading)
    return (
      <div className="grid h-screen w-full place-items-center">
        <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
      </div>
    );

  if (error || dataError)
    return <Error statusCode={403} msg="Authorization Error" dest="/club" />;

  // Get those functionalities in the getQuestion API Route

  const [docSnapshot, setDocSnapShot] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState("");

  useEffect(() => {
    if (!loading && !userDataLoading) {
      getQuestions(id, memberidval, uidVal || "", userAuth?.email || "")
        .then((r) => r.json())
        .then((resp) => {
          setIsLoading(false);
          setDocSnapShot(resp);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError("Error Occurred");
        });
    }

    if (error || dataError) {
      setIsLoading(false);
      setIsError("Error Occurred");
    }
  }, [userAuth, userData, loading, userDataLoading, error, dataError]);

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      {isError != "" && <Error statusCode={999} msg={isError} dest="/club" />}
      {isLoading && <Loading />}
      {!isLoading && isError == "" && (
        <div className="container py-8">
          <AnswerSheet
            endTime={docSnapshot?.enddate}
            id={params.id}
            questions={docSnapshot?.questions}
            name={docSnapshot?.eventName}
            img={docSnapshot?.imageURL}
            category={docSnapshot?.category}
            description={docSnapshot?.description}
            showResult={docSnapshot?.showResult}
            publicQuiz={docSnapshot?.public}
          />
        </div>
      )}
    </main>
  );
};

export default Page;
