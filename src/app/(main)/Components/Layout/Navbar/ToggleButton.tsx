import React from "react";
import { RxCross2 } from "react-icons/rx";

const ToggleButton = ({
  showOptions,
  setShowOptions,
}: {
  showOptions: boolean;
  setShowOptions: (s: boolean) => void;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setShowOptions(!showOptions);
      }}
      data-collapse-toggle="navbar-sticky"
      type="button"
      className="ml-auto mr-2 inline-flex h-10 w-10 shrink-0 basis-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
      aria-controls="navbar-sticky"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      {showOptions ? (
        <RxCross2 className={"h-6 w-6"} />
      ) : (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      )}
    </button>
  );
};

export default ToggleButton;
