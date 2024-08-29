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
}: {
  endTime: number;
  id: string;
  questions: Questions[];
  uid: string;
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
      <div className="container py-[81px]">
        <Timer endTime={endTime} onEnd={SubmitFunc} />

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <Card className="h-full w-full border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
                  <CardBody className="items-center justify-center pb-0">
                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-white",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white",
                      }}
                      value={(resultMarks / examMarks) * 100}
                      strokeWidth={4}
                      showValueLabel={true}
                    />
                  </CardBody>
                  <CardFooter className="flex-col items-center justify-center gap-3 pt-0">
                    <Chip
                      classNames={{
                        base: "border-1 border-white/30",
                        content: "text-white/90 text-small font-semibold",
                      }}
                      variant="bordered"
                    >
                      {`Result: ${resultMarks} / ${examMarks}`}
                    </Chip>

                    <Chip
                      classNames={{
                        base: "border-1 border-white/30",
                        content: "text-white/90 text-small font-semibold",
                      }}
                      variant="bordered"
                    >
                      Season's Total Marks: {totalMarks}
                    </Chip>

                    <Button
                      className="w-full border bg-transparent"
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

        <div>
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
      <button
        onClick={SubmitFunc}
        disabled={submitClicked}
        className="before:ease Inter relative flex w-full items-center self-center overflow-hidden rounded-lg border bg-primary_dark px-6 py-3 text-center font-ShareTechTown text-sm font-medium text-white shadow-2xl transition before:absolute before:left-0 before:-ml-2 before:h-[30rem] before:w-[30rem] before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary before:transition-all before:duration-300 hover:scale-110 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-secondary md:w-fit lg:px-3 xl:px-5"
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
