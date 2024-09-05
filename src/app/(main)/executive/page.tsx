/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Member from "../Components/Member";
import ExecutiveData from "./executives";
import ExecutivePanel from "./ExecutivePanel";
import Modal from "./Modal";

const Executive = () => {
  const [modalState, setModalState] = useState<[number, number] | null>(null);
  return (
    <>
      <div className="relative min-h-[100vh] w-full bg-[#F6F6F6] px-5 py-[125px] md:px-12">
        <img
          className="absolute right-0 top-1/4 z-0"
          src="/image/bg.svg"
          alt="bg"
        />
        <img
          className="absolute left-0 top-1/2 z-0"
          src="/image/bg2.svg"
          alt="bg"
        />
        <div className="container relative z-10 mx-auto max-w-[1300px]">
          <div className={"grid w-full place-items-center"}>
            <div className="flex flex-col justify-start gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-16">
              {ExecutiveData.heads.map(({ image_url, name, post, dept }) => (
                <Member
                  key=""
                  img={image_url}
                  name={name}
                  designation={post}
                  department={dept}
                />
              ))}
            </div>
          </div>
          <h1 className="mt-12 text-5xl">
            MEET THE <br /> <span className="text-blue-500">EXECUTIVES</span>
          </h1>
          <ExecutivePanel setModalState={setModalState} />
        </div>
        <Modal modalState={modalState} setModalState={setModalState} />
      </div>
    </>
  );
};

export default Executive;
