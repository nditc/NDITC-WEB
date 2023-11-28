import Link from "next/link";

import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

const SideBar = () => {
  return (
    <div className="fixed right-0 z-50 top-[50%] translate-y-[-50%]">
      <div className="w-8 mr-2 flex flex-col items-center gap-3 justify-evenly">
        <div className="rounded-full bg-white shadow-[5px_5px_20px_15px_#00000024] p-1">
          <Link href="/notifications" className="text-black mt-2">
            <IoIosNotifications className="w-7 h-7 hover:scale-125 transition-all" />
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
