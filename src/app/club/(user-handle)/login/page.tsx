"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";
import { CgLogIn, CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FirebaseError } from "firebase/app";
import { useAuthContext } from "@/app/club/Components/Layout/AuthContextProvider";

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const userAuth = useAuthContext().userAuth;
  const uloading = useAuthContext().loading;

  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (UserCred) => {
        toast.success("User logged in!");
        setLoading(false);
        Router.push("/club/profile");
      })
      .catch((error: FirebaseError) => {
        console.dir(error);
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error(`Invalid email or password.`);
            break;
          case "auth/too-many-requests":
            toast.error(
              `Too many login attempts. Please reset your password to login again.`,
            );
            break;
          default:
            console.error(error.message);
            toast.error(error.message.replaceAll("Firebase: ", ""));
            break;
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log(auth);
    setAuthLoading(true);
    if (userAuth) {
      Router.push("/club/profile");
    }
    setAuthLoading(false);
  }, [Router, userAuth]);
  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full bg-white pb-8 pt-3 sm:my-16 sm:rounded-2xl sm:py-0 md:min-h-[70vh]">
        <form
          className="flex w-full grid-cols-1 flex-col justify-center gap-5 p-5 sm:p-12 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          {uloading || authLoading ? (
            <div className="grid w-full place-items-center">
              <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <CgLogIn className="h-12 w-12 text-primary" />
              <h1 className="text-4xl">
                PARTICIPANT <span className="text-primary">Login</span>
              </h1>
              <div className="flex w-full flex-col gap-5">
                <Field
                  state={email}
                  setValue={(name, data) => setEmail(String(data))}
                  name="email"
                  label="E-mail"
                  type="email"
                />
                <Field
                  state={password}
                  setValue={(name, data) => setPassword(String(data))}
                  name="Password"
                  label="Password"
                  type="password"
                />{" "}
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <Link
                  className="ml-2 border-b-2 border-transparent font-medium text-primary hover:border-primary"
                  href="/club/reset-password"
                >
                  Reset Password
                </Link>
              </div>
              <div className="flex w-full flex-col items-center gap-3 justify-self-end md:w-auto">
                <button
                  style={{
                    pointerEvents: loading ? "none" : "auto",
                  }}
                  className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-primary_dark hover:text-white"
                  type="submit"
                >
                  {loading ? (
                    <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="text-lg font-medium">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="mr-2 border-b-2 border-transparent text-primary hover:border-primary"
                    href="/club/register"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </>
          )}
        </form>
        <Image
          alt="login"
          className={"m-5 hidden w-1/2 rounded-xl object-cover lg:block"}
          src="/image/club/login.svg"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;
