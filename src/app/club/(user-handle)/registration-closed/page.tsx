import React from "react";
import { TbUserOff } from "react-icons/tb";

const Page = () => {
  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full flex-col items-center justify-center gap-2 bg-white p-6 sm:my-16 sm:rounded-xl md:min-h-[70vh]">
        <TbUserOff className="h-12 w-12 text-primary" />
        <h1 className="text-center text-4xl">
          <span className="text-primary">REGISTRATION </span> CLOSED
        </h1>
        <p className="max-w-[750px] text-center">
          We regret to inform you that registration has now closed. We
          appreciate your interest and would like to thank everyone who signed
          up. Please stay tuned for future updates and opportunities to
          participate.{" "}
        </p>
      </div>
    </div>
  );
};

export default Page;
