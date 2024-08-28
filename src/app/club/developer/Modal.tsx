/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import DeveloperData from './developers';
import ModalCont from '@/Components/Modal';
import Link from 'next/link';
const Field = ({ title, desc }: { title: string; desc: React.ReactNode }) => {
  return (
    <div>
      <p className="font-bold text-lg 2xl:text-2xl">{title}</p>
      <p className="text-base 2xl:text-xl 2xl:mt-1">{desc}</p>
    </div>
  );
};
const Links = ({ img, href }: { img: string; href: string }) => {
  return (
    <Link
      target="_blank"
      className="w-[35px] h-[35px] hover:fill-primary transition-opacity opacity-70 hover:opacity-100"
      href={href}
    >
      <img src={'/Images/links/' + img + '.svg'} alt="" />
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
    <ModalCont state={modalState}>
      <div
        className={
          'fixed overflow-hidden pb-24 md:pb-0 d:mb-0 left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] w-full h-full lg:w-4/5 lg:h-4/5 md:rounded-2xl  bg-white z-[70] shadow-2xl transition' +
          ' ' +
          (modalState ? 'scale-1' : 'scale-0 pointer-events-none')
        }
      >
        <img
          className="absolute left-0 bottom-0 -z-10 min-w-[55%] "
          src="/Images/modalbg.svg"
          alt=""
        />
        <div className="w-full h-full overflow-y-scroll md:overflow-hidden mt-[6.5rem] md:mt-0">
          <div className={'absolute top-6 right-8 flex align-middle text-right'}>
            <div>
              {modalState && modalState[0] !== 'SUPERVISION AND GUIDELINES' ? (
                <p className="font-bold text-sm 2xl:text-base sm:hidden">Web Developers</p>
              ) : null}
              <p className="font-bold text-sm 2xl:text-base hidden sm:block">Web Developers</p>
              <h3 className="text-3xl sm:text-4xl 2xl:text-[2.75rem] max-w-[50vw] leading-none text-primary">
                {modalState ? modalState[0].replace('WEB DEVELOPERS', '') : ''}
              </h3>
            </div>
          </div>
          <button
            className="absolute top-5 left-5 p-3 bg-slate-50 rounded-full hover:bg-green-50  hover:fill-primary transition"
            onClick={() => setModalState(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          {modalState && data ? (
            <div className="flex align-bottom h-full sm:mt-0 flex-col md:flex-row">
              <img
                className="object-cover p-5 pb-0 md:p-0  md:mt-[20.1vh] lg:mt-[12.1vh] bg-neutral-200 shadow-lg md:shadow-none rounded-lg md:rounded-none md:bg-transparent  max-w-[75vw] md:max-w-[45vw] mx-auto md:ml-12  overflow-visible"
                src={data.modal_image_url}
                alt=""
              />
              <div className="w-full pr-0 md:pr-8 pb-8 flex flex-col gap-5 md:gap-0 text-center md:text-left md:justify-between h-full">
                <div className="mt-12 md:mt-[18.1vh] lg:mt-[12.1vh]">
                  <h1 className="text-5xl 2xl:text-6xl">
                    {firstName}
                    <span className="text-primary">{lastName}</span>
                  </h1>
                  <p className="text-2xl 2xl:text-3xl text-primary font-bold">{data.post}</p>
                  {data.dept ? <p className="text-xl 2xl:text-2xl">{deptName}</p> : null}
                </div>
                <div className="text-center md:text-right flex flex-col gap-2 2xl:gap-3 justify-center md:justify-right align-bottom">
                  <Field title="Group" desc={data.group} />
                  <Field title="Roll" desc={data.roll} />
                  <Field title="E-mail" desc={data.email} />
                  {Array.isArray(data.profile_url) && data.profile_url.length > 0 ? (
                    <Field
                      title="Socials"
                      desc={
                        <div className="flex justify-center md:justify-end gap-2">
                          {data.profile_url.map((arr, index) => {
                            return <Links key={index} img={arr.platform} href={arr.url} />;
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
