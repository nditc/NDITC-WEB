import Image from "next/image";
import Link from "next/link";
import CurrentYear from "./CurrentYear";

const Footer = () => {
  return (
    <footer className="bg-[#1F1F1F] text-xs md:text-base relative">
      <CurrentYear />
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 flex justify-evenly gap-3">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/activities?type=event"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            Activities
          </Link>
          <Link
            href="/about"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            About
          </Link>
          <Link
            href="/policy"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            Policy
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/activities?type=publication"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            Publication
          </Link>
          <Link
            href="/executive"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            Executives
          </Link>
          <Link
            href="/developer"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            Developers
          </Link>
          <a
            href="/details/U2FsdGVkX1%2BAo1HnTjk4aPrXkCt9rh1%2BNX%2FDWCpvsejwdtAoSjewOeYdKkZbh6aGaCzc66CV12V3COPzTfJdiRVwQsKY9T7hTEK5uHR6K4odMR4G%2FHndw%2BsLnz%2FamA1HVEDOV9n%2FeVAQ7U3yvYJftX0vc455XIZ3msRakGeLRfcnSfCudDzNtNO2z%2BBV3BJ3Q%2FAiKPNaCas8xNySX8iKn2q6N6OfEw4tQeh7SlogJS4%3D/project/1687651200"
            className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline cursor-pointer"
          >
            App
          </a>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="text-white font-semibold font-ShareTechTown hover:underline text-center">
            A CLUB OF
          </div>
          <a href="https://ndc.edu.bd" target="_blank">
            <Image
              src="/NDC.png"
              alt="Logo"
              width={128}
              height={128}
              className="scale-75 md:scale-100"
            />
          </a>
        </div>

        <div className="flex flex-col gap-3 items-start">
          <div className="text-white font-semibold font-ShareTechTown hover:underline cursor-pointer">
            CONTACT US
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline flex gap-1 items-center">
            <svg
              className="w-5 h-5 text-zinc-800 dark:text-white"
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
          <div className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline flex gap-1 items-center">
            <svg
              className="w-5 h-5 text-zinc-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"
              />
            </svg>
            <p>+88 01793471625</p>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 font-medium hover:underline flex gap-1 items-center">
            <svg
              className="w-5 h-5 text-zinc-800 dark:text-white"
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
