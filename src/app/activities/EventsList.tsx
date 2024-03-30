'use client';

import { useSearchParams } from 'next/navigation';
import Event from '../Components/Event';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PiSmileySad } from 'react-icons/pi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { GrWorkshop } from 'react-icons/gr';
import { FaProjectDiagram } from 'react-icons/fa';
import { BiSolidBook } from 'react-icons/bi';

type Events = {
  data: [
    {
      category: 'event' | 'workshop';
      details_url: string;
      image_url: string;
      subtitle: string;
      timestamp: number;
      title: string;
    }
  ];
};

const EventsList = ({ data }: { data: any[] }) => {
  const [typeString, setTypeString] = useState<string>('events');
  const type = useSearchParams().get('type');
  const scroll = useSearchParams().get('scroll');

  useEffect(() => {
    if (scroll) {
      document.getElementById('SCROLLHERE')?.scrollIntoView();
    }

    if (type != 'events' && type != 'project' && type != 'publication' && type != 'workshop') {
      setTypeString('event');
    } else {
      setTypeString(type);
    }
  }, [type, scroll]);

  return (
    <section className="w-full">
      <div className="flex  flex-col lg:flex-row my-auto  justify-between gap-3 lg:gap-8 mb-5 lg:mb-6">
        <h1
          className="text-[2.5rem] md:text-5xl leading-none ml-1 my-auto items-center justify-center self-start md:justify-start"
          id="SCROLLHERE"
        >
          <span className=" text-blue-500 ">ALL</span>
          {' ' + typeString + 'S'}
        </h1>
        <div className="flex sm:relative my-auto gap-2 justify-between sm:justify-start  flex-wrap">
          <Link
            href="/activities?type=event&scroll=true"
            type="button"
            className={` shadow-md sm:shadow-lg flex gap-2 basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto items-center font-Nunito font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
              type == 'event'
                ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <BsCalendar2EventFill
              className={
                'w-[1.125rem] h-[1.125rem] ' +
                (type === 'event' ? 'text-blue-200' : 'text-blue-500')
              }
            />
            Events
          </Link>
          <Link
            href="/activities?type=workshop&scroll=true"
            type="button"
            className={`shadow-md sm:shadow-lg font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
              type == 'workshop'
                ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <GrWorkshop
              className={
                'w-[1.125rem] h-[1.125rem] ' +
                (type === 'workshop' ? 'text-blue-200' : 'text-blue-500')
              }
            />
            Workshop
          </Link>
          <Link
            href="/activities?type=project&scroll=true"
            type="button"
            className={` shadow-md sm:shadow-lg font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0  sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
              type == 'project'
                ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <FaProjectDiagram
              className={
                'w-[1.125rem] h-[1.125rem] ' +
                (type === 'project' ? 'text-blue-200' : 'text-blue-500')
              }
            />
            Projects
          </Link>
          <Link
            href="/activities?type=publication&scroll=true"
            type="button"
            className={` shadow-md sm:shadow-lg  font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none active:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
              type == 'publication'
                ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <BiSolidBook
              className={
                'w-[1.125rem] h-[1.125rem] ' +
                (type === 'publication' ? 'text-blue-200' : 'text-blue-500')
              }
            />
            Publication
          </Link>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid-fluid-fill-[16.5rem] gap-3  2xl:gap-5 justify-items-center w-full">
          {data.map((e, i) => {
            return (
              <Event
                title={e.title}
                imageURL={e.image_url || e.images[0]}
                descURL={
                  e.details_url || 'https://nditc.pythonanywhere.com/api/v1/' + type + 's/' + e.id
                }
                isOngoing={e.isUpcoming}
                timestamp={e.timestamp}
                shortDesc={e.short_description}
                key={i}
                type={typeString}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center place-items-center w-full text-2xl my-5 min-h-[50vh] py-5 rounded-lg md:rounded-xl  text-center">
          <PiSmileySad color={'#3b82f6'} size={150} />
          <p>
            We have <span className="text-blue-500 inline">nothing</span>
            <br></br> to show here
          </p>
        </div>
      )}
    </section>
  );
};

interface EventDataFormat {
  title: string;
  description: string;
  imageURL: string;
}

export default EventsList;
