/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import ExecutiveData from '../../db/executives';

const Field = ({ title, desc }: { title: string; desc: React.ReactNode }) => {
  return (
    <div>
      <p className="font-bold text-2xl">{title}</p>
      <p className="text-xl mt-1">{desc}</p>
    </div>
  );
};
const Links = ({ img, href }: { img: string; href: string }) => {
  return (
    <a
      className="w-[30px] h-[30px] hover:fill-blue-500 transition-opacity opacity-70 hover:opacity-100"
      href={href}
    >
      <img src={'/image/links/' + img + '.svg'} alt="" />
    </a>
  );
};
const Modal = ({
  modalState,
  setModalState,
}: {
  modalState: [number, number] | null;
  setModalState: Dispatch<SetStateAction<[number, number] | null>>;
}) => {
  const data = modalState ? ExecutiveData.sessions[modalState[0]].members[modalState[1]] : null;
  const firstNameArr = data?.name.split(' ');
  const lastName = firstNameArr?.pop();
  const firstName = firstNameArr?.join(' ') + ' ';
  const deptName = data?.dept?.replace('Department of ', '');
  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalState]);
  return (
    <>
      <div
        className={
          'fixed inset-0 w-full h-full bg-black  z-[60] transition-transform ' +
          (modalState ? 'opacity-20' : 'opacity-0 pointer-events-none')
        }
      ></div>
      <div
        className={
          'fixed left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] w-4/5 h-4/5 rounded-2xl  bg-white z-[70] shadow-2xl transition' +
          ' ' +
          (modalState ? 'scale-1' : 'scale-0 pointer-events-none')
        }
      >
        <img
          className="absolute left-0 bottom-0 -z-10 min-w-[55%]"
          src="/image/modalbg.svg"
          alt=""
        />
        <button
          className="absolute top-5 right-5 p-3 bg-slate-50 rounded-full hover:bg-blue-50  hover:fill-blue-500 transition"
          onClick={() => setModalState(null)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        {modalState && data ? (
          <div className="flex align-bottom h-full">
            <img className="" src="/image/vaiya.png" alt="" />
            {/* <p>{JSON.stringify(ExecutiveData.sessions[modalState[0]].members[modalState[1]])}</p> */}
            <div className="w-full pr-8 pb-8 flex flex-col justify-between h-full">
              <div className="mt-[15vh]">
                <h1 className="text-6xl">
                  {firstName}
                  <span className="text-blue-500">{lastName}</span>
                </h1>
                <p className="text-3xl text-blue-500 font-bold">{data.post}</p>
                {data.dept ? (
                  <p className="text-2xl">
                    Department of <span className="text-blue-500">{deptName}</span>
                  </p>
                ) : null}
              </div>
              <div className="text-right flex flex-col gap-3 justify-right align-bottom">
                <Field title="Academic Life" desc="X School > Notre Dame College > X University" />
                <Field title="Interest" desc="Graphics Design" />
                <Field title="E-mail" desc="random@gmail.com" />
                <Field
                  title="Socials"
                  desc={
                    <div className="flex justify-end gap-2">
                      <Links img="fb" href="www.facebook.com" />
                      <Links img="dribble" href="www.facebook.com" />
                      <Links img="github" href="www.facebook.com" />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
