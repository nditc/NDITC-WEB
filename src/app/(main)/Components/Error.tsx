import React from "react";
import Image from "next/image";

type ErrorProp = {
  statusCode: number;
  msg: string;
  action: () => void;
};

const Error = ({ statusCode, msg, action }: ErrorProp) => {
  return (
    <div className="mt-[81px] grid h-[calc(100vh-81px)] place-items-center">
      <div className="container flex h-3/4 flex-col items-center justify-center gap-12 rounded-xl p-5 md:flex-row">
        <div className="">
          <img width={256} height={256} src="/image/icon/bot.svg" alt="" />
        </div>
        <div className="hidden rotate-90 bg-slate-500 md:block md:h-1/2 md:w-1 md:rotate-0"></div>
        <div className="w-min text-center md:text-left">
          <h2
            style={{ lineHeight: "1" }}
            className="text-[10rem] text-slate-600"
          >
            {statusCode}
          </h2>
          <p className={"text-lg text-slate-600"}>{msg}</p>
          <button
            className={
              "Bebas text-whiterounded-lg mb-2 me-2 mt-5 rounded-lg border border-gray-600 bg-slate-700 px-7 py-2 font-Bebas text-xl font-medium text-white hover:bg-slate-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-700"
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
