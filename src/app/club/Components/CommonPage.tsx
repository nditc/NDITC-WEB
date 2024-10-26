'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Section {
  heading: string;
  content: React.ReactNode;
  subSections?: Section[];
}

interface CommonPageProps {
  heading: string;
  sections: Section[];
  icon: React.ReactNode;
  hasTableOfContent?: boolean;
}

const Sections = ({ sections, subNumber }: { sections: Section[]; subNumber?: string }) => {
  const subNum = subNumber ? subNumber : '';
  return (
    <>
      {sections.map(({ heading, content, subSections }, index) => {
        return (
          <>
            <div className="section" id={subNum + index.toString()} key={index}>
              <h2
                className={
                  (subNum ? 'text-xl font-Nunito font-bold ' : 'text-4xl ') +
                  (index !== 0 && !subNum ? 'mt-12 ' : '') +
                  (subNum ? 'mt-4 ' : '')
                }
              >
                {heading}
              </h2>
              <div className="text-justify">{content}</div>
            </div>
            {subSections?.length ? (
              <Sections sections={subSections} subNumber={subNum + index.toString()} />
            ) : null}
          </>
        );
      })}
    </>
  );
};

const TOCList = ({
  sections,
  subNumber,
  scrollPos,
}: {
  sections: Section[];
  subNumber?: string;
  scrollPos?: number;
}) => {
  const subNum = subNumber ? subNumber : '';
  const ref = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    // ref.current?.scrollTo({
    //   top: (ref.current?.scrollHeight - ref?.current.clientHeight || 0) * (scrollPos || 0),
    // });
  }, [scrollPos]);
  return (
    <ul
      ref={ref}
      style={{
        overscrollBehavior: 'contain',
        height: subNum ? 'auto' : 'calc(65vh - 36px - 5rem)',
      }}
      className={
        'flex flex-col gap-2   mt-2 ' +
        (subNum
          ? ' overflow-visible border-l scroll '
          : ' overflow-y-auto overflow-x-visible pl-2  pb-5 ')
      }
    >
      {sections.map(({ heading, content, subSections }, index) => {
        return (
          <li key={index} className={'list-disc cursor-pointer ml-[0.9rem] '}>
            <a href={'#' + subNum + index}>
              <p
                className={'text-base hover:underline' + (subNum ? ' font-light' : ' font-medium')}
              >
                {heading}
              </p>
            </a>
            {subSections?.length ? (
              <TOCList sections={subSections} subNumber={subNum + index.toString()} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};
const CommonPage = ({ heading, icon, sections, hasTableOfContent }: CommonPageProps) => {
  const headingArray = heading.split(' ');
  const firstWord = headingArray.splice(0, 1) + ' ';
  const restWord = headingArray.join(' ');
  const [scrollPos, setScrollPos] = useState<number>(0);
  useEffect(() => {
    const handler = () => {
      setScrollPos(
        document.documentElement.scrollTop /
          (document.documentElement.scrollHeight - window.innerHeight)
      );
    };
    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);
  return (
    <div className="mt-[81px] bg-[#F6F6F6]">
      <div
        style={{
          transform: `scaleX(${scrollPos})`,
          transformOrigin: 'left',
        }}
        className="fixed top-[80px] left-0 h-1 z-30 bg-primary transition ease-linear w-screen "
      ></div>
      <div className="container pt-5 pb-16">
        <div className={'flex gap-5 items-center sm:justify-start'}>
          <span className="p-5 shadow-2xl rounded-full bg-white ">{icon}</span>
          <h1 className="text-6xl">
            <span className="text-primary ">{firstWord}</span>
            <span>{restWord}</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-12 pt-8">
          {hasTableOfContent ? (
            <div className="bg-white shadow-2xl rounded-xl p-8 basis-[310px]  md:sticky top-[96px] h-[65vh]">
              <h2 className="text-3xl">
                <span className="text-primary">Table</span> of contents
              </h2>
              <div className="mt-4">
                <TOCList sections={sections} scrollPos={scrollPos} />
              </div>
            </div>
          ) : null}
          <div className={'flex-1' + (!hasTableOfContent ? ' md:mr-0 cont' : '')}>
            <Sections sections={sections} />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
