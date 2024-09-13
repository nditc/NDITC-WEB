import React from 'react';
import Image from 'next/image';

type ErrorProp = {
  statusCode: number;
  msg: string;
  action: () => void;
};

const Error = ({ statusCode, msg, action }: ErrorProp) => {
  return (
    <div className="mt-[81px] h-[calc(100vh-81px)] grid place-items-center ">
      <div className="p-5  rounded-xl flex flex-col md:flex-row justify-center items-center gap-12 container h-3/4">
        <div className="">
          <Image width={256} height={256} src="/image/icon/bot.svg" alt="" />
        </div>
        <div className="hidden md:block md:w-1 md:h-1/2 bg-slate-500 rotate-90 md:rotate-0"></div>
        <div className="text-center md:text-left w-min">
          <h2 style={{ lineHeight: '1' }} className="text-[10rem] text-slate-600">
            {statusCode}
          </h2>
          <p className={'text-lg text-slate-600'}>{msg}</p>
          <button
            className={
              'Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-slate-700 text-white border-gray-600 hover:text-white hover:bg-slate-800 rounded-lg'
            }
            onClick={() => action()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
