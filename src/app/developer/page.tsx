'use client';

import { FaCode } from 'react-icons/fa';
import { developerData } from './data';
import Member from '../Components/Executives/Member';

const Developer = () => {
  return (
    <div className="w-full  bg-[#F6F6F6]">
      <img className="absolute right-0 top-[75vh] z-0" src="/image/bg.svg" alt="bg" />
      <img className="absolute left-0 top-[150vh] z-0" src="/image/bg2.svg" alt="bg" />
      <div className=" container min-h-[100vh] py-[125px] relative flex flex-col">
        <div className="flex mt-0 md:mt-12 items-center md:items-start gap-5">
          <div className="rounded-full  bg-white  shadow-[5px_5px_20px_10px_#00000024] md:mb-3">
            <FaCode className="w-16 sm:w-20 h-16 sm:h-20 text-white bg-black rounded-full p-3 m-5 hover:-rotate-90 transition-all" />
          </div>
          <div>
            <div className=" flex flex-col md:flex-row gap-0 md:gap-3 justify-start md:justify-start items-start md:items-end">
              <h1 className="text-4xl md:text-6xl pb-1 md:pb-2">MEET OUR</h1>
              <h1 className="text-5xl sm:text-6xl md:text-8xl text-blue-500">DEVELOPERS</h1>
            </div>
            <p className="pt-3 mb-12 hidden md:block text-lg">
              We would like to thank our amazing developers who worked hard to create this website.
              They have shown great skill, creativity, and dedication in bringing our vision to
              life. They have overcome many challenges and delivered a high-quality product that we
              are proud of. We appreciate their efforts and contributions to our success.
            </p>
          </div>
        </div>
        <p className="pt-3 mb-12 mt-4 md:hidden text-base">
          We would like to thank our amazing developers who worked hard to create this website. They
          have shown great skill, creativity, and dedication in bringing our vision to life. They
          have overcome many challenges and delivered a high-quality product that we are proud of.
          We appreciate their efforts and contributions to our success.
        </p>
        <div className="my-4 md:my-8 flex flex-col md:flex-row gap-0 md:gap-3 justify-start md:justify-start items-start md:items-end">
          <h1 className="text-4xl md:text-5xl">SUPERVISION AND</h1>
          <h1 className="text-4xl md:text-5xl text-blue-500">GUIDELINES</h1>
        </div>
        <div className="flex pt-2   flex-wrap gap-4 md:gap-8  justify-start">
          <a href="https://www.facebook.com/ahammadshawki8/" target="_blank">
            <Member
              hasClickHandler={true}
              img="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/15.jpg"
              name="Ahammad Shawki"
              designation="President"
              department="Web & App Development"
            />
          </a>
          <a href="https://www.facebook.com/mdnaimur020" target="_blank">
            <Member
              hasClickHandler={true}
              img="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/16.jpg"
              name="Md. Naimur Rahman"
              designation="Secretary"
              department="Web & App Development"
            />
          </a>
          <a href="https://www.facebook.com/kt.prodhan" target="_blank">
            <Member
              hasClickHandler={true}
              img="/image/Developers/Nafe.png"
              name="Nafe Ibne Dalower"
              designation="Organizer"
              department="Batch '24"
            />
          </a>
          <a href="https://www.facebook.com/kt.prodhan" target="_blank">
            <Member
              hasClickHandler={true}
              img="/image/Developers/Adib.jpg"
              name="Adib Adnan Hoque"
              designation="Organizer"
              department="Batch '24"
            />
          </a>
        </div>
        <div className="mt-16 md:mt-24 mb-4 md:mb-8 flex flex-col md:flex-row gap-0 md:gap-3 justify-start md:justify-start items-start md:items-end">
          <h1 className="text-4xl md:text-5xl">FULL-STACK</h1>
          <h1 className="text-4xl md:text-5xl text-blue-500">WEB DEVELOPERS</h1>
        </div>
        <div className="flex pt-2   flex-wrap gap-4 md:gap-8 justify-start">
          <a href="https://www.facebook.com/profile.php?id=100083625623282" target="_blank">
            <Member
              hasClickHandler={true}
              img="/image/Developers/swapnil.jpg"
              name="Wasef Rahman Swapnil"
              designation="Member"
              department="Batch '25"
            />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100083625623282" target="_blank">
            <Member
              hasClickHandler={true}
              img="/image/Developers/hrm_rafsan.jpg"
              name="HRM Rafsan Amin"
              designation="Member"
              department="Batch '25"
            />
          </a>
        </div>
        <div className="mt-16 md:mt-24 mb-4 md:mb-8 flex flex-col md:flex-row gap-0 md:gap-3 justify-start md:justify-start items-start md:items-end">
          <h1 className="text-4xl md:text-5xl">FRONT-END</h1>
          <h1 className="text-4xl md:text-5xl text-blue-500">WEB DEVELOPERS</h1>
        </div>
        <div className="flex pt-2   flex-wrap gap-4 md:gap-8  justify-start">
          {developerData.map((e, i) => {
            return (
              <a href={e.profileURL} target="_blank" key={i}>
                <Member
                  hasClickHandler={true}
                  img={e.imageURL}
                  name={e.name}
                  designation={e.designation}
                  department={e.department}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Developer;
