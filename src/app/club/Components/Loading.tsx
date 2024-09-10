import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loading = ({ height }: { height?: string }) => {
  return (
    <div style={{ height }} className="grid h-screen w-full place-items-center">
      <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
