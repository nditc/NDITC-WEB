import Link from "next/link";
import GoToTop from "./GoToTop";

import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import NewNotification from "./NewNotification";
import { FaCode } from "react-icons/fa6";
import DeveloperIcon from "./DeveloperIcon";

const SideBar = () => {
  return (
    <div className="fixed right-0 top-[50%] z-50 translate-y-[-50%]">
      <div className="mr-2 flex w-8 flex-col items-center justify-evenly gap-3">
        <NewNotification />

        <div className="flex h-fit flex-col items-center justify-evenly gap-2 rounded-full bg-white p-1 shadow-[5px_5px_20px_15px_#00000024] transition-all">
          <a
            href="https://www.facebook.com/nditc.official"
            target="_blank"
            className="mb-2 transition-all hover:scale-125"
          >
            <BsFacebook className="h-6 w-6" />
          </a>

          <a
            href="https://www.facebook.com/nditc.official"
            target="_blank"
            className="mb-2 transition-all hover:scale-125"
          >
            <RiInstagramFill className="h-7 w-7" />
          </a>

          <a
            href="https://www.youtube.com/@nditcofficial"
            className="transition-all hover:scale-125"
            target="_blank"
          >
            <AiFillYoutube className="h-7 w-7" />
          </a>

          <a
            href="https://github.com/nditc"
            className="transition-all hover:scale-125"
            target="_blank"
          >
            <FaGithub className="h-7 w-7" />
          </a>
          <DeveloperIcon />
        </div>

        <GoToTop />
      </div>
    </div>
  );
};

export default SideBar;
