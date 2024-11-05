"use client";
import Image from "next/image";

import { Dispatch, SetStateAction, memo, useState } from "react";
import "../styles/sessionSelector.css";
import ExecutiveData from "@/data/executives";

import Member from "../../Components/Member";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ExecutivePanel = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<[number, number] | null>>;
}) => {
  const [state, setState] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const Router = useRouter();
  return (
    <div className="flex flex-wrap pt-10">
      <div
        className={
          "sticky top-24 z-10 mb-10 h-[48px] w-full md:h-[20vw] md:w-auto"
        }
      >
        <div
          className={"session-selector " + " " + (isOpen ? "open" : "close")}
        >
          {ExecutiveData.sessions.map(({ session }, index) => {
            return (
              <div
                className={
                  "session-list-item relative inline-block min-w-[135px] cursor-pointer p-3 text-center font-bold hover:bg-blue-50 hover:text-blue-500 md:rounded-xl " +
                  (state === index
                    ? "active-elem bg-white text-blue-500 shadow-lg"
                    : "")
                }
                key={session}
                onClick={() => {
                  setOpen((s) => !s);
                  setState(index);
                }}
              >
                <p>{session}</p>
                <img
                  width={48}
                  height={48}
                  alt={"Image"}
                  src="/image/la.svg"
                  className={
                    "absolute right-8 top-1/2 w-[8px] translate-y-[-50%] transition-all" +
                    " " +
                    (isOpen ? "rotate-[-90deg]" : "rotate-0")
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grow items-start justify-items-start gap-8 grid-fluid-fill-[280px] md:justify-items-stretch md:pl-10 md:grid-fluid-fill-[200px] 2xl:gap-10 2xl:grid-fluid-fill-[250px]">
        {ExecutiveData.sessions[state].members.map(
          (
            { image_url, imageInCenter, name, post, dept, profile_url },
            index,
          ) => (
            <>
              {ExecutiveData.sessions[state].hasExtraDetails &&
              typeof profile_url === "object" ? (
                <div
                  key=""
                  onClick={() => {
                    setModalState([state, index]);
                  }}
                >
                  <Member
                    hasClickHandler={true}
                    img={image_url}
                    imgInCenter={imageInCenter}
                    name={name}
                    designation={post}
                    department={dept}
                    hoverText="Click for Details"
                  />
                </div>
              ) : typeof profile_url === "string" && profile_url !== "" ? (
                <Link href={profile_url} key="" target="_blank">
                  <Member
                    hasClickHandler={true}
                    img={image_url}
                    imgInCenter={imageInCenter}
                    name={name}
                    designation={post}
                    department={dept}
                    hoverText="Visit Social"
                  />
                </Link>
              ) : (
                <div>
                  <Member
                    hasClickHandler={false}
                    img={image_url}
                    imgInCenter={imageInCenter}
                    name={name}
                    designation={post}
                    department={dept}
                  />
                </div>
              )}
            </>
          ),
        )}
      </div>
    </div>
  );
};

export default memo(ExecutivePanel);
