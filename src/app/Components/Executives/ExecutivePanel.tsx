"use client";
import Image from "next/image";

import { Dispatch, SetStateAction, memo, useState } from "react";

import ExecutiveData from "../../db/executives";
import Modal from "./Modal";
import Member from "./Member";
import { useRouter } from "next/navigation";

const ExecutivePanel = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<[number, number] | null>>;
}) => {
  const [state, setState] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const Router = useRouter();
  return (
    <div className="flex pt-10 flex-wrap">
      <div
        className={
          "sticky top-24 md:w-auto w-full md:h-[20vw] h-[48px] z-10 mb-10"
        }
      >
        <div
          className={"session-selector " + " " + (isOpen ? "open" : "close")}
        >
          {ExecutiveData.sessions.map(({ session }, index) => {
            return (
              <div
                className={
                  "p-3 font-bold relative text-center md:rounded-xl inline-block cursor-pointer min-w-[135px] session-list-item hover:text-blue-500 hover:bg-blue-50 " +
                  (state === index
                    ? "bg-white text-blue-500 shadow-lg active-elem"
                    : "")
                }
                key={session}
                onClick={() => {
                  setOpen((s) => !s);
                  setState(index);
                }}
              >
                <p>{session}</p>
                <Image
                  width={48}
                  height={48}
                  alt={"Image"}
                  src="/image/la.svg"
                  className={
                    "w-[8px] absolute right-8 transition-all top-1/2 translate-y-[-50%]" +
                    " " +
                    (isOpen ? "rotate-[-90deg]" : "rotate-0")
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid-fluid-fill-[200px] items-center justify-items-start md:justify-items-stretch gap-5 2xl:gap-6 lg:grid-fluid-fill-[230px] grow md:pl-10">
        {ExecutiveData.sessions[state].members.map(
          (
            { image_url, imageInCenter, name, post, dept, profile_url },
            index
          ) => (
            <a href={profile_url} key="" target="_blank">
              {/* <
              key=""
              onClick={() => {
                // setModalState([state, index]);
                Router.push(profile_url || '/', {});
              }}
            > //for later use */}
              <Member
                hasClickHandler={true}
                img={image_url}
                imgInCenter={imageInCenter}
                name={name}
                designation={post}
                department={dept}
              />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default memo(ExecutivePanel);
