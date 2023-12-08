'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  desc: string;
  imgURL: string;
}

const Card = ({ title, desc, imgURL }: CardProps) => {
  const [hover, setHover] = useState<boolean>();

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`bg-[#2E2E2E] cursor-pointer relative shadow-lg h-full rounded-xl duration-300  overflow-hidden min-h-[360px]`}
    >
      <p
        className={
          'absolute right-5 top-5 z-20 text-white font-bold transition-transform' +
          ' ' +
          (hover ? 'translate-x-0' : 'translate-x-60')
        }
      >
        Click to know More →{' '}
      </p>
      <Image
        src={imgURL}
        alt={'Image'}
        width={512}
        height={512}
        className={
          'w-full aspect-video object-cover rounded-t-xl ' + ' ' + (hover ? 'opacity-0' : '')
        }
      />
      <Image
        src={imgURL}
        alt={'Image'}
        width={512}
        height={512}
        className={
          'w-full aspect-video object-cover rounded-t-xl transition-filter transition-all absolute top-0' +
          ' ' +
          (hover ? 'h-full brightness-50 blur-sm opacity-100' : 'h-[250px] opacity-0')
        }
      />
      <div
        className={'p-5 flex-1 flex flex-col gap-2 text-center ' + ' ' + (hover ? 'opacity-0' : '')}
      >
        <h1
          className={'text-white grid place-items-center text-2xl min-h-[64px] break-words' + ' '}
        >
          {title}
        </h1>
        <p
          style={{ textAlignLast: 'center' }}
          className={'font-Nunito text-base text-white  text-justify font-light pb-2'}
        >
          {desc}
        </p>
      </div>
      <div
        className={
          'p-5 flex-1 flex flex-col gap-2 text-center absolute bottom-0 transition-all' +
          ' ' +
          (hover ? '-translate-y-0 opacity-100' : '-translate-y-12 opacity-0')
        }
      >
        <h1
          className={'text-white grid place-items-center text-2xl min-h-[64px] break-words' + ' '}
        >
          {title}
        </h1>
        <p
          style={{ textAlignLast: 'center' }}
          className={'font-Nunito text-base text-white  text-justify font-light pb-2'}
        >
          {desc}
        </p>
      </div>
    </div>
  );
};
const ActivityCards = () => {
  const blogPosts: CardProps[] = [
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
    <div className="w-full gap-5 justify-center py-5 grid sm:grid-cols-2 lg:grid-cols-4">
      {blogPosts.map(({ imgURL, title, desc }, i) => {
        return <Card title={title} desc={desc} imgURL={imgURL} key={i} />;
      })}
    </div>
  );
};

export default ActivityCards;
