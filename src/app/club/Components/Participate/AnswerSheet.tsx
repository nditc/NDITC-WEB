"use client";

import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../Layout/AuthContextProvider";
import Timer from "./Timer";
import Question from "./Question";
import { useState } from "react";
import { RiContactsBookUploadLine } from "react-icons/ri";
import ActualUser from "@/util/ActualUser";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { CiCircleInfo, CiWarning } from "react-icons/ci";
import InfoBox from "../InfoBox";

interface Questions {
  mcq: boolean;
  question: string;
  option0: string;
  option1: string;
  option2: string;
  option3: string;
  point: number;
}

interface answerInterface {
  option: number;
  answer: string;
}

const getResult = async (answers: any, uid: string, id: string) => {
  const res = await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify({ answers: answers, uid: uid, id: id }),
  });

  if (!res.ok) {
    toast.error("Error Occurred");
    return [];
  }

  return res.json();
};

const AnswerSheet = ({
  endTime,
  id,
  questions,
  uid,
  name,
  img,
  category,
  description,
}: {
  endTime: number;
  id: string;
  questions: Questions[];
  uid: string;
  name: string;
  img: string;
  category: string;
  description: string;
}) => {
  const [answers, setAnswers] = useState<answerInterface[]>(
    Array(questions.length).fill({ option: 5, answer: "" }),
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const setAnswerData = (
    chosenOption: number,
    givenAnswer: string,
    i: number,
  ) => {
    const ansArr: answerInterface[] = answers.map((e, index) => {
      if (index === i) {
        return { option: chosenOption, answer: givenAnswer };
      } else {
        return e;
      }
    });

    setAnswers(ansArr);
  };

  const currentUID = useAuthContext().userAuth?.uid;

  //------------Submission-----------

  const [submitClicked, setSubmitClicked] = useState(false);

  const [examMarks, setExamMarks] = useState(1);
  const [resultMarks, setResultMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const SubmitFunc = async () => {
    setSubmitClicked(true);
    if (currentUID != uid) {
      setSubmitClicked(false);
      return <ActualUser passedUID={uid} />;
    }

    getResult(answers, uid, id).then((res) => {
      setExamMarks(res.examMarks);
      setResultMarks(res.result);
      setTotalMarks(res.totalMarks);
      onOpen();
      setSubmitClicked(false);
    });
  };

  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <div className="container pt-[81px]">
        <div className="sticky top-[-16px] z-20 flex flex-col items-center justify-between gap-2 rounded-xl bg-white p-5 pb-1 shadow-md sm:top-[0] sm:pb-5 md:top-[75px] md:flex-row">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row">
            <img
              src={img}
              alt=""
              className="hidden h-[100px] w-full rounded-lg object-cover md:block md:w-[250px]"
            />
            <div className="flex flex-col gap-1 text-center md:text-start">
              <p className="Inter font-semibold text-primary">
                {category || "Contest"}
              </p>
              <h3 className="text-4xl">{name}</h3>
            </div>
          </div>
          <div className="justify-self-end">
            <Timer endTime={endTime} onEnd={SubmitFunc} />
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <Card className="h-full w-full border-none bg-gradient-to-br from-white to-white">
                  <CardBody className="items-center justify-center pb-0">
                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 ",
                        indicator: "stroke-primary",
                        track: "stroke-zinc-100",
                        value: "text-3xl font-semibold text-black",
                      }}
                      value={(resultMarks / examMarks) * 100}
                      strokeWidth={4}
                      showValueLabel={true}
                    />
                  </CardBody>
                  <CardFooter className="flex-col items-center justify-center gap-3 pt-0">
                    <Chip
                      classNames={{
                        base: "bg-zinc-200/60",
                        content: "text-black/90 text-small font-semibold",
                      }}
                    >
                      <span>
                        Result:{" "}
                        <span className="text-primary">{resultMarks}</span> /{" "}
                        {examMarks}
                      </span>
                    </Chip>

                    <Chip
                      classNames={{
                        base: "bg-zinc-200/60",
                        content: "text-black/90 text-small font-semibold",
                      }}
                    >
                      Season's Total Marks:{" "}
                      <span className="text-primary">{totalMarks}</span>
                    </Chip>

                    <Button
                      className="w-full border bg-primary text-white hover:bg-primary_dark"
                      color="primary"
                      onPress={() => {
                        setSubmitClicked(false);
                        onClose();
                        router.push("/club");
                      }}
                    >
                      Got It!
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
          </ModalContent>
        </Modal>

        <h3 className="Inter mb-2 mt-8 text-center text-3xl font-bold opacity-50">
          Questions
        </h3>

        <div className="mt-3 grid grid-cols-1 gap-4">
          {questions.map((e, i) => {
            return (
              <Question
                mcq={e.mcq}
                question={e.question}
                option0={e.option0}
                option1={e.option1}
                option2={e.option2}
                option3={e.option3}
                point={e.point}
                index={i}
                setAnswerData={setAnswerData}
                selectedOption={answers[i].option}
                givenAnswer={answers[i].answer}
                key={i}
              />
            );
          })}
        </div>
      </div>
      <InfoBox title="Warning" icon={<CiWarning />} type="warning">
        Recheck before submitting your answers. Submission after time will not
        be allowed
      </InfoBox>
      <button
        onClick={SubmitFunc}
        disabled={submitClicked}
        className="before:ease Inter relative ml-auto flex w-full items-center justify-end self-end overflow-hidden rounded-lg border bg-primary_dark px-6 py-3 text-center font-ShareTechTown text-sm font-medium text-white shadow-2xl transition before:absolute before:left-0 before:-ml-2 before:h-[30rem] before:w-[30rem] before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary before:transition-all before:duration-300 hover:scale-110 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-secondary md:w-fit lg:px-3 xl:px-5"
      >
        {submitClicked ? (
          <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
        ) : (
          <div className="relative z-10 flex h-full w-full items-center justify-center gap-3">
            <RiContactsBookUploadLine className="h-7 w-7" />
            <p className="text-xl">Submit</p>
          </div>
        )}
      </button>
    </main>
  );
};

export default AnswerSheet;
