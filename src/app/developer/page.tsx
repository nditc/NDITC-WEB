"use client";

import { developerData } from "./data";
import Member from "../Components/Executives/Member";

const Developer = () => {
  return (
    <div className="w-full min-h-[100vh] py-[125px] md:px-12 px-5 bg-[#F6F6F6] relative flex flex-col">
      <div className="my-12 flex flex-col md:flex-row gap-3 justify-center md:justify-start items-start md:items-end">
        <h1 className="text-4xl md:text-6xl pb-1 md:pb-2">MEET OUR</h1>
        <h1 className="text-6xl md:text-8xl text-blue-500">DEVELOPERS</h1>
      </div>

      <div className="flex pt-10 flex-wrap gap-56 justify-start">
        {developerData.map((e) => {
          return (
            <a href={e.profileURL} target="_blank">
              <Member
                hasClickHandler={true}
                img={e.imageURL}
                name={e.name}
                designation={e.skill}
                department={e.department}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Developer;
