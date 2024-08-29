"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";

import {
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { toast } from "react-toastify";
import { CgArrowLeft, CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, DocumentReference, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        auth.signOut();
        toast.success(
          "Reset password link sent to you email. Reset Password then login again.",
        );
        Router.push("/club/login");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(`Email address already in use.`);
            break;
          case "auth/invalid-email":
            toast.error(`Email address is invalid.`);
            break;
          case "auth/operation-not-allowed":
            toast.error(`Error during sign up.`);
            break;
          default:
            toast.error(error.message.replaceAll("Firebase: ", ""));

            break;
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);
  return (
    <div className="bg-image mt-[81px] grid w-screen place-items-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 md:min-h-[70vh]">
        <form
          className="flex w-full grid-cols-1 flex-col justify-center gap-5 p-5 sm:p-12 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between text-sm md:text-base">
            <button
              type="button"
              className="ml-2 flex items-center gap-2 border-b-2 border-transparent font-medium text-primary hover:border-primary"
              onClick={() => Router.back()}
            >
              <CgArrowLeft /> Go Back
            </button>
          </div>
          <h1 className="text-4xl">
            PASSWORD <span className="text-primary">RESET</span>
          </h1>
          <p className="text-base">
            Get password reset link to reset your password. Then login again.
          </p>
          <div className="flex w-full flex-col gap-5">
            <Field
              state={email}
              setValue={(name, data) => setEmail(String(data))}
              name="email"
              label="E-mail"
              type="email"
            />
            <div className="w-full justify-self-end md:w-auto">
              <button
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {loading ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                  "Send Password Reset Link"
                )}
              </button>
            </div>
          </div>
        </form>
        <Image
          alt="login"
          className={"m-5 hidden w-1/2 rounded-xl object-cover lg:block"}
          src="/Images/reg_banner.png"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;
