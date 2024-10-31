"use client";

import { useEffect, useRef, useState } from "react";
import Hover from "./Hover";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import ClubNavbar from "../../club/Components/Layout/Navbar";
import { Avatar } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useUserData } from "@/app/club/Components/Layout/UserDataProvider";
import { LuLogIn } from "react-icons/lu";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const Route = usePathname();
  const Params = useSearchParams();
  const navRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(800);
  const userAuth = useAuthState(auth);

  const { userData } = useUserData();

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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
      if (window.innerWidth >= 1024) {
        setShowOptions(false);
      }
    };
    setShowOptions(false);

    listener();

    window.addEventListener("hashchange", stateHandler);
    window.addEventListener("resize", listener);
    document.addEventListener("mousedown", handleClickOutside);

    const install = (e: any) => {
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", install);

    return () => {
      window.removeEventListener("hashchange", stateHandler);
      window.removeEventListener("resize", listener);
      window.removeEventListener("beforeinstallprompt", install);
    };
  }, [Route, Params]);

  return (
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
          <img
            src="/Logo.png"
            className="h-12 w-32"
            alt="NDITC Logo"
            width={512}
            height={512}
          />
        </Link>
        <div className="z-50 flex items-center space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse">
          <Link
            href="/details/61ca02bf8daf0e6c4ef079990a0232c3ed79d9d23739a7131ca100dc841d538b7a7198def108d9490751f50ddee87b83eb9d48481de53630f8587d86f5d069765b950e0ac33a533a8a01acb2c811678f1319baade6c623e241987053835600f74466d9c1945caf46435209af9cdd5589c954b4a275113eae0203d7b9137965ae9de9f97b38675880101087c25bf3adc6512956df3c9e1726bebf3a39ee601cac/project/1687651200"
            className="before:ease relative mr-1 hidden overflow-hidden rounded-lg border border-black bg-[#252525] px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-white shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:bg-zinc-700 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:block lg:mr-3 lg:px-2 lg:px-4"
          >
            <img
              width={20}
              height={20}
              className="inline invert"
              src="/image/icon/d_app.png"
              alt=""
            />
            <span className="relative z-10"> APP</span>
          </Link>

          {userAuth && userData ? (
            <Link
              href="/club/profile"
              type="button"
              className="before:ease relative flex items-center overflow-hidden rounded-lg px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-black transition before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:transition-all before:duration-300 hover:opacity-80 hover:before:-rotate-180 focus:outline-none focus:ring-4 active:scale-105 lg:px-2 xl:px-4"
            >
              <Avatar
                isBordered
                color="primary"
                src={userData?.imageUrl}
                className=""
              />
            </Link>
          ) : (
            <Link
              href="/club/login"
              type="button"
              className="before:ease relative flex items-center overflow-hidden rounded-lg border bg-zinc-400 px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-black before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-zinc-300 before:transition-all before:duration-300 hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-zinc-400 lg:px-2 xl:px-4"
            >
              <LuLogIn className="z-10 h-5 w-5 xsm:mr-2 xsm:h-4 xsm:w-4" />
              <span className="relative z-10 hidden xsm:inline">LOGIN</span>
            </Link>
          )}

          <button
            onClick={() => setShowOptions(!showOptions)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
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
          className={`z-30 w-screen items-center justify-between bg-white transition lg:order-1 lg:flex lg:w-auto ${
            showOptions || windowWidth >= 1024
              ? "scale-y-100"
              : "pointer-events-none scale-y-0"
          } ${
            windowWidth < 1024
              ? "fixed left-0 top-[72px] border-b border-gray-200 pb-5"
              : ""
          }`}
          id="navbar-sticky"
        >
          <ul className="Inter container mt-4 flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium lg:mt-0 lg:flex-row lg:gap-0 lg:space-x-5 lg:space-x-8 lg:border-0 lg:bg-white lg:p-0 rtl:space-x-reverse">
            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/"
                className={
                  "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500" +
                  " " +
                  (Route === "/"
                    ? "bg-blue-600 text-white hover:bg-blue-700 lg:bg-transparent lg:text-blue-500"
                    : "hover:bg-gray-200 lg:bg-transparent lg:text-black")
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
                  "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500" +
                  " " +
                  (Route === "/about"
                    ? "bg-blue-600 text-white hover:bg-blue-700 lg:bg-transparent lg:text-blue-500"
                    : "hover:bg-gray-200 lg:bg-transparent lg:text-black")
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
                  "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500" +
                  " " +
                  (Route === "/executive"
                    ? "bg-blue-600 text-white hover:bg-blue-700 lg:bg-transparent lg:text-blue-500"
                    : "hover:bg-gray-200 lg:bg-transparent lg:text-black")
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
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-200 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500"
              >
                Contact
              </Link>
            </li>

            {windowWidth <= 1024 && (
              <li>
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="/developer"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-200 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500"
                >
                  Developers
                </Link>
              </li>
            )}
            {/* 
            <li>
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/club"
                className="block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-200 lg:bg-transparent lg:p-0 lg:text-primary-500 lg:hover:bg-transparent lg:hover:text-blue-500"
              >
                Club
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
