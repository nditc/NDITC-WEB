"use client";

import { useEffect, useState } from "react";
import Hover from "./Hover";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const Route = usePathname();
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-4 px-1 relative">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/Logo.png"
            className="h-12 w-32"
            alt="NDITC Logo"
            width={512}
            height={512}
          />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <a
            href="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/nditc.apk"
            type="button"
            className="text-white bg-[#252525] font-ShareTechTown hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            TRY OUR APP
          </a>
          <button
            onClick={() => setShowOptions(!showOptions)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
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
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            showOptions ? "" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className={
                  "block py-2 px-3 text-white bg-blue-700 hover:text-blue-500 rounded md:bg-transparent  md:p-0" +
                  " " +
                  (Route === "/" ? "md:text-blue-500" : "md:text-black")
                }
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={
                  "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0" +
                  " " +
                  (Route === "/about" ? "md:text-blue-500" : "md:text-black")
                }
              >
                About
              </Link>
            </li>
            <li>
              <Hover
                text="Activities"
                imageLink="/HoverImage1.png"
                windowWidth={windowWidth}
              />
            </li>
            <li>
              <Link
                href="/executive"
                className={
                  "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0" +
                  " " +
                  (Route === "/executive"
                    ? "md:text-blue-500"
                    : "md:text-black")
                }
              >
                Executives
              </Link>
            </li>

            <li>
              <Link
                href="/#Contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
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
