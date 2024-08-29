"use client";

import Member from "./Member";
import setter from "@/data/setter_data";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const Setter = () => {
  return (
    <section
      id="setter"
      className="h-fit w-screen bg-[#f6f6f6] object-cover pb-16 pt-16 text-center"
    >
      <div className="container flex w-full flex-col justify-start">
        {/* <img className="absolute right-0 top-[75vh] z-0" src="/image/bg.svg" alt="bg" />
      <img className="absolute left-0 top-[150vh] z-0" src="/image/bg2.svg" alt="bg" /> */}

        <h1 className="align-middle">
          <IoExtensionPuzzleOutline className="mr-2 inline h-8 w-8 align-top text-primary md:-mt-1 md:h-12 md:w-12" />
          <span className="inline text-4xl text-primary md:text-5xl">
            Problem
          </span>
          &nbsp; &nbsp;
          <span className="inline text-4xl md:text-5xl">Setters</span>
        </h1>
        <p className="hidden py-3 text-center text-lg md:block">
          Hats off to all the brilliant setters who craft mind-bending problems,
          keeping us hooked and our coding skills razor-sharp!
        </p>
        <div className="mt-4 flex flex-wrap items-start justify-start gap-4 pt-2 md:mt-5 2xl:gap-8 2xl:px-8">
          {setter.map(({ name, post, image_url, dept }, index) => (
            <div className="w-[310px] flex-[310px]" key={index}>
              <Member
                hasClickHandler={false}
                img={image_url}
                name={name}
                designation={post}
                department={dept}
                hoverText="Click for Details"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Setter;
