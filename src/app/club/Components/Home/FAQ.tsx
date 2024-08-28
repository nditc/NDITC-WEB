'use client';
import React, { useState } from 'react';
import Member from './Member';
import { BsQuestionCircle } from 'react-icons/bs';

const FAQS = [
  {
    title:
      "What is FTMPC 4.0, and why is the contest named in Father Richard William Timm's honor?",
    desc: 'FTMPC 4.0 stands for the Father Timm Memorial Programming Contest, which is the fourth installment of this prestigious event. The contest is named in honor of Father Richard William Timm, a notable figure known for his contributions to academia, humanitarianism, and biodiversity exploration. The contest aims to celebrate his enduring influence and legacy in these realms.',
  },
  {
    title: 'What educational backgrounds are eligible to participate in FTMPC 4.0?',
    desc: 'FTMPC 4.0 is open to students from various educational backgrounds, including schools, colleges (including HSC batch-2023), and corresponding institutions such as polytechnic institutes (4th year and below).',
  },
  {
    title: 'What programming languages can participants use in the contest?',
    desc: 'Participants can use Python, C, or C++ programming languages to tackle challenges inspired by the International Olympiad in Informatics (IOI) format.',
  },
  {
    title: 'What measures are in place to address plagiarism issues during the contest?',
    desc: 'Participants can use Python, C, or C++ programming languages to tackle challenges inspired by the International Olympiad in Informatics (IOI) format.',
  },
  {
    title: 'Do I need to bring laptop for Offline Round?',
    desc: 'Contestants who are selected in preliminary round must have to bring their laptops for Offline Round.',
  },
];
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);
  //here index starts from 1. 0 means all closed
  return (
    <section id="faq" className="w-screen h-fit pt-16 pb-16 object-cover  text-center">
      <div className="container">
        <h1 className="mx-auto mb-5 md:mb-8 ">
          <BsQuestionCircle className="inline mr-3 w-8 md:w-10 h-8 md:h-10 align-top text-primary" />
          <span className="text-4xl md:text-5xl text-center">FREQUENTLY ASKED </span>{' '}
          <br className="inline md:hidden" />
          <span className="text-primary text-4xl md:text-5xl text-center">QUESTIONS </span>{' '}
        </h1>
        {FAQS.map((data, index) => (
          <div key={index}>
            <h2 className="text-lg font-bold Nunito">
              <button
                onClick={() => setOpenIndex((s) => (s === index + 1 ? 0 : index + 1))}
                type="button"
                className={`flex items-center justify-between w-full p-5 font-bold rtl:text-right text-gray-500 border ${
                  index !== FAQS.length - 1 || openIndex === index + 1 ? 'border-b-0' : ''
                } border-gray-200 ${
                  index === 0
                    ? 'rounded-t-xl'
                    : index === FAQS.length - 1 && openIndex !== index + 1
                    ? 'rounded-b-xl'
                    : ''
                } focus:ring-4 focus:ring-gray-200    hover:bg-gray-100  gap-3`}
              >
                <span>{data.title}</span>
                <svg
                  className={`w-3 h-3 ${
                    openIndex === index + 1 ? 'rotate-180' : '-rotate-90'
                  } shrink-0`}
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
            <div>
              <div
                style={{
                  display: openIndex === index + 1 ? 'block' : 'none',
                }}
                className={`p-5 border transition-all ${
                  index !== FAQS.length - 1 ? 'border-b-0' : 'rounded-b-xl'
                } border-gray-200  overflow-hidden`}
              >
                <p className="mb-2 text-gray-500">{data.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
