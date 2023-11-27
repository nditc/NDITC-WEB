import Link from "next/link";

import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="fixed right-0 z-50 top-[50%] translate-y-[-50%]">
      <div className="w-8 mr-2 flex flex-col items-center gap-3 justify-evenly">
        <div className="rounded-full bg-white shadow-[5px_5px_20px_15px_#00000024] p-1">
          <Link href="/notifications" className="mix-blend-difference mt-2">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white hover:scale-125 transition-all"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 19 20"
            >
              <path d="M18.012 13.453c-.219-1.173-2.163-1.416-2.6-3.76l-.041-.217c0 .006 0-.005-.007-.038v.021l-.017-.09-.005-.025v-.006l-.265-1.418a5.406 5.406 0 0 0-5.051-4.408.973.973 0 0 0 0-.108L9.6 1.082a1 1 0 0 0-1.967.367l.434 2.325a.863.863 0 0 0 .039.1A5.409 5.409 0 0 0 4.992 9.81l.266 1.418c0-.012 0 0 .007.037v-.007l.006.032.009.046v-.01l.007.038.04.215c.439 2.345-1.286 3.275-1.067 4.447.11.586.22 1.173.749 1.074l12.7-2.377c.523-.098.413-.684.303-1.27ZM1.917 9.191h-.074a1 1 0 0 1-.924-1.07 9.446 9.446 0 0 1 2.426-5.648 1 1 0 1 1 1.482 1.343 7.466 7.466 0 0 0-1.914 4.449 1 1 0 0 1-.996.926Zm5.339 8.545A3.438 3.438 0 0 0 10 19.1a3.478 3.478 0 0 0 3.334-2.5l-6.078 1.136Z" />
            </svg>
          </Link>
        </div>

        <div className="h-fit rounded-full p-1 flex flex-col bg-white items-center gap-2 justify-evenly shadow-[5px_5px_20px_15px_#00000024]">
          <a
            href="https://www.facebook.com/nditc.official"
            target="_blank"
            className="mb-2 hover:scale-125 transition-all"
          >
            <BsFacebook className="bg-white w-6 h-6" />
          </a>

          <a
            href="https://www.facebook.com/nditc.official"
            target="_blank"
            className="mb-2 hover:scale-125 transition-all"
          >
            <RiInstagramFill className="m bg-white w-7 h-7" />
          </a>

          <a
            href="https://www.youtube.com/@nditcofficial"
            className="hover:scale-125 transition-all"
            target="_blank"
          >
            <AiFillYoutube className="bg-white w-7 h-7" />
          </a>

          <a href="" className="hover:scale-125 transition-all" target="_blank">
            <FaGithub className="bg-white w-7 h-7" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
