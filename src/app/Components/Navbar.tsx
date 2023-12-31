'use client';

import { useEffect, useRef, useState } from 'react';
import Hover from './Hover';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const Route = usePathname();
  const Params = useSearchParams();
  const navRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(800);

  useEffect(() => {
    const stateHandler = () => {
      setShowOptions(false);
    };
    const handleClickOutside: EventListener = (e) => {
      if (navRef.current && e.target instanceof Node && !navRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    const listener = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setShowOptions(false);
      }
    };

    setShowOptions(false);

    listener();

    window.addEventListener('hashchange', stateHandler);
    window.addEventListener('resize', listener);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('hashchange', stateHandler);
      window.removeEventListener('resize', listener);
    };
  }, [Route, Params]);

  return (
    <nav
      ref={navRef}
      className={
        'bg-white fixed w-full top-0 z-50 start-0 border-b border-gray-200 ' +
        (showOptions ? 'border-transparent' : '')
      }
    >
      <div className="container flex flex-wrap  items-center justify-between mx-auto py-4 px-1 relative">
        <Link
          href="/"
          onClick={() => {
            setShowOptions(false);
          }}
          className="flex items-center  z-50 space-x-3 rtl:space-x-reverse"
        >
          <Image src="/Logo.png" className="h-12 w-32" alt="NDITC Logo" width={512} height={512} />
        </Link>
        <div className="flex md:order-2 space-x-3   z-50 md:space-x-0 rtl:space-x-reverse">
          <Link
            href="/details/https%3A%2F%2Fnditc.pythonanywhere.com%2Fprojects%2FgAAAAABklDtCA8wgOMZar9YbvFJgn8e-jFUG27Ic9aHwhx40IBCUofeQ_uoinoAgpmskv_ojJNA4I9Rgswp3RLa9wWgp6846Zg%3D%3D/project/1687651200"
            type="button"
            className="text-white bg-[#252525] font-ShareTechTown hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            TRY OUR APP
          </Link>
          <button
            onClick={() => setShowOptions(!showOptions)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {showOptions ? (
              <RxCross2 className={'w-6 h-6'} />
            ) : (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          style={{
            transformOrigin: 'top',
          }}
          className={`items-center justify-between bg-white w-screen md:flex z-30  md:w-auto md:order-1 transition ${
            showOptions || windowWidth > 768 ? 'scale-y-100 ' : 'scale-y-0 pointer-events-none'
          } ${windowWidth <= 768 ? 'fixed top-[81px] pb-5 left-0 border-b border-gray-200' : ''}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col gap-1 container  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/"
                className={
                  'block py-2 px-3  text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-500   md:p-0' +
                  ' ' +
                  (Route === '/'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 md:bg-transparent  md:text-blue-500'
                    : 'md:text-black hover:bg-gray-200 md:bg-transparent')
                }
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/about"
                className={
                  'block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent   md:hover:text-blue-500 md:p-0' +
                  ' ' +
                  (Route === '/about'
                    ? 'bg-blue-600 text-white hover:bg-blue-700  md:bg-transparent  md:text-blue-500'
                    : 'md:text-black hover:bg-gray-200 md:bg-transparent')
                }
              >
                About
              </Link>
            </li>
            <li>
              <Hover
                setShowOption={() => setShowOptions(false)}
                text="Activities"
                showOptions={showOptions}
                windowWidth={windowWidth}
              />
            </li>
            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/executive"
                className={
                  'block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent   md:hover:text-blue-500 md:p-0' +
                  ' ' +
                  (Route === '/executive'
                    ? 'bg-blue-600 text-white hover:bg-blue-700  md:bg-transparent  md:text-blue-500'
                    : 'md:text-black hover:bg-gray-200 md:bg-transparent')
                }
              >
                Executives
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/#Contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
