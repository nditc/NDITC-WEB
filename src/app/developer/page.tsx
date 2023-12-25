"use client";

import { FaCode } from "react-icons/fa";
import { developerData } from "./data";
import Member from "../Components/Executives/Member";

const Developer = () => {
  return (
    <div className="w-full min-h-[100vh] py-[125px] md:px-12 px-5 bg-[#F6F6F6] relative flex flex-col">
      <div className="flex items-center gap-3">
        <div className="rounded-full shadow-[5px_5px_20px_10px_#00000024] md:mb-3">
          <FaCode className="w-20 h-20 text-white bg-black rounded-full p-3 m-3 hover:-rotate-90 transition-all" />
        </div>

        <div className="my-12 flex flex-col md:flex-row gap-3 justify-center md:justify-start items-start md:items-end">
          <h1 className="text-4xl md:text-6xl pb-1 md:pb-2">MEET OUR</h1>
          <h1 className="text-6xl md:text-8xl text-blue-500">DEVELOPERS</h1>
        </div>
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-3 justify-center md:justify-start items-start md:items-end">
        <h1 className="text-4xl md:text-6xl">SUPERVISION AND</h1>
        <h1 className="text-4xl md:text-6xl text-blue-500">GUIDELINES</h1>
      </div>

      <div className="flex pt-10 flex-wrap justify-between">
        <a href="https://www.facebook.com/ahammadshawki8/" target="_blank">
          <Member
            hasClickHandler={true}
            img="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/15.jpg"
            name="Ahammad Shawki"
            designation="Full Stack WEB Developer"
            department="Web & App Development"
          />
        </a>

        <a href="https://www.facebook.com/kt.prodhan" target="_blank">
          <Member
            hasClickHandler={true}
            img="https://portfolio-of-nafe.web.app/assets/img/profile-img.png"
            name="Nafe Ibne Dalower"
            designation="Full Stack WEB Developer"
            department="Web & App Development"
          />
        </a>

        <a href="https://www.facebook.com/kt.prodhan" target="_blank">
          <Member
            hasClickHandler={true}
            img="/image/Developers/Adib.jpg"
            name="Adib Adnan"
            designation="Main Designer"
            department="Web & App Development"
          />
        </a>

        <a href="https://www.facebook.com/mdnaimur020" target="_blank">
          <Member
            hasClickHandler={true}
            img="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/16.jpg"
            name="Md. Naimur Rahman"
            designation="Backend Developer"
            department="Web & App Development"
          />
        </a>
      </div>

      <div className="mt-36 mb-10 flex flex-col md:flex-row gap-3 justify-center md:justify-start items-start md:items-end">
        <h1 className="text-4xl md:text-6xl">FULL-STACK</h1>
        <h1 className="text-4xl md:text-6xl text-blue-500">WEB DEVELOPERS</h1>
      </div>

      <div className="flex pt-10 flex-wrap gap-56 justify-start">
        <a
          href="https://www.facebook.com/profile.php?id=100083625623282"
          target="_blank"
        >
          <Member
            hasClickHandler={true}
            img="https://scontent.fdac142-1.fna.fbcdn.net/v/t39.30808-6/383970588_283776561086529_4495662120361222194_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Fr03OW0sMPYAX_iCC8r&_nc_ht=scontent.fdac142-1.fna&oh=00_AfBM0jKSYfsyKxme2VO99pw_s0f7MdLEhV05Lgt26b6-cg&oe=658BD1AE"
            name="Wasef Rahman Swapnil"
            designation="Full Stack WEB Developer"
            department=""
          />
        </a>

        <a
          href="https://www.facebook.com/profile.php?id=100083625623282"
          target="_blank"
        >
          <Member
            hasClickHandler={true}
            img=""
            name="HRM Rafsan Amin"
            designation="Full Stack WEB Developer"
            department=""
          />
        </a>
      </div>

      <div className="mt-36 mb-10 flex flex-col md:flex-row gap-3 justify-center md:justify-start items-start md:items-end">
        <h1 className="text-4xl md:text-6xl">FRONTEND</h1>
        <h1 className="text-4xl md:text-6xl text-blue-500">DEVELOPERS</h1>
      </div>

      <div className="flex pt-10 flex-wrap gap-56 justify-start">
        {developerData.map((e, i) => {
          return (
            <a href={e.profileURL} target="_blank" key={i}>
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
