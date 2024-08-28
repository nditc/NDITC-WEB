/* eslint-disable @next/next/no-img-element */
"use client";

import { auth, db } from "@/config/firebase";
import { classes, regDataType } from "@/config/registerData";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { MdLockReset } from "react-icons/md";
import { FaRegEdit, FaRegTrashAlt, FaTimes } from "react-icons/fa";

import Link from "next/link";

import { useAuthState } from "react-firebase-hooks/auth";
import EditData from "@/Components/Profile/EditData";
import ProfilePic from "@/Components/Profile/ProfilePic";
import { IoIosPower } from "react-icons/io";
import Announcements from "@/Components/Profile/Announcements";
import { CgSpinner } from "react-icons/cg";
import ContestCard from "@/Components/Profile/ContestCard";
import ClubInfo from "@/Components/Profile/ClubInfo";
import { useUserDataContext } from "@/Components/Layout/UserDataProvider";

const Page = () => {
  const [userAuth, loading, error] = useAuthState(auth);

  const [uData, setUserData] = useState<any | undefined | null>();

  const { userData, userDataLoading, dataError } = useUserDataContext();

  const [dLoading, setDLoading] = useState(true);

  const Route = useRouter();

  useEffect(() => {
    auth.currentUser?.reload();

    if (userAuth) {
      fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ id: userAuth.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if (resp.auth) {
            Route.push("/admin");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }

    if (userAuth && userAuth?.emailVerified) {
      setUserData(userData);

      if (dataError) {
        setDLoading(false);
        toast.error("Something went wrong");
      }
    } else if (userAuth && !userAuth?.emailVerified) {
      setDLoading(false);
      Route.push("/verify");
    } else if (!loading) {
      setDLoading(false);
      Route.push("/login");
    }
  }, [Route, userAuth, loading]);

  const logOut = () => {
    setDLoading(true);

    auth.signOut();
  };

  return (
    <>
      {userData ? (
        <div className="grid min-h-[100vh] bg-[#F6F6F6] py-28 md:py-36">
          <div className="">
            <div className="container mb-4 flex flex-col items-stretch justify-center gap-4 xl:flex-row xl:justify-between">
              <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:flex-row md:text-left xl:justify-start">
                <ProfilePic
                  imageUrl={userData.imageUrl}
                  setImage={(url: string) => {
                    setUserData((s: regDataType) => ({ ...s, imageUrl: url }));
                  }}
                />
                <div className="">
                  <p className="mb-1 text-lg">Welcome Back!</p>
                  <h1 className="break-all text-4xl text-primary md:text-5xl">
                    {userData.name}
                  </h1>
                  <h2 className="Nunito break-all text-xl md:text-2xl">
                    {userData.email}
                  </h2>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={logOut}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm leading-[1.15] text-primary_dark shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
                    >
                      <IoIosPower className="h-8 w-8" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <ContestCard />
            </div>
            <Announcements />
            <EditData userData={uData} setUserData={setUserData} />
            <ClubInfo
              ndc_id={userData.ndc_id}
              email={auth.currentUser?.email || ""}
              uid={auth.currentUser?.uid || ""}
            />
            <h1 className="container my-5 mt-8 text-4xl">
              SPECIAL <span className="text-primary">ACTIONS</span>
            </h1>
            <div className="container flex gap-2">
              <Link
                href="/reset-password"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm leading-[1.15] text-primary_dark shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
              >
                <MdLockReset className="h-8 w-8" />
                Reset Password
              </Link>
              <Link
                href="/delete-account"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm leading-[1.15] text-red-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-300"
              >
                <FaRegTrashAlt className="h-6 w-6" /> Delete Account
              </Link>
            </div>
          </div>
        </div>
      ) : loading || dLoading ? (
        <div className="grid h-screen w-full place-items-center">
          <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid h-screen w-full place-items-center"></div>
      )}
    </>
  );
};

export default Page;
