/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect } from "react";
import DeveloperData from "./developers";
import ModalCont from "@/app/club/Components/Modal";
import Link from "next/link";
const Field = ({ title, desc }: { title: string; desc: React.ReactNode }) => {
  return (
    <div>
      <p className="text-lg font-bold 2xl:text-2xl">{title}</p>
      <p className="text-base 2xl:mt-1 2xl:text-xl">{desc}</p>
    </div>
  );
};
const Links = ({ img, href }: { img: string; href: string }) => {
  return (
    <Link
      target="_blank"
      className="h-[35px] w-[35px] opacity-70 transition-opacity hover:fill-primary hover:opacity-100"
      href={href}
    >
      <img src={"/image/links/" + img + ".svg"} alt="" />
    </Link>
  );
};
const Modal = ({
  modalState,
  setModalState,
}: {
  modalState: [string, number] | null;
  setModalState: Dispatch<SetStateAction<[string, number] | null>>;
}) => {
  const data = modalState ? DeveloperData[modalState[0]][modalState[1]] : null;
  const firstNameArr = data?.name.split(" ");
  const lastName = firstNameArr?.pop();
  const firstName = firstNameArr?.join(" ") + " ";
  const deptName = data?.dept?.replace("Department of ", "");
  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalState]);
  return (
    <ModalCont state={modalState}>
      <div
        className={
          "d:mb-0 fixed left-1/2 top-1/2 z-[70] h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-hidden bg-white pb-24 shadow-2xl transition md:rounded-2xl md:pb-0 lg:h-4/5 lg:w-4/5" +
          " " +
          (modalState ? "scale-1" : "pointer-events-none scale-0")
        }
      >
        <img
          className="absolute bottom-0 left-0 -z-10 min-w-[55%]"
          src="/image/modalbg.svg"
          alt=""
        />
        <div className="mt-[6.5rem] h-full w-full overflow-y-scroll md:mt-0 md:overflow-hidden">
          <div
            className={"absolute right-8 top-6 flex text-right align-middle"}
          >
            <div>
              {modalState && modalState[0] !== "SUPERVISION AND GUIDELINES" ? (
                <p className="text-sm font-bold sm:hidden 2xl:text-base">
                  Web Developers
                </p>
              ) : null}
              <p className="hidden text-sm font-bold sm:block 2xl:text-base">
                Web Developers
              </p>
              <h3 className="max-w-[50vw] text-3xl leading-none text-primary sm:text-4xl 2xl:text-[2.75rem]">
                {modalState ? modalState[0].replace("WEB DEVELOPERS", "") : ""}
              </h3>
            </div>
          </div>
          <button
            className="absolute left-5 top-5 rounded-full bg-slate-50 p-3 transition hover:bg-green-50 hover:fill-primary"
            onClick={() => setModalState(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          {modalState && data ? (
            <div className="flex h-full flex-col align-bottom sm:mt-0 md:flex-row">
              <img
                className="mx-auto max-w-[75vw] overflow-visible rounded-lg bg-neutral-200 object-cover p-5 pb-0 shadow-lg md:ml-12 md:mt-[20.1vh] md:max-w-[45vw] md:rounded-none md:bg-transparent md:p-0 md:shadow-none lg:mt-[12.1vh]"
                src={data.modal_image_url}
                alt=""
              />
              <div className="flex h-full w-full flex-col gap-5 pb-8 pr-0 text-center md:justify-between md:gap-0 md:pr-8 md:text-left">
                <div className="mt-12 md:mt-[18.1vh] lg:mt-[12.1vh]">
                  <h1 className="text-5xl 2xl:text-6xl">
                    {firstName}
                    <span className="text-primary">{lastName}</span>
                  </h1>
                  <p className="text-2xl font-bold text-primary 2xl:text-3xl">
                    {data.post}
                  </p>
                  {data.dept ? (
                    <p className="text-xl 2xl:text-2xl">{deptName}</p>
                  ) : null}
                </div>
                <div className="md:justify-right flex flex-col justify-center gap-2 text-center align-bottom md:text-right 2xl:gap-3">
                  <Field title="Group" desc={data.group} />
                  <Field title="Roll" desc={data.roll} />
                  <Field title="E-mail" desc={data.email} />
                  {Array.isArray(data.profile_url) &&
                  data.profile_url.length > 0 ? (
                    <Field
                      title="Socials"
                      desc={
                        <div className="flex justify-center gap-2 md:justify-end">
                          {data.profile_url.map((arr, index) => {
                            return (
                              <Links
                                key={index}
                                img={arr.platform}
                                href={arr.url}
                              />
                            );
                          })}
                        </div>
                      }
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ModalCont>
  );
};

export default Modal;
