"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  windowWidth: number;
  text: string;
  imageLink: string;
}

const Hover = ({ text, imageLink, windowWidth }: Props) => {
  const [hover, setHover] = useState(false);
  const Route = usePathname();

  return (
    <div className="relative z-50">
      {windowWidth > 768 ? (
        <Link
          href="/activities?type=event"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          className={
            "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0" +
            " " +
            (Route === "/activities" ? "md:text-blue-500" : "md:text-black")
          }
          type="button"
        >
          {text}
        </Link>
      ) : (
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          className={
            "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0" +
            " " +
            (Route === "/activities" ? "md:text-blue-500" : "md:text-black")
          }
          type="button"
        >
          {text}
        </button>
      )}

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        id="dropdownHover"
        className={`bg-white top-7 shadow-2xl right-0 flex transition-all duration-300 items-center md:w-fit justify-evenly absolute divide-y divide-gray-100 rounded-lg ${
          hover
            ? "blur-0 -translate-y-1 left-0 md:-translate-x-3 opacity-100 z-50"
            : "blur-0 -translate-y-36 left-0 md:-translate-x-3 opacity-0 z-[-1] pointer-events-none"
        }`}
      >
        <ul
          className="py-2 flex-1 text-sm text-gray-700 "
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              href="/activities?type=event"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/activities?type=workshop&scroll=true"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              Workshop
            </Link>
          </li>

          <li>
            <Link
              href="/activities?type=project&scroll=true"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/activities?type=publication&scroll=true"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
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
