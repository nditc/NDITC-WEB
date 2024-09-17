import React from "react";
import { useUserDataContext } from "../Layout/UserDataProvider";
import ProfilePic from "./ProfilePic";
import { IoIosPower } from "react-icons/io";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";

const ProfileHero = () => {
  const { userData } = useUserDataContext() || { userData: null };
  const Router = useRouter();
  const logOut = () => {
    auth.signOut();
    Router.push("/club/login");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:flex-row md:text-left xl:justify-start">
      <ProfilePic
        imageUrl={
          userData?.imageUrl ||
          "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86?x=0.8702374885945297"
        }
      />
      <div className="">
        <p className="mb-1 text-lg">Welcome Back!</p>
        <h1 className="break-all text-4xl text-primary md:text-5xl">
          {userData?.name || (
            <div className="my-2 h-12 w-36 animate-pulse rounded-lg bg-zinc-300"></div>
          )}
        </h1>
        <h2 className="Inter break-all text-lg md:text-xl">
          {userData?.email || (
            <div className="my-2 h-8 w-48 animate-pulse rounded-lg bg-zinc-300"></div>
          )}
        </h2>
        <div className="mt-4 flex gap-2">
          <button
            onClick={logOut}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-semibold leading-[1.15] text-primary shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
          >
            <IoIosPower className="h-8 w-8" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
