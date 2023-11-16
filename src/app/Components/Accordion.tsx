"use client";

import { useState } from "react";

const Accordion = () => {
  const accordionData: AccordionData[] = [
    { title: "Just A Question", answer: "This is the answer" },
    { title: "Just A Question", answer: "This is the answer" },
    { title: "Just A Question", answer: "This is the answer" },
  ];
  const [accordionIndex, setAccordionIndex] = useState(-1);
  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {accordionData.map((e, i) => {
        return (
          <SingleAccordion
            title={e.title}
            answer={e.answer}
            index={i}
            currentIndex={accordionIndex}
            setIndex={setAccordionIndex}
          />
        );
      })}
    </div>
  );
};

interface AccordionData {
  title: string;
  answer: string;
}

export default Accordion;

interface AccordionProps {
  title: string;
  answer: string;
  index: number;
  currentIndex: number;
  setIndex: (value: number) => void;
}

const SingleAccordion = ({
  title,
  answer,
  index,
  currentIndex,
  setIndex,
}: AccordionProps) => {
  return (
    <>
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
          onClick={() => {
            if (currentIndex != index) {
              setIndex(index);
            } else if (currentIndex == index) {
              setIndex(-1);
            }
          }}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`${currentIndex == index ? "" : "hidden"}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200">
          <p className="mb-2 text-gray-500">{answer}</p>
        </div>
      </div>
    </>
  );
};
