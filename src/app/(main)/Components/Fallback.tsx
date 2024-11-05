import React from "react";
import { PiSmileySad } from "react-icons/pi";

const Fallback = () => {
  return (
    <div className="my-5 flex min-h-[50vh] w-full flex-col place-items-center justify-center rounded-lg py-5 text-center text-2xl md:rounded-xl">
      <PiSmileySad color={"#3b82f6"} size={150} />
      <p>
        We have <span className="inline text-blue-500">nothing</span>
        <br></br> to show here
      </p>
    </div>
  );
};

export default Fallback;
