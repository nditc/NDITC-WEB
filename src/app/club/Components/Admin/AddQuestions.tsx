import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxGear } from "react-icons/rx";
import Markdown from "react-markdown";
import { toast } from "react-toastify";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "highlight.js/styles/atom-one-light.css";
import "katex/dist/katex.min.css";

interface questionInterface {
  mcq: boolean;
  question: string;
  option0: string;
  option1: string;
  option2: string;
  option3: string;
  point: number;
  index: number;
  correctOption: number;
  correctAnswers: string;
  onValueChange?: (
    i: number,
    question: string,
    point: number,
    option0: string,
    option1: string,
    option2: string,
    option3: string,
    correctOption: number,
    correctAnswers: string,
  ) => void;
  deleteQuestion?: (index: number) => void;
}

interface answerInterface {
  mcq: boolean;
  point: number;
  correctOption: number;
  correctAnswers: string;
}

const AddQuestions = ({
  questionsData,
  answersData,
  setData,
  setQues,
  setAns,
}: {
  questionsData: any[];
  answersData: any[];
  setData: (questionData: any, answerData: any) => void;
  setQues?: (s: any) => void;
  setAns?: (s: any) => void;
}) => {
  const [questions, setQuestions] = useState<questionInterface[]>([]);
  const [answers, setAnswers] = useState<answerInterface[]>([]);

  useEffect(() => {
    setAnswers(answersData);
    setQuestions(questionsData);
  }, [questionsData, answersData]);

  const [isMCQ, setMCQ] = useState(true);

  const optionsArr = ["A", "B", "C", "D"];

  const [question, setQuestion] = useState("");
  const [option0, setOption0] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [correctOption, setCorrectOption] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState("");

  const [point, setPoint] = useState(1);

  const setOption = (i: number, value: string) => {
    switch (i) {
      case 0:
        setOption0(value);
        break;

      case 1:
        setOption1(value);
        break;

      case 2:
        setOption2(value);
        break;

      case 3:
        setOption3(value);
        break;

      default:
        break;
    }
  };

  const addQuestion = () => {
    setQuestions((oldValue: any) => {
      let sqd = [
        ...oldValue,
        {
          question: question,
          mcq: isMCQ,
          point: point,
          option0: option0,
          option1: option1,
          option2: option2,
          option3: option3,
        },
      ];
      setQues && setQues(sqd);
      return sqd;
    });

    setAnswers((oldValue: any) => {
      let sad = [
        ...oldValue,
        {
          mcq: isMCQ,
          point: point,
          correctOption: correctOption,
          correctAnswers: correctAnswers,
        },
      ];

      setAns && setAns(sad);

      return sad;
    });

    setQuestion("");
    setOption0("");
    setOption1("");
    setOption2("");
    setOption3("");
    setCorrectOption(0);
    setCorrectAnswers("");
    setPoint(1);

    toast.success("Question Added");
  };

  const onValueChange = (
    i: number,
    question: string,
    point: number,
    option0: string,
    option1: string,
    option2: string,
    option3: string,
    correctOption: number,
    correctAnswers: string,
  ) => {
    let arr = [...questions];
    arr[i].question = question;
    arr[i].point = point;
    arr[i].option0 = option0;
    arr[i].option1 = option1;
    arr[i].option2 = option2;
    arr[i].option3 = option3;

    setQuestions(arr);

    let ansArr = [...answers];

    ansArr[i].point = point;
    ansArr[i].correctOption = correctOption;
    ansArr[i].correctAnswers = correctAnswers;

    setAnswers(ansArr);
  };

  const deleteQuestion = (i: number) => {
    setQuestions((arr) => {
      return [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)];
    });

    setAnswers((arr) => {
      return [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)];
    });
  };

  useEffect(() => {
    console.log("-------------");

    console.log("qb", questions);
    console.log("ab", answers);

    console.log("-------------");
  }, [questions, answers]);

  const modifiedText = useMemo(() => {
    const lines = (question || "").split("\n");

    return lines
      .map((line, index) => {
        // Check if the line is part of a list
        const isListItem = /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(line);
        const isNextLineListItem =
          index < lines.length - 1 &&
          /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(lines[index + 1]);

        if (isListItem || isNextLineListItem) return line;

        return line + "\n";
      })
      .join("\n");
  }, [question]);

  return (
    <section className="flex w-full flex-col gap-3 py-5">
      <div className="self-center py-3 text-3xl text-primary">
        --- Questions ---
      </div>

      <div className="flex flex-col gap-3">
        {questions.length != 0 &&
          answers.length != 0 &&
          questions.map((e, i) => {
            return (
              <Question
                mcq={e.mcq}
                question={e.question}
                point={e.point}
                option0={e.option0}
                option1={e.option1}
                option2={e.option2}
                option3={e.option3}
                correctOption={answers[i].correctOption}
                correctAnswers={answers[i].correctAnswers}
                index={i}
                key={i + Math.random()}
                onValueChange={onValueChange}
                deleteQuestion={deleteQuestion}
              />
            );
          })}
      </div>

      <div className="self-center py-3 text-3xl text-primary">
        --- New Question ---
      </div>

      <div>
        <div className="flex flex-col gap-1">
          <label className="ml-2 font-medium text-gray-500" htmlFor="question">
            Question:
          </label>
          <textarea
            className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
            onChange={(e) => setQuestion(e.currentTarget.value)}
            value={question}
            name="question"
            placeholder="Question ..."
            disabled={false}
            rows={7}
          />
        </div>
        <div>
          <label className="ml-2 font-medium text-gray-500">Preview:</label>
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-3">
            <Markdown
              className={"ques"}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeHighlight, rehypeKatex]}
            >
              {modifiedText}
            </Markdown>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="ml-2 font-medium text-gray-500" htmlFor="question">
            Points:
          </label>
          <input
            className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
            onChange={(e) => setPoint(e.currentTarget.valueAsNumber)}
            value={point}
            name="points"
            placeholder="Point ..."
            disabled={false}
            type="number"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="default-checkbox1"
            type="checkbox"
            checked={isMCQ}
            onChange={(e) => setMCQ(e.currentTarget.checked)}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="default-checkbox1"
            className="ms-2 text-2xl font-medium text-gray-900"
          >
            Type: <span className="text-primary">MCQ</span>
          </label>
        </div>
      </div>

      {isMCQ ? (
        <div className="flex w-full flex-col gap-3">
          Click on the correct answer option (Required)
          {optionsArr.map((e, i) => {
            return (
              <div key={i} className="flex w-full items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCorrectOption(i);
                  }}
                  className={`h-10 w-10 shrink-0 rounded-full border border-primary_dark text-xl transition-colors ${
                    correctOption == i ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {e}
                </button>
                <input
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
                  onChange={(e) => {
                    setOption(i, e.currentTarget.value);
                  }}
                  value={
                    i == 0
                      ? option0
                      : i == 1
                        ? option1
                        : i == 2
                          ? option2
                          : i == 3
                            ? option3
                            : ""
                  }
                  placeholder="Option ..."
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-1">
            <label className="ml-2 font-medium text-gray-500" htmlFor="answer">
              Answers ( Multiple answers must be separated by ; (Semi Colon) )
            </label>
            <input
              className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
              onChange={(e) => setCorrectAnswers(e.currentTarget.value)}
              value={correctAnswers}
              name="answer"
              placeholder="Answers ..."
              disabled={false}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={addQuestion}
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
      >
        Add Question <FaPlus className="h-7 w-7" />
      </button>
    </section>
  );
};

export default AddQuestions;

const Question = ({
  mcq,
  point,
  question,
  correctAnswers,
  correctOption,
  index,
  option0,
  option1,
  option2,
  option3,
  onValueChange,
  deleteQuestion,
}: questionInterface) => {
  const optionsArr = ["A", "B", "C", "D"];

  const [editing, setEditing] = useState(false);

  const [questionVal, setQuestionVal] = useState(question);
  const [option0Val, setOption0Val] = useState(option0);
  const [option1Val, setOption1Val] = useState(option1);
  const [option2Val, setOption2Val] = useState(option2);
  const [option3Val, setOption3Val] = useState(option3);
  const [correctOptionVal, setCorrectOptionVal] = useState(correctOption);
  const [correctAnswersVal, setCorrectAnswersVal] = useState(correctAnswers);

  const [pointVal, setPointVal] = useState(point);

  const setOptionVal = (i: number, value: string) => {
    switch (i) {
      case 0:
        setOption0Val(value);
        break;

      case 1:
        setOption1Val(value);
        break;

      case 2:
        setOption2Val(value);
        break;

      case 3:
        setOption3Val(value);
        break;

      default:
        break;
    }
  };

  const modifiedText = useMemo(() => {
    const lines = (questionVal || "").split("\n");

    return lines
      .map((line, index) => {
        // Check if the line is part of a list
        const isListItem = /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(line);
        const isNextLineListItem =
          index < lines.length - 1 &&
          /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(lines[index + 1]);

        if (isListItem || isNextLineListItem) return line;

        return line + "\n";
      })
      .join("\n");
  }, [questionVal]);

  return (
    <div
      className={`rounded-xl border border-primary p-3 transition-opacity ${
        editing ? "opacity-100" : "opacity-60"
      }`}
    >
      <div>
        <div className="flex flex-col gap-1">
          <label className="ml-2 font-medium text-gray-500" htmlFor="question">
            Question:
          </label>
          <textarea
            className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
            onChange={(e) => {
              setQuestionVal(e.currentTarget.value);
            }}
            value={questionVal}
            name="question"
            placeholder="Question ..."
            disabled={!editing}
            rows={7}
          />
        </div>
        <div>
          <label className="ml-2 font-medium text-gray-500">Preview:</label>
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-3">
            <Markdown
              className={"ques"}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
            >
              {modifiedText}
            </Markdown>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="ml-2 font-medium text-gray-500" htmlFor="question">
            Points:
          </label>
          <input
            className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
            onChange={(e) => setPointVal(e.currentTarget.valueAsNumber)}
            value={pointVal}
            name="points"
            placeholder="Point ..."
            disabled={!editing}
            type="number"
          />
        </div>
      </div>
      {mcq ? (
        <div className="flex w-full flex-col gap-3">
          Click on the correct answer option (Required)
          {optionsArr.map((e, i) => {
            return (
              <div key={i} className="flex w-full items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => setCorrectOptionVal(i)}
                  disabled={!editing}
                  className={`h-10 w-10 shrink-0 rounded-full border border-primary_dark text-xl transition-colors ${
                    correctOptionVal == i ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {e}
                </button>
                <input
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
                  onChange={(e) => {
                    setOptionVal(i, e.currentTarget.value);
                  }}
                  value={
                    i == 0
                      ? option0Val
                      : i == 1
                        ? option1Val
                        : i == 2
                          ? option2Val
                          : i == 3
                            ? option3Val
                            : ""
                  }
                  placeholder="Option ..."
                  disabled={!editing}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-1">
            <label className="ml-2 font-medium text-gray-500" htmlFor="answer">
              Answers ( Multiple answers must be separated by ; (Semi Colon) )
            </label>
            <input
              className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
              onChange={(e) => {
                setCorrectAnswersVal(e.currentTarget.value);
              }}
              value={correctAnswersVal}
              name="answer"
              placeholder="Answers ..."
              disabled={!editing}
            />
          </div>
          Answers:
          {correctAnswersVal
            .toString()
            .split(";")
            .map((e, i) => {
              return <div key={i}>{e}</div>;
            })}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          if (editing && onValueChange) {
            onValueChange(
              index,
              questionVal,
              pointVal,
              option0Val,
              option1Val,
              option2Val,
              option3Val,
              correctOptionVal,
              correctAnswersVal,
            );
          }

          setEditing(!editing);
        }}
        className="mt-3 inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
      >
        {editing ? "Save Question" : "Edit Question"}
        <RxGear className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={() => {
          if (deleteQuestion) {
            deleteQuestion(index);
          }
        }}
        className="ml-3 mt-3 inline-flex items-center justify-center gap-3 rounded-lg bg-red-500 px-3 py-2 text-center text-base font-medium text-white hover:bg-red-700 focus:bg-red-900 focus:outline-none focus:ring-4"
      >
        Delete Question
        <RiDeleteBin6Line className="h-7 w-7" />
      </button>
    </div>
  );
};
