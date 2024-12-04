"use client";

import { MdKeyboardArrowUp } from "react-icons/md";

const GoToTop = () => {
  return (
    <div
      className="cursor-pointer bg-white rounded-full shadow-[5px_5px_20px_15px_#00000024] p-1"
      onClick={() => {
        document
          .querySelector("#scrollToTop")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <MdKeyboardArrowUp className="w-6 h-6" />
    </div>
  );
};

export default GoToTop;
