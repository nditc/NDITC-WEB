"use client";

import { IoCloudOfflineSharp } from "react-icons/io5";

const Page = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <IoCloudOfflineSharp className="h-10 w-10 text-white" />
      <h1 className="mt-8 font-mono text-5xl text-white">
        YOU'RE <span className="text-primary">OFFLINE</span>
      </h1>
      <h1></h1>
    </div>
  );
};

export default Page;
