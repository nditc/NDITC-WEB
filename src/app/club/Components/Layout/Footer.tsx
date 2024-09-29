import Image from "next/image";
import Link from "next/link";
import CurrentYear from "../CurrentYear";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="max-w-screen relative overflow-x-hidden bg-[#1F1F1F] text-base">
      <CurrentYear />
      <div className="mx-auto flex w-full max-w-screen-xl flex-col justify-evenly gap-10 p-4 py-6 pb-12 md:flex-row md:pb-8 lg:py-8">
        <div className="order-3 flex justify-between gap-3 md:order-1 md:gap-24">
          <div className="order-2 flex flex-col items-center md:hidden">
            <div className="text-center font-ShareTechTown font-semibold text-white hover:underline">
              A CLUB OF
            </div>
            <a href="https://ndc.edu.bd" target="_blank">
              <img
                src="/Images/NDC.png"
                alt="Logo"
                width={128}
                height={128}
                className="scale-75 md:scale-100"
              />
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/#faq"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              FAQ
            </Link>

            <Link
              href="/#about"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              About
            </Link>
            <Link
              href="/#rules"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Rules
            </Link>
            <Link
              href="/#setter"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Setter
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="https://nditc.net/#Contact"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Contact
            </Link>
            <Link
              href="https://nditc.net/executive"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Executives
            </Link>
            {/* <Link
              href="/developer"
              className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
            >
              Developers
            </Link> */}
            <a
              href="https://nditc.net/details/U2FsdGVkX1%2BAo1HnTjk4aPrXkCt9rh1%2BNX%2FDWCpvsejwdtAoSjewOeYdKkZbh6aGaCzc66CV12V3COPzTfJdiRVwQsKY9T7hTEK5uHR6K4odMR4G%2FHndw%2BsLnz%2FamA1HVEDOV9n%2FeVAQ7U3yvYJftX0vc455XIZ3msRakGeLRfcnSfCudDzNtNO2z%2BBV3BJ3Q%2FAiKPNaCas8xNySX8iKn2q6N6OfEw4tQeh7SlogJS4%3D/project/1687651200"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              App
            </a>
            <Link
              href="/developer"
              className="cursor-pointer font-medium text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Developers
            </Link>
          </div>
        </div>
        <div className="order-2 hidden flex-col items-center gap-3 md:flex">
          <div className="text-center font-ShareTechTown font-semibold text-white hover:underline">
            A CLUB OF
          </div>
          <a href="https://ndc.edu.bd" target="_blank">
            <img
              src="/Images/NDC.png"
              alt="Logo"
              width={128}
              height={128}
              className="scale-75 md:scale-100"
            />
          </a>
        </div>
        <div className="order-1 flex flex-col items-start gap-3 md:order-3">
          <div className="cursor-pointer font-ShareTechTown text-xl font-semibold text-white hover:underline">
            CONTACT US
          </div>
          <div className="flex items-center gap-1 font-medium text-zinc-500 hover:underline dark:text-zinc-400">
            <svg
              className="mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4a4 4 0 0 1 4 4v6M5 4a4 4 0 0 0-4 4v6h8M5 4h9M9 14h10V8a3.999 3.999 0 0 0-2.066-3.5M9 14v5m0-5h4v5m-9-8h2m8-4V1h2"
              />
            </svg>

            <p>nditc.official@gmail.com</p>
          </div>
          <div className="flex items-center gap-1 font-medium text-zinc-500 hover:underline dark:text-zinc-400">
            <FaFacebook className="mr-2 h-5 w-5 text-white" />

            <a href="https://www.facebook.com/nditc.official">
              https://www.facebook.com/nditc.official
            </a>
          </div>

          <div className="flex items-center gap-1 font-medium text-zinc-500 hover:underline dark:text-zinc-400">
            <svg
              className="mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 21"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
              </g>
            </svg>
            <p>Toyenbee Circular Rd, Dhaka 1000</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
