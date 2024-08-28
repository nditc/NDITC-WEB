import React from 'react';
import { TbUserOff } from 'react-icons/tb';

const Page = () => {
  return (
    <div className="w-screen shadow-lg  shadow-secondary mt-[81px] bg-image md:min-h-[calc(100vh_-_81px)] grid place-items-center">
      <div className="container-login w-full gap-2  bg-white sm:rounded-xl flex flex-col items-center justify-center p-6 sm:my-16 min-h-[calc(100vh_-_81px)] md:min-h-[70vh]">
        <TbUserOff className="w-12 h-12 text-primary" />
        <h1 className="text-4xl text-center">
          <span className="text-primary">REGISTRATION </span> CLOSED
        </h1>
        <p className=" text-center max-w-[750px]">
          We regret to inform you that registration has now closed. We appreciate your interest and
          would like to thank everyone who signed up. Please stay tuned for future updates and
          opportunities to participate.{' '}
        </p>
      </div>
    </div>
  );
};

export default Page;
