'use client';

import { FaCode } from 'react-icons/fa';
import Member from './Member';
import setter from '@/data/setter_data';
import { useState } from 'react';
import { IoExtensionPuzzle, IoExtensionPuzzleOutline } from 'react-icons/io5';

const Setter = () => {
  return (
    <section
      id="setter"
      className="w-screen h-fit pt-16 pb-16 object-cover bg-[#f6f6f6] text-center"
    >
      <div className="w-full container flex flex-col justify-start">
        {/* <img className="absolute right-0 top-[75vh] z-0" src="/image/bg.svg" alt="bg" />
      <img className="absolute left-0 top-[150vh] z-0" src="/image/bg2.svg" alt="bg" /> */}

        <h1 className="align-middle">
          <IoExtensionPuzzleOutline className="w-8 h-8 md:w-12 md:h-12 inline align-top mr-2 text-primary md:-mt-1" />
          <span className="text-4xl md:text-5xl text-primary inline">Problem</span>
          &nbsp; &nbsp;
          <span className="text-4xl md:text-5xl  inline">Setters</span>
        </h1>
        <p className="py-3  hidden md:block text-lg  text-center">
          Hats off to all the brilliant setters who craft mind-bending problems, keeping us hooked
          and our coding skills razor-sharp!
        </p>
        <div className="pt-2 mt-4 md:mt-5  2xl:px-8  flex flex-wrap gap-4 2xl:gap-8  items-start justify-start">
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
