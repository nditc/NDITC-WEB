import { useEffect, useState } from "react";

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
    setAnswerData(selectedVal, answer, index);
  }, [selectedVal, answer]);

  return (
    <div className="flex w-full flex-col py-5">
      <div className="flex items-center justify-between py-3 text-xl md:text-3xl">
        <p>
          {index + 1}. {question}
        </p>
        <p className="text-end text-base">Mark: {point}</p>
      </div>
      {mcq ? (
        <div className="flex flex-col gap-3">
          {optionsArr.map((e, i) => {
            return (
              <Option
                optionI={e}
                option={options[i]}
                selected={selectedVal}
                index={i}
                setSelected={setSelectedVal}
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
                setAnswer(e.currentTarget.value);
              }}
              value={answer}
              name="answer"
              placeholder="Your Answer ..."
            />
          </div>
        </div>
      )}
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
      className="flex items-center gap-3"
      onClick={() => setSelected(index)}
    >
      <div
        className={`textlg flex h-10 w-10 items-center justify-center rounded-full border border-primary_dark text-lg transition-colors md:text-xl ${
          selected == index ? "bg-primary" : "bg-white"
        }`}
      >
        <p>{optionI}</p>
      </div>
      <p className="text-lg md:text-xl">{option}</p>
    </button>
  );
};
