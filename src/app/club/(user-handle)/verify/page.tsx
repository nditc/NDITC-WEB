"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";

import {
  deleteUser,
  reauthenticateWithPopup,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { toast } from "react-toastify";
import { CgArrowLeft, CgArrowRight, CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, DocumentReference, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success("Verfication Email Sent! Verify and Login.");
      } catch (err) {
        console.error(err);
        toast.error("Aww! Snap!");
      }
    } else {
      toast.error("User not signed in!");
    }
    setLoading(false);
  };
  const deleteAccount = async (event: any) => {
    event.preventDefault();
    setLoading2(true);
    try {
      if (user) {
        await deleteUser(user);
        toast.info(`Please register again.`);
        Router.push("/club/register");
      }
    } catch (err: any) {
      console.error(err);
      if (err?.code === "auth/requires-recent-login") {
        toast.error(`Login expired. Please register/login again.`);
        auth.signOut();
        Router.push("/club/register");
      } else {
        setLoading2(false);
        toast.error("Aww! Snap!");
      }
    }
  };
  useEffect(() => {
    if (user && user.emailVerified) {
      Router.push("/club/profile");
    } else if (!user && !loading2) {
      Router.push("/club/login");
    }
    const x = setInterval(() => {
      auth.currentUser?.reload();
    }, 3000);

    return () => {
      clearInterval(x);
    };
  }, [user, Router, loading2]);
  return (
    <div className="bg-image mt-[81px] grid w-screen place-items-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 md:min-h-[70vh]">
        <div className="order-2 flex w-full grid-cols-1 flex-col justify-center gap-5 p-5 sm:p-12 lg:w-1/2">
          <h1 className="text-4xl">
            ACCOUNT <span className="text-primary">VERIFICATION</span>
          </h1>
          <p className="text-base">
            Please verify your account. An email has been sent to {user?.email}.
            Don&apos;t forget to check you spam.
          </p>
          <div className="flex w-full flex-col gap-5">
            <div className="h-full w-full">
              <button
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="block w-full rounded-xl bg-primary px-8 py-2 text-center text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                onClick={() => window.location.replace("/profile")}
              >
                I&apos;m Verified!
              </button>
            </div>
            <div className="h-full w-full">
              <button
                type="button"
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                  "Re-send Verification Link"
                )}
              </button>
            </div>
            <div className="h-full w-full">
              <button
                type="button"
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                onClick={deleteAccount}
              >
                {loading2 ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                  "Incorrect Address? Register Again"
                )}
              </button>
            </div>
          </div>
        </div>
        <Image
          alt="login"
          className={
            "order-1 m-5 hidden w-1/2 rounded-xl object-cover lg:block"
          }
          src="/Images/reg_banner.png"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;