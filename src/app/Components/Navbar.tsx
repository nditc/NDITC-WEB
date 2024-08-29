"use client";

import { useEffect, useRef, useState } from "react";
import Hover from "./Hover";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import ClubNavbar from "../club/Components/Layout/Navbar";

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
      if (
        navRef.current &&
        e.target instanceof Node &&
        !navRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    const listener = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setShowOptions(false);
      }
    };
    setShowOptions(false);

    listener();

    window.addEventListener("hashchange", stateHandler);
    window.addEventListener("resize", listener);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("hashchange", stateHandler);
      window.removeEventListener("resize", listener);
    };
  }, [Route, Params]);

  return Route.includes("club") ? (
    <ClubNavbar />
  ) : (
    <nav
      ref={navRef}
      className={
        "fixed start-0 top-0 z-50 w-full max-w-[100vw] border border-gray-200 bg-white " +
        (showOptions ? "border-transparent" : "")
      }
    >
      <div className="container relative mx-auto flex flex-wrap items-center justify-between px-1 py-4">
        <Link
          href="/"
          onClick={() => {
            setShowOptions(false);
          }}
          className="z-50 flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/Logo.png"
            className="h-12 w-32"
            alt="NDITC Logo"
            width={512}
            height={512}
          />
        </Link>
        <div className="z-50 flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <Link
            href="/details/U2FsdGVkX1%2BAo1HnTjk4aPrXkCt9rh1%2BNX%2FDWCpvsejwdtAoSjewOeYdKkZbh6aGaCzc66CV12V3COPzTfJdiRVwQsKY9T7hTEK5uHR6K4odMR4G%2FHndw%2BsLnz%2FamA1HVEDOV9n%2FeVAQ7U3yvYJftX0vc455XIZ3msRakGeLRfcnSfCudDzNtNO2z%2BBV3BJ3Q%2FAiKPNaCas8xNySX8iKn2q6N6OfEw4tQeh7SlogJS4%3D/project/1687651200"
            type="button"
            className="before:ease relative overflow-hidden rounded-lg border border-black bg-[#252525] px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-white shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:bg-zinc-700 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-blue-300 md:px-2 lg:px-4"
          >
            <span className="relative z-10 hidden xsm:inline">TRY OUR APP</span>
            <Image
              width={20}
              height={20}
              className="inline invert xsm:hidden"
              src="/image/icon/d_app.png"
              alt=""
            />
          </Link>
          <button
            onClick={() => setShowOptions(!showOptions)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {showOptions ? (
              <RxCross2 className={"h-6 w-6"} />
            ) : (
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          style={{
            transformOrigin: "top",
          }}
          className={`z-30 w-screen items-center justify-between bg-white transition md:order-1 md:flex md:w-auto ${
            showOptions || windowWidth >= 768
              ? "scale-y-100"
              : "pointer-events-none scale-y-0"
          } ${
            windowWidth < 768
              ? "fixed left-0 top-[72px] border-b border-gray-200 pb-5"
              : ""
          }`}
          id="navbar-sticky"
        >
          <ul className="Inter container mt-4 flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:gap-0 md:space-x-5 md:border-0 md:bg-white md:p-0 lg:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/"
                className={
                  "block rounded px-3 py-2 text-gray-900 md:p-0 md:hover:bg-transparent md:hover:text-blue-500" +
                  " " +
                  (Route === "/"
                    ? "bg-blue-600 text-white hover:bg-blue-700 md:bg-transparent md:text-blue-500"
                    : "hover:bg-gray-200 md:bg-transparent md:text-black")
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
                  "block rounded px-3 py-2 text-gray-900 md:p-0 md:hover:bg-transparent md:hover:text-blue-500" +
                  " " +
                  (Route === "/about"
                    ? "bg-blue-600 text-white hover:bg-blue-700 md:bg-transparent md:text-blue-500"
                    : "hover:bg-gray-200 md:bg-transparent md:text-black")
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
                  "block rounded px-3 py-2 text-gray-900 md:p-0 md:hover:bg-transparent md:hover:text-blue-500" +
                  " " +
                  (Route === "/executive"
                    ? "bg-blue-600 text-white hover:bg-blue-700 md:bg-transparent md:text-blue-500"
                    : "hover:bg-gray-200 md:bg-transparent md:text-black")
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
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-200 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
              >
                Contact
              </Link>
            </li>

            {windowWidth <= 768 && (
              <li>
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="/developer"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-200 md:p-0 md:hover:bg-transparent md:hover:text-blue-500"
                >
                  Developers
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
