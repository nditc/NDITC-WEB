import React from 'react';
import Image from 'next/image';

interface BlogPost {
  title: string;
  desc: string;
  imgURL: string;
}

const ActivityCards = () => {
  const blogPosts: BlogPost[] = [
    {
      title: 'National Level events and festivals',
      desc: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ',
      imgURL: '/image/activityCard/1.jpeg',
    },
    {
      title: 'ReGular Workshop and seminar',
      desc: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ',
      imgURL: '/image/activityCard/2.jpeg',
    },
    {
      title: 'Research and Development based cloud projects',
      desc: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ',
      imgURL: '/image/activityCard/3.jpeg',
    },
    {
      title: 'Annual publication',
      desc: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est suscipit nulla amet itaque? Nam tenetur aut eaque error quibusdam ipsa vitae distinctio id, ',
      imgURL: '/image/activityCard/4.jpeg',
    },
  ];
  return (
    <div className="w-full gap-3 justify-center py-5 grid sm:grid-cols-2 lg:grid-cols-4">
      {blogPosts.map(({ imgURL, title, desc }, i) => {
        return (
          <div key={i} className={`bg-[#2E2E2E] shadow-lg h-full rounded-xl duration-1000`}>
            <Image
              src={imgURL}
              alt={'Image'}
              width={512}
              height={512}
              className="w-full aspect-video object-cover rounded-t-xl"
            />
            <div className="p-5 flex-1 flex flex-col gap-2 text-center ">
              <h1 className={'text-white  text-2xl min-h-[64px] break-words' + ' '}>{title}</h1>
              <p className={'font-Roboto text-base text-white font-light pb-2'}>{desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityCards;
