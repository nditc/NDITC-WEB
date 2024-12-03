"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db, pfp } from "@/config/firebase";

import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";
import { CgArrowLeft, CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, DocumentReference, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteObject, ref } from "firebase/storage";
import ActualUser from "@/util/ActualUser";

const deleteEventParticipantDoc = async (uid: string) => {
  const res = await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify({ uid: uid }),
  });

  if (!res.ok) {
    toast.error("Error Occurred");
    return [];
  }

  return res.json();
};

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (user && user.email) {
      signInWithEmailAndPassword(auth, user.email, password)
        .then(async (UserCred) => {
          const UserInfo = UserCred.user;
          await deleteUser(UserInfo);
          await deleteDoc(doc(db, "participants", UserInfo.uid));
          await deleteObject(ref(pfp, "pfp/" + UserInfo.uid));
          await deleteEventParticipantDoc(UserInfo.uid);
          toast.success(`User Deleted!`);
          setLoading(false);
          Router.push("/club");
        })
        .catch((error) => {
          console.dir(error);
          switch (error.code) {
            case "auth/invalid-credential":
              toast.error(`Invalid password.`);
              break;
            case "storage/object-not-found":
              break;
            default:
              console.error(error.message);
              toast.error(error.message.replaceAll("Firebase: ", ""));
              break;
          }
          setLoading(false);
        });
    } else {
      toast.error(`User not logged in.`);
      setLoading(false);
    }
  };

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
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
            ACCOUNT <span className="text-primary">DELETION</span>
          </h1>
          <p className="text-base">
            If your delete your account then you have to register again.
          </p>
          <div className="flex w-full flex-col gap-5">
            <Field
              state={password}
              setValue={(name, data) => setPassword(String(data))}
              name="Password"
              label="Password"
              type="password"
            />{" "}
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
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </form>
        <img
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
