import { useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-light.css";

interface questionInterface {
  mcq: boolean;
  question: string;
  option0: string;
  option1: string;
  option2: string;
  option3: string;
  point: number;
  index: number;
  setAnswerData: (option: number, answer: string, index: number) => void;
  selectedOption: number;
  givenAnswer: string;
}

const Question = ({
  mcq,
  point,
  question,
  index,
  option0,
  option1,
  option2,
  option3,
  setAnswerData,
  selectedOption,
  givenAnswer,
}: questionInterface) => {
  const [selectedVal, setSelectedVal] = useState(selectedOption);

  const options = [option0, option1, option2, option3];
  const optionsArr = ["A", "B", "C", "D"];

  const [answer, setAnswer] = useState(givenAnswer);

  useEffect(() => {
    setAnswer(givenAnswer);
    setSelectedVal(selectedOption);
  }, [givenAnswer, selectedOption]);

  // useEffect(() => {
  //   setAnswerData(selectedVal, answer, index);
  // }, [selectedVal, answer]);

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
  }, []);

  return (
    <div className="flex w-full flex-col rounded-xl bg-white p-5">
      <div className="flex items-center justify-between pb-3 text-base md:text-lg">
        <div className="flex flex-col items-start gap-2 font-medium leading-[1.3] sm:flex-row">
          <p className="Inter grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white">
            {index + 1}
          </p>
          <p className="">
            {" "}
            <Markdown
              className={"ques"}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
            >
              {modifiedText}
            </Markdown>
          </p>
        </div>
      </div>
      {mcq ? (
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          {optionsArr.map((e, i) => {
            return (
              <Option
                optionI={e}
                option={options[i]}
                selected={selectedVal}
                index={i}
                setSelected={(i) => {
                  setAnswerData(i, answer, index);
                }}
                key={i}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-1">
            <label className="ml-2 font-medium text-gray-500" htmlFor="answer">
              Answer:
            </label>
            <input
              className="h-16 rounded-xl border border-gray-300 px-5 py-3 focus:border-primary focus:outline-none"
              onChange={(e) => {
                setAnswerData(selectedVal, e.target.value, index);
              }}
              value={answer}
              name="answer"
              placeholder="Your Answer ..."
            />
          </div>
        </div>
      )}
      <p className="-mb-1 mt-3 text-end text-base text-zinc-400">
        Mark: <b>{point}</b>
      </p>
    </div>
  );
};

export default Question;

const Option = ({
  optionI,
  option,
  selected,
  index,
  setSelected,
}: {
  optionI: string;
  option: string;
  selected: number;
  index: number;
  setSelected: (i: number) => void;
}) => {
  return (
    <button
      className={`flex flex-1 items-center gap-3 rounded-lg px-2 py-1.5 transition-colors ${selected == index ? "bg-primary text-white" : "bg-zinc-200/70 hover:bg-zinc-300"}`}
      onClick={() => setSelected(index)}
    >
      <div
        className={`textlg flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold md:text-xl ${selected == index ? "text-zinc-200" : "text-primary"}`}
      >
        <p>{optionI}</p>
      </div>
      <p className="text-left text-base leading-[1.3] md:text-lg md:leading-[1.3]">
        {option}
      </p>
    </button>
  );
};
