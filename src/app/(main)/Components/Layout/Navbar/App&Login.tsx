import React from "react";
import { Avatar } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useUserData } from "@/app/_context/UserDataProvider";
import { LuLogIn } from "react-icons/lu";
import Link from "next/link";

const AppnLogin = () => {
  const userAuth = useAuthState(auth);

  const { userData } = useUserData();
  return (
    <div className="z-50 mr-2 flex flex-1 items-center justify-end space-x-3 lg:order-2 lg:mr-0 lg:flex-none lg:grow-0 lg:basis-0 lg:space-x-0 rtl:space-x-reverse">
      <Link
        href="/details/61ca02bf8daf0e6c4ef079990a0232c3ed79d9d23739a7131ca100dc841d538b7a7198def108d9490751f50ddee87b83eb9d48481de53630f8587d86f5d069765b950e0ac33a533a8a01acb2c811678f1319baade6c623e241987053835600f74466d9c1945caf46435209af9cdd5589c954b4a275113eae0203d7b9137965ae9de9f97b38675880101087c25bf3adc6512956df3c9e1726bebf3a39ee601cac/project/1687651200"
        className="before:ease relative mr-1 flex shrink-0 overflow-hidden rounded-lg border border-black bg-[#252525] px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-white shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:bg-zinc-700 hover:text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:flex lg:mr-3 lg:px-4"
      >
        <img
          width={20}
          height={20}
          className="mr-1 inline invert"
          src="/image/icon/d_app.png"
          alt=""
        />
        <span className="relative z-10"> APP</span>
      </Link>

      {/* {userAuth && userData ? (
        <Link
          href="/club/profile"
          type="button"
          className="before:ease relative flex shrink-0 items-center overflow-hidden rounded-lg px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-black transition before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:transition-all before:duration-300 hover:opacity-80 hover:before:-rotate-180 focus:outline-none focus:ring-4 active:scale-105 lg:px-2 xl:px-4"
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
          className="before:ease relative flex shrink-0 items-center overflow-hidden rounded-lg border bg-zinc-400 px-4 py-2 text-center font-ShareTechTown text-sm font-medium text-black before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-zinc-300 before:transition-all before:duration-300 hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-zinc-400 lg:px-2 xl:px-4"
        >
          <LuLogIn className="z-10 h-5 w-5 shrink-0 basis-5 xsm:mr-1 xsm:h-4 xsm:w-4" />
          <span className="relative z-10 mr-1 hidden xsm:inline">LOGIN</span>
        </Link>
      )} */}
    </div>
  );
};

export default AppnLogin;
