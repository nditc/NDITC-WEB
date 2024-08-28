"use client";

import Field from "@/Components/Field";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";
import { CgLogIn, CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FirebaseError } from "firebase/app";
import { useAuthContext } from "@/Components/Layout/AuthContextProvider";

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
        Router.push("/profile");
      })
      .catch((error: FirebaseError) => {
        console.dir(error);
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error(`Invalid email or password.`);
            break;
          case "auth/too-many-requests":
            toast.error(
              `Too many login attempts. Please reset your password to login again.`
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
      Router.push("/profile");
    }
    setAuthLoading(false);
  }, [Router, userAuth]);
  return (
    <div className="w-screen shadow-lg  shadow-secondary mt-[81px] bg-image md:min-h-[calc(100vh_-_81px)] grid place-items-center">
      <div className="container-login w-full bg-white sm:rounded-xl flex pt-3 pb-8 sm:py-0 sm:my-16 min-h-[calc(100vh_-_81px)] md:min-h-[70vh]">
        <form
          className="flex flex-col grid-cols-1 gap-5 w-full lg:w-1/2 p-5 sm:p-12 justify-center"
          onSubmit={handleSubmit}
        >
          {uloading || authLoading ? (
            <div className="grid place-items-center w-full ">
              <CgSpinner className="mx-auto w-16 h-16 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <CgLogIn className="w-12 h-12 text-primary" />
              <h1 className="text-4xl">
                PARTICIPANT <span className="text-primary">Login</span>
              </h1>
              <div className="flex flex-col gap-5 w-full">
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
                  className="text-primary font-medium border-b-2 border-transparent hover:border-primary ml-2"
                  href="/reset-password"
                >
                  Reset Password
                </Link>
              </div>
              <div className="justify-self-end w-full md:w-auto flex flex-col items-center gap-3">
                <button
                  style={{
                    pointerEvents: loading ? "none" : "auto",
                  }}
                  className="bg-primary rounded-xl text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                  type="submit"
                >
                  {loading ? (
                    <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="font-medium text-lg">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="text-primary border-b-2 border-transparent hover:border-primary mr-2"
                    href="/register"
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
          className={"hidden lg:block w-1/2 rounded-xl object-cover m-5"}
          src="/Images/reg_banner.png"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;
