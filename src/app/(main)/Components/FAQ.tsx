"use client";
import React, { useState } from "react";
import Member from "./Member";
import { BsQuestionCircle } from "react-icons/bs";

const FAQS = [
  {
    title: "What is NDITC?",
    desc: "The Notre Dame Information Technology Club (NDITC) is a co-curricular club at Notre Dame College, Dhaka, established in 2018. Our mission is to promote technology awareness and provide students with opportunities to engage in areas like Web Development, competitive programming, robotics, graphics design, and content creation.",
  },
  {
    title: "How do we operate?",
    desc: "We organize various events, workshops, and competitions to encourage active learning. Our signature events, such as the Father Timm Memorial Programming Contest (FTMPC) and PixelCon, provide a platform for students to showcase their tech skills.",
  },
  {
    title: "How do I register for an account?",
    desc: "Click on the register button. Then enter the required information. Then set up your password and enter click. After that you will receive a verification email and after verifying you're all set!",
  },
  {
    title: "How do I register for an account as a member?",
    desc: "After you officialy become our club member, click on the register button on the website, enter your college roll number, email address you entered in the club registration form. Then set up your password and enter click. After that you will receive a verification email and after verifying you're all set!",
  },
  {
    title: "What is the purpose of this website?",
    desc: "We will host intra-college, intra-club and inter college quizzes on this websites. Based on the results, we will display a leaderboard. Also, you will get updates of any club activities through your profile.",
  },
];
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);
  //here index starts from 1. 0 means all closed
  return (
    <section
      id="faq"
      className="h-fit w-screen object-cover pb-16 pt-16 text-center"
    >
      <div className="container">
        <h1 className="mx-auto mb-5 md:mb-8">
          <BsQuestionCircle className="mr-3 inline h-8 w-8 align-top text-primary md:h-10 md:w-10" />
          <span className="text-center text-4xl md:text-5xl">
            FREQUENTLY ASKED{" "}
          </span>{" "}
          <br className="inline md:hidden" />
          <span className="text-center text-4xl text-primary md:text-5xl">
            QUESTIONS{" "}
          </span>{" "}
        </h1>
        {FAQS.map((data, index) => (
          <div key={index}>
            <h2 className="Inter text-lg font-medium">
              <button
                onClick={() =>
                  setOpenIndex((s) => (s === index + 1 ? 0 : index + 1))
                }
                type="button"
                className={`flex w-full items-center justify-between border bg-white p-5 font-semibold text-gray-500 rtl:text-right ${
                  index !== FAQS.length - 1 || openIndex === index + 1
                    ? "border-b-0"
                    : ""
                } border-gray-200 ${
                  index === 0
                    ? "rounded-t-xl"
                    : index === FAQS.length - 1 && openIndex !== index + 1
                      ? "rounded-b-xl"
                      : ""
                } gap-3 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200`}
              >
                <span>{data.title}</span>
                <svg
                  className={`h-3 w-3 ${
                    openIndex === index + 1 ? "rotate-180" : "-rotate-90"
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
                  display: openIndex === index + 1 ? "block" : "none",
                }}
                className={`border p-5 transition-all ${
                  index !== FAQS.length - 1 ? "border-b-0" : "rounded-b-xl"
                } overflow-hidden border-gray-200`}
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
