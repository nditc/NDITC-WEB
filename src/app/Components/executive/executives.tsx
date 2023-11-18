'use client';
import Image from 'next/image';

import React, { Dispatch, SetStateAction } from 'react';

import ExecutiveData from '../../db/executives';
import Modal from '../../Components/Executive/Modal';
import Member from './Member';

const Executives = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<[number, number] | null>>;
}) => {
  const [state, setState] = React.useState<number>(0);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <div className="flex pt-10 flex-wrap">
      <div className={'sticky top-24 md:w-auto w-full md:h-[20vw] h-[48px] z-10 mb-10'}>
        <div className={'session-selector' + ' ' + (isOpen ? 'open' : 'close')}>
          {ExecutiveData.sessions.map(({ session }, index) => {
            return (
              <div
                className={
                  'p-3 font-bold relative text-center md:rounded-xl inline-block cursor-pointer min-w-[135px] session-list-item hover:text-blue-500 hover:bg-blue-50 ' +
                  (state === index ? 'bg-white text-blue-500 shadow-lg active-elem' : '')
                }
                key={session}
                onClick={() => {
                  setOpen((s) => !s);
                  setState(index);
                }}
              >
                <p>{session}</p>
                <Image
                  width={48}
                  height={48}
                  alt={'Image'}
                  src="/image/la.svg"
                  className={
                    'w-[8px] absolute right-8 transition-all top-1/2 translate-y-[-50%]' +
                    ' ' +
                    (isOpen ? 'rotate-[-90deg]' : 'rotate-0')
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid-design grow md:pl-10">
        {ExecutiveData.sessions[state].members.map(({ image_url, name, post, dept }, index) => (
          <div key="" onClick={() => setModalState([state, index])}>
            <Member img={image_url} name={name} designation={post} department={dept} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Executives;
