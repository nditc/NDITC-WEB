/* eslint-disable @next/next/no-img-element */
"use client";

import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import EditData from "@/app/club/Components/Profile/EditData";
import Announcements from "@/app/club/Components/Profile/Announcements";
import ClubInfo from "@/app/club/Components/Profile/ClubInfo";
import { useUserDataContext } from "@/app/club/Components/Layout/UserDataProvider";
import { MdLockReset } from "react-icons/md";

const Page = () => {
  const [userAuth, loading, error] = useAuthState(auth);

  const [uData, setUserData] = useState<any | undefined | null>();

  const { userData, userDataLoading, dataError } = useUserDataContext();

  // const [dLoading, setDLoading] = useState(true);

  const Route = useRouter();

  useEffect(() => {
    if (userData) {
      setUserData({ ...userData });
    }
  }, [userData]);

  return (
    <>
      <EditData userData={uData} setUserData={setUserData} />

      <h1 className="container my-5 -ml-4 mt-12 text-4xl">
        SPECIAL <span className="text-primary">ACTIONS</span>
      </h1>
      <div className="container flex gap-2">
        <Link
          href="/club/reset-password"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm leading-[1.15] text-primary_dark shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
        >
          <MdLockReset className="h-8 w-8" />
          Reset Password
        </Link>
        <Link
          href="/club/delete-account"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm leading-[1.15] text-red-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-300"
        >
          <FaRegTrashAlt className="h-6 w-6" /> Delete Account
        </Link>
      </div>
    </>
  );
};

export default Page;
