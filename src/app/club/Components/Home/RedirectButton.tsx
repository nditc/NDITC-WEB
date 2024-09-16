"use client";

import Link from "next/link";
import { useUserDataContext } from "../Layout/UserDataProvider";

const RedirectButton = () => {
  const { userData, userDataLoading, dataError } = useUserDataContext();
  return (
    <div className="flex">
      {userData && !userDataLoading ? (
        <Link
          href="/club/profile"
          className="before:ease text-whiterounded-lg Bebas relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-primary bg-primary px-7 py-2 font-Bebas text-base font-medium text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-secondary_light before:duration-300 hover:border-secondary_light hover:bg-zinc-300 hover:text-primary_dark hover:shadow-secondary_light hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-primary md:text-xl"
        >
          <span className="relative z-10">My Profile</span>
        </Link>
      ) : (
        <>
          <Link
            href="/club/login"
            className="before:ease Bebas hover:border-bg-zinc-700 hover:shadow-bg-zinc-700 relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-300 bg-zinc-300 px-7 py-2 font-Bebas text-base font-medium text-black shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-zinc-700 before:duration-300 hover:border-zinc-700 hover:bg-zinc-700 hover:text-white hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-zinc-400 md:text-xl"
          >
            <span className="relative z-10">Login</span>
          </Link>
          <Link
            href="/club/register"
            className="before:ease text-whiterounded-lg Bebas relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-primary bg-primary px-7 py-2 font-Bebas text-base font-medium text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-secondary_light before:duration-300 hover:border-secondary_light hover:bg-zinc-300 hover:text-primary_dark hover:shadow-secondary_light hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-primary md:text-xl"
          >
            <span className="relative z-10">Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default RedirectButton;
