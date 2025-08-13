"use client";

import Error from "@/app/club/Components/Error";
import AnswerSheet from "@/app/club/Components/Participate/AnswerSheet";
import { createDecipheriv } from "crypto";
import { useUserDataContext } from "@/app/_context/UserDataProvider";

import { useAuthContext } from "@/app/_context/AuthContextProvider";
import { CgSpinner } from "react-icons/cg";
import { useEffect, useState, use } from "react";
import Loading from "../../Components/Loading";

const getQuestions = async (
  id: string,
  ndc_id: string,
  uid: string,
  email: string,
  ndc_roll: string,
) => {
  const res = await fetch("/api/getquestion", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      ndc_id: ndc_id,
      uid: uid,
      email: email,
      ndc_roll,
    }),
    cache: "no-store",
  });

  return res;
};

const Page = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
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

  const [docSnapshot, setDocSnapShot] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState("");

  useEffect(() => {
    if (!loading && !userDataLoading) {
      getQuestions(
        id,
        memberidval,
        uidVal || "",
        userAuth?.email || "",
        userData?.ndc_roll || "",
      )
        .then((r) => r.json())
        .then((resp) => {
          setIsLoading(false);
          setDocSnapShot(resp);

          if (resp.error) {
            setIsLoading(false);
            setIsError(resp.error || "Error Occurred");
          }
        });
    }

    if (error || dataError) {
      setIsLoading(false);
      setIsError("Error Occurred");
    }
  }, [userAuth, userData, loading, userDataLoading, error, dataError]);

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      {isError != "" && <Error statusCode={403} msg={isError} dest="/club" />}
      {isLoading && <Loading />}
      {!isLoading && isError == "" && docSnapshot.questions && (
        <div className="container py-8">
          <AnswerSheet
            endTime={docSnapshot?.enddate}
            id={id}
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
