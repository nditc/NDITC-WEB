"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
interface Props {
  windowWidth: number;
  children: React.ReactNode;
  showOptions: boolean;
  menuItems: {
    name: string;
    href: string;
  }[];
  href: string;
}

const Hover = ({
  children,
  showOptions,
  windowWidth,
  menuItems,
  href,
}: Props) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const Route = usePathname();
  useEffect(() => {
    const listener = () => {
      if (window.innerHeight >= 1024) {
        setOpen(false);
      }
    };
    listener();
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [showOptions]);
  return (
    <li>
      <div className="relative z-50">
        {windowWidth >= 1024 ? (
          <Link
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className={
              "block rounded px-3 py-2 hover:bg-gray-100 lg:p-0 lg:hover:bg-transparent" +
              " " +
              (Route === href ? "lg:text-blue-500" : "") +
              " " +
              (hover ? "text-blue-500" : "text-gray-900")
            }
            type="button"
          >
            {children}
          </Link>
        ) : (
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((s) => !s);
            }}
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className={
              "flex w-full items-center justify-between gap-1 rounded px-3 py-2 text-left text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500" +
              " " +
              (open && !(Route === "/activities")
                ? "bg-gray-200 hover:bg-gray-300"
                : "") +
              " " +
              (Route === href
                ? "bg-blue-600 text-white hover:bg-blue-700 lg:text-blue-500"
                : " hover:bg-gray-200 lg:text-black") +
              " "
            }
            type="button"
          >
            {children}
            <FaAngleLeft
              className={`transition ${open ? "-rotate-90" : "rotate-0"}`}
            />
          </button>
        )}

        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          id="dropdownHover"
          className={`right-0 top-7 flex items-center justify-evenly divide-y divide-gray-100 rounded-lg transition-all duration-300 lg:absolute lg:w-[150px] lg:bg-transparent ${
            hover
              ? "lg:left-0 lg:z-50 lg:-translate-x-3 lg:-translate-y-1 lg:opacity-100 lg:blur-0"
              : "lg:pointer-events-none lg:left-0 lg:z-[-1] lg:-translate-x-3 lg:-translate-y-36 lg:opacity-0 lg:blur-0"
          } ${
            open
              ? "z-50 my-1 h-[180px] overflow-hidden bg-gray-100 lg:my-0 lg:h-auto"
              : "h-0 overflow-hidden lg:h-auto lg:overflow-visible"
          }`}
        >
          <ul
            className="flex-1 rounded-lg py-2 text-base text-gray-700 shadow-black lg:mt-3 lg:bg-white lg:text-sm lg:shadow-2xl"
            aria-labelledby="dropdownHoverButton"
          >
            {menuItems.map((d, i) => {
              return (
                <li key={i}>
                  <Link
                    href={d.href}
                    className="block px-4 py-2 hover:bg-gray-200 lg:hover:bg-gray-100 lg:hover:text-blue-500"
                  >
                    {d.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Hover;
