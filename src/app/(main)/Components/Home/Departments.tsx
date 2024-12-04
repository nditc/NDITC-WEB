import departments from "@/data/departments";
import React from "react";

const DepartmentCard = ({
  iconLink,
  name,
}: {
  iconLink: string;
  name: string;
}) => {
  return (
    <div className="group relative z-10 flex min-w-[160px] flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-6 transition-all before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-blue-500 before:p-6 before:transition-all before:ease-in-out hover:border-blue-300 hover:text-white hover:before:scale-x-100">
      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-3">
        <img
          className="w-[80px] group-hover:brightness-0 group-hover:invert md:w-[100px]"
          width={100}
          height={100}
          src={iconLink}
          alt=""
        />
        <p className="text-center text-lg">{name}</p>
      </div>
    </div>
  );
};

const Departments = () => {
  return (
    <div className="mt-16 h-fit w-screen object-cover pb-16 text-center">
      <h1 className="mx-auto mb-5 md:mb-8">
        <span className="text-center text-4xl md:text-5xl">WE HAVE </span>{" "}
        <br className="inline md:hidden" />
        <span className="text-center text-4xl text-blue-500 md:text-5xl">
          DEPARTMENTS{" "}
        </span>{" "}
        <span className="text-center text-4xl md:text-5xl">ON </span>
      </h1>
      <div className="container flex flex-wrap items-stretch justify-between gap-4 md:gap-6">
        {departments.map((d, index) => {
          return (
            <DepartmentCard key={index} iconLink={d.iconLink} name={d.name} />
          );
        })}
      </div>
    </div>
  );
};

export default Departments;
