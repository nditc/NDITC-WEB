"use client";

import { createCipheriv, createDecipheriv } from "crypto";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { Suspense } from "react";
import { LuLogIn } from "react-icons/lu";
import { auth } from "@/config/firebase";
import { FiUser } from "react-icons/fi";
import { useConfig } from "@/config/config_db";
import { useAuthContext } from "./AuthContextProvider";
import { useUserDataContext } from "./UserDataProvider";
import { ImDownload } from "react-icons/im";
import { Avatar } from "@nextui-org/react";

const ClubNavbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const Route = usePathname();
  const Params = useSearchParams();
  const navRef = useRef<HTMLElement>(null);
  const [config] = useConfig([]);
  const [windowWidth, setWindowWidth] = useState(800);
  const userAuth = useAuthContext().userAuth;

  const encryption_key = "kjfofvdhjHjgrmgherTtyLJfVbshJbvQ"; // Must be 32 characters
  const initialization_vector = "X05IGQ5qdBnIqAWD"; // Must be 16 characters

  const { userData, userDataLoading, dataError } = useUserDataContext();

  function encrypt(text: any) {
    const cipher = createCipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector),
    );
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  const [hydrated, setHydrated] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setHydrated(true);

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

    const install = (e: any) => {
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", install);

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
    return () => {
      window.removeEventListener("hashchange", stateHandler);
      window.removeEventListener("resize", listener);
      window.removeEventListener("beforeinstallprompt", install);
    };
  }, [Route, Params]);

  if (!hydrated) {
    return null;
  }

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
          <Image
            src="/Logo.png"
            className="h-12 max-w-[7.5rem] object-contain xsm:max-w-36"
            alt="NDITC Logo"
            width={512}
            height={512}
          />
        </Link>
        <div
          suppressHydrationWarning
          className="z-50 flex space-x-3 lg:order-2 lg:gap-1 lg:space-x-0 rtl:space-x-reverse"
        >
          {userAuth ? (
            <Link
              href="/club/profile"
              type="button"
              className="before:ease Inter relative flex items-center overflow-hidden rounded-lg px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-black transition before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:transition-all before:duration-300 hover:opacity-80 hover:before:-rotate-180 focus:outline-none focus:ring-4 active:scale-105 lg:px-2 xl:px-4"
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
              className="before:ease Inter relative flex items-center overflow-hidden rounded-lg border bg-zinc-400 px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-black before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-zinc-300 before:transition-all before:duration-300 hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-zinc-400 lg:px-2 xl:px-4"
            >
              <LuLogIn className="z-10 h-5 w-5 xsm:mr-2 xsm:h-4 xsm:w-4" />
              <span className="relative z-10 hidden xsm:inline">LOGIN</span>
            </Link>
          )}
          {windowWidth >= 1024 && (
            <button
              onClick={async () => {
                setShowOptions(false);

                if (deferredPrompt !== null) {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  if (outcome === "accepted") {
                    setDeferredPrompt(null);
                  }
                }
              }}
              type="button"
              className="before:ease Inter relative flex items-center overflow-hidden rounded-lg border bg-primary_dark px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-white before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary before:transition-all before:duration-300 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-secondary lg:px-2 xl:px-4"
            >
              <ImDownload className="z-10 h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => setShowOptions(!showOptions)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
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
          <ul className="Inter container mt-4 flex flex-col items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium lg:mt-0 lg:flex-row lg:gap-0 lg:space-x-5 lg:border-0 lg:bg-white lg:p-0 xl:space-x-8 rtl:space-x-reverse">
            <li className="w-full text-center lg:w-auto">
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/club/"
                className={
                  "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-secondary" +
                  " " +
                  (Route === "/"
                    ? "bg-primary text-white hover:bg-primary_dark lg:bg-transparent lg:text-secondary"
                    : "hover:bg-gray-200 lg:bg-transparent lg:text-black")
                }
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="w-full text-center lg:w-auto">
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/club/#about"
                className={
                  "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-secondary" +
                  " " +
                  (Route === "/asasasasasassdafawreq"
                    ? "bg-primary text-white hover:bg-primary_dark lg:bg-transparent lg:text-secondary"
                    : "hover:bg-gray-200 lg:bg-transparent lg:text-black")
                }
              >
                About
              </Link>
            </li>

            <li className="w-full text-center lg:w-auto">
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/club/#faq"
                className={
                  "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-secondary" +
                  " " +
                  (Route === "/asasasasasassdafawreq"
                    ? "bg-primary text-white hover:bg-primary_dark lg:bg-transparent lg:text-secondary"
                    : "hover:bg-gray-200 lg:bg-transparent lg:text-black")
                }
              >
                FAQ
              </Link>
            </li>
            {/* <li>
                <Hover
                  setShowOption={() => setShowOptions(false)}
                  text="Activities"
                  showOptions={showOptions}
                  windowWidth={windowWidth}
                />
              </li> */}

            <li className="w-full text-center lg:w-auto">
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href="/"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-200 lg:p-0 lg:hover:bg-transparent lg:hover:text-secondary"
              >
                Main
              </Link>
            </li>

            {/*<li className="w-full text-center lg:w-auto">
              <Link
                onClick={() => {
                  setShowOptions(false);
                }}
                href={
                  userAuth
                    ? `/club/events/${encrypt(userAuth.uid)}/${encrypt(userData?.ndc_id == "" || userData?.ndc_id == undefined ? "none" : userData?.ndc_id)}`
                    : "/club/events"
                }
                className={
                  "block rounded-lg border-2 border-primary px-3 py-2 text-primary lg:rounded-none lg:border-0 lg:border-b-2 lg:border-secondary lg:p-0 lg:hover:bg-transparent lg:hover:text-secondary" +
                  " " +
                  (Route === "/club/events"
                    ? "bg-primary text-white hover:bg-primary_dark lg:bg-transparent lg:text-secondary"
                    : "hover:bg-primary hover:text-white lg:bg-transparent lg:text-primary")
                }
              >
                Events
              </Link>
            </li>*/}

            <li className="w-full text-center lg:hidden lg:w-auto">
              <button
                onClick={async () => {
                  setShowOptions(false);

                  if (deferredPrompt !== null) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    if (outcome === "accepted") {
                      setDeferredPrompt(null);
                    }
                  }
                }}
                className={
                  "flex w-full items-center justify-center gap-3 rounded-lg border-2 border-primary bg-primary px-3 py-2 text-white hover:bg-primary_dark lg:rounded-none lg:border-0 lg:border-b-2 lg:border-secondary lg:bg-transparent lg:p-0 lg:text-secondary lg:hover:bg-transparent lg:hover:text-secondary"
                }
              >
                Download APP
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ClubNavbar;
