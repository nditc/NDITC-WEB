'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';
interface Props {
  windowWidth: number;
  text: string;
  showOptions: boolean;
  setShowOption: () => void;
}

const Hover = ({ text, showOptions, windowWidth, setShowOption }: Props) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const Route = usePathname();
  useEffect(() => {
    const listener = () => {
      if (window.innerHeight >= 768) {
        setOpen(false);
      }
    };
    listener();
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [showOptions]);
  return (
    <div className="relative z-50">
      {windowWidth >= 768 ? (
        <Link
          href="/activities?type=event"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          onClick={setShowOption}
          className={
            'block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0' +
            ' ' +
            (Route === '/activities' ? 'md:text-blue-500' : '') +
            ' ' +
            (hover ? 'text-blue-500' : 'text-gray-900 ')
          }
          type="button"
        >
          {text}
        </Link>
      ) : (
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            setOpen((s) => !s);
          }}
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          className={
            'flex items-center gap-1 py-2 justify-between px-3 text-gray-900 w-full text-left rounded  md:hover:bg-transparent md:hover:text-blue-500 md:p-0' +
            ' ' +
            (open && !(Route === '/activities') ? 'bg-gray-200 hover:bg-gray-300' : '') +
            ' ' +
            (Route === '/activities'
              ? 'bg-blue-600 text-white hover:bg-blue-700  md:text-blue-500'
              : ' md:text-black hover:bg-gray-200') +
            ' '
          }
          type="button"
        >
          {text}
          <FaAngleLeft className={`transition ${open ? '-rotate-90' : 'rotate-0'}`} />
        </button>
      )}

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        id="dropdownHover"
        className={`md:bg-transparent top-7  right-0 flex transition-all duration-300 items-center md:w-[150px] justify-evenly md:absolute divide-y divide-gray-100 rounded-lg  ${
          hover
            ? 'md:blur-0 md:-translate-y-1 md:left-0 md:-translate-x-3 md:opacity-100 md:z-50'
            : 'md:blur-0 md:-translate-y-36 md:left-0 md:-translate-x-3 md:opacity-0 md:z-[-1] md:pointer-events-none'
        }  ${
          open
            ? 'z-50 bg-gray-100  h-[180px] md:h-auto  overflow-hidden my-1 md:my-0'
            : 'h-0 md:h-auto overflow-hidden md:overflow-visible'
        }`}
      >
        <ul
          className="py-2 flex-1 text-base md:text-sm shadow-black md:bg-white md:mt-3 text-gray-700 md:shadow-2xl rounded-lg"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              onClick={setShowOption}
              href="/activities?type=event"
              className="block px-4 py-2 hover:bg-gray-200  md:hover:bg-gray-100   md:hover:text-blue-500"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              onClick={setShowOption}
              href="/activities?type=workshop&scroll=true"
              className="block px-4 py-2 hover:bg-gray-200  md:hover:bg-gray-100   md:hover:text-blue-500"
            >
              Workshop
            </Link>
          </li>

          <li>
            <Link
              onClick={setShowOption}
              href="/activities?type=project&scroll=true"
              className="block px-4 py-2 hover:bg-gray-200  md:hover:bg-gray-100   md:hover:text-blue-500"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              onClick={setShowOption}
              href="/activities?type=publication&scroll=true"
              className="block px-4 py-2 md:hover:bg-gray-100 hover:bg-gray-200 md:hover:text-blue-500"
            >
              Publication
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hover;
