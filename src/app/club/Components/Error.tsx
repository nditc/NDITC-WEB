"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuTimerOff } from "react-icons/lu";

type ErrorProp = {
  statusCode: number;
  msg: string;
  location: string;
};

const ErrorComp = ({ statusCode, msg, location }: ErrorProp) => {
  const router = useRouter();
  return (
    <div className="mt-[81px] grid h-[calc(100vh-81px)] place-items-center">
      <div className="container flex h-3/4 flex-col items-center justify-center gap-12 rounded-xl p-5 md:flex-row">
        <div className="">
          {statusCode == 999 ? (
            <LuTimerOff className="h-60 w-60 text-primary" />
          ) : (
            <Image width={256} height={256} src="/Images/icon/bot.svg" alt="" />
          )}
        </div>
        <div className="hidden rotate-90 bg-primary md:block md:h-1/2 md:w-1 md:rotate-0"></div>
        <div className="w-min text-center md:text-left">
          <h2
            style={{ lineHeight: "1" }}
            className="text-[10rem] text-secondary"
          >
            {statusCode}
          </h2>
          <p className={"text-lg text-primary"}>{msg}</p>
          <button
            className={
              "Bebas text-whiterounded-lg mb-2 me-2 mt-5 rounded-lg border bg-primary px-7 py-2 font-Bebas text-xl font-medium text-white hover:bg-primary_dark hover:text-white focus:z-10 focus:ring-4 focus:ring-secondary_light"
            }
            onClick={() => {
              location == "again"
                ? window.location.reload()
                : router.push("/club" + location);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComp;
