"use client";

import { FaCode } from "react-icons/fa";
import Member from "@/Components/Home/Member";
import DevData from "./developers";
import { useState } from "react";
import Modal from "./Modal";

const Developer = () => {
  const [modalState, setModalState] = useState<[string, number] | null>(null);
  return (
    <div className="w-full bg-[#F6F6F6]">
      <Modal modalState={modalState} setModalState={setModalState} />
      <div className="container relative flex min-h-[100vh] flex-col py-[125px]">
        <div className="mt-0 flex items-center gap-3 xsm:gap-5 md:mt-12 md:items-start">
          <div className="aspect-square rounded-full bg-white shadow-[5px_5px_20px_10px_#00000024] md:mb-3">
            <FaCode className="m-5 h-16 w-14 rounded-full bg-black p-3 text-white transition-all hover:-rotate-90 xsm:w-16 sm:h-20 sm:w-20" />
          </div>
          <div>
            <div className="flex flex-col items-start justify-start gap-0 md:flex-row md:items-end md:justify-start md:gap-3">
              <h1 className="pb-1 text-4xl md:pb-2 md:text-6xl">MEET OUR</h1>
              <h1 className="text-5xl text-primary sm:text-6xl md:text-8xl">
                DEVELOPERS
              </h1>
            </div>
            <p className="hidden pt-3 text-lg md:block">
              We would like to thank our amazing developers who worked hard to
              create this website. They have shown great skill, creativity, and
              dedication in bringing our vision to life. They have overcome many
              challenges and delivered a high-quality product that we are proud
              of. We appreciate their efforts and contributions to our success.
            </p>
          </div>
        </div>
        <p className="mt-4 pt-3 text-base md:hidden">
          We would like to thank our amazing developers who worked hard to
          create this website. They have shown great skill, creativity, and
          dedication in bringing our vision to life. They have overcome many
          challenges and delivered a high-quality product that we are proud of.
          We appreciate their efforts and contributions to our success.
        </p>
        <div className="flex flex-col items-start md:flex-row md:justify-evenly">
          {Object.entries(DevData).map(([title, members], index) => {
            const titleArr = title.split(" ");
            const first = titleArr?.splice(0, 1);
            const last = titleArr?.join(" ") + " ";
            return (
              <div
                key={index}
                className="flex flex-col justify-center md:items-center"
              >
                <div className="mt-14 flex items-start justify-start gap-2 md:mt-16 md:flex-row md:items-end md:justify-start md:gap-3">
                  <h1 className="text-4xl text-primary md:text-5xl">{first}</h1>
                  <h1 className="text-4xl md:text-5xl">{last}</h1>
                </div>
                <div className="mt-4 flex flex-wrap justify-start gap-4 pt-2 grid-fluid-fill-[275px] md:mt-5 md:gap-8 md:grid-fluid-fill-[250px]">
                  {members.map(
                    ({ name, post, image_url, dept, imageInCenter }, index) => (
                      <div
                        className=""
                        key={index}
                        onClick={() => {
                          setModalState([title, index]);
                        }}
                      >
                        <Member
                          hasClickHandler={true}
                          imgInCenter={imageInCenter}
                          img={image_url}
                          name={name}
                          designation={post}
                          department={dept}
                          hoverText="Click for Details"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Developer;
