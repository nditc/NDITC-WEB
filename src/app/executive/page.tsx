import React, { useState } from "react";
import Members from "../Components/executive/members";
import ExecutiveData from "../db/executives";
import Executives from "../Components/executive/executives";

const Executive = () => {
  return (
    <div className="w-full min-h-[100vh] py-[125px] md:px-12 px-5 bg-slate-100 relative">
      <img
        className="absolute right-0 top-1/4 z-[0]"
        src="/image/bg.svg"
        alt="bg"
      />
      <img
        className="absolute left-0 top-3/4 z-[0]"
        src="/image/bg2.svg"
        alt="bg"
      />
      <div className="max-w-[1300px] mx-auto z-[3] relative">
        <div className="flex flex-wrap gap-16 w-full justify-center">
          {ExecutiveData.heads.map(({ image_url, name, post, dept }) => (
            <Members
              key=""
              img={image_url}
              name={name}
              designation={post}
              department={dept}
            />
          ))}
        </div>
        <h1 className="text-5xl mt-12">
          MEET THE <br /> <span className="text-blue-500">EXECUTIVES</span>
        </h1>
        <Executives />
      </div>
    </div>
  );
};

export default Executive;
