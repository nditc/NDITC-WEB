"use client";

import React, { useEffect, useState } from "react";
import { regDataInit, regDataType } from "@/config/registerData";
import { auth, db } from "@/config/firebase";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getConfig } from "@/config/config_db";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
import Image from "next/image";
import { CiWarning } from "react-icons/ci";
import NonMemberRegistration from "@/app/(main)/Components/Register/NonMemberRegistration";
import MemberRegistration from "@/app/(main)/Components/Register/MemberRegistration";

const Page = () => {
  const { userAuth, loading: authLoading } = useAuthContext();
  const router = useRouter();

  const [isNDCStudent, setIsNDCStudent] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    const q = query(collection(db, "participants"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleFinalRegistration = async (userData: any) => {
    setFormLoading(true);

    try {
      const emailExists = await checkEmailExists(userData.email);
      if (emailExists) {
        toast.error("Email address is already in use");
        setFormLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      delete userData.password;
      const finalUserData = {
        ...userData,
        timestamp: serverTimestamp(),
        pass_set: true,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86"
      };

      await setDoc(doc(db, "participants", userCredential.user.uid), finalUserData);
      await sendEmailVerification(userCredential.user);

      toast.success("Registration successful! Please check your email for verification.");
      router.push("/club/verify");
    } catch (error: any) {
      console.error("Registration error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email address is already in use");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 8 characters");
          break;
        default:
          console.log(error)
          toast.error("Registration failed. Please try again.");
      }
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && userAuth) {
      router.push("/club/verify");
    }
  }, [userAuth, authLoading, router]);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const config = await getConfig();
        if (!config.registration_status) {
          router.push("/club/registration-closed");
        } else {
          setConfigLoading(false);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
        toast.error("Failed to load registration configuration");
        setConfigLoading(false);
      }
    };

    checkRegistrationStatus();
  }, [router]);

  if (configLoading) {
    return (
      <div className="mt-[81px] grid h-[calc(100vh_-_81px)] w-screen place-items-center">
        <CgSpinner className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex w-full flex-col bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 lg:flex-row">
        <div className="my-5 ml-5 mr-0 hidden w-[40%] flex-1 rounded-xl p-5 lg:block">
          <div className="rounded-xl bg-blue-100 p-5 py-10 mt-5 text-blue-950">
            <p className="flex items-center gap-1 font-bold">
              <CiWarning className="text-blue-700" />
              Important Info:
            </p>
            <p>
              Due to technical reasons, all <span className="font-semibold">Batch '26 </span>
              students are requested to re-sign up using this registration form.
              Please make sure to use your correct information while registering.
            </p>
          </div>
          <Image
            src="/image/club/login.svg"
            alt="Registration Illustration"
            width={400}
            height={400}
            className=" w-full object-contain"
            priority
          />
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-5 p-5 sm:p-12">
          <AiOutlineUserAdd className="h-12 w-12 text-primary" />
          <h1 className="text-4xl">
            <span className="text-primary">Registration</span> Form
          </h1>

          <p>
            Please fill out the form below to register.{" "}
            <Link
              className="inline border-b-2 border-transparent font-medium text-primary hover:border-primary"
              href="/club/login"
            >
              Login Instead
            </Link>{" "}
            if you have already registered. By filling out this form you are
            agreeing to our terms and conditions.
          </p>
          <div className="rounded-xl bg-blue-100 p-5  text-blue-950 lg:hidden">
            <p className="flex items-center gap-1 font-bold">
              <CiWarning className="text-blue-700" />
              Important Info:
            </p>
            <p>
              Due to technical reasons, all <span className="font-semibold">Batch '26 </span>
              students are requested to re-sign up using this registration form.
              Please make sure to use your correct information while registering.
            </p>
          </div>

          {/* <div className="my-2 flex items-center gap-4">
            <div className="flex w-full gap-1 rounded-xl border border-gray-200 p-1 text-small">
              <button
                type="button"
                onClick={() => setIsNDCStudent(true)}
                className={`w-[123px] flex-1 rounded-lg px-4 py-3 transition ${isNDCStudent
                  ? "bg-primary text-white"
                  : "hover:bg-zinc-200 active:bg-zinc-400"
                  }`}
              >
                Club Member
              </button>
              <button
                type="button"
                onClick={() => setIsNDCStudent(false)}
                className={`w-[123px] flex-1 rounded-lg px-4 py-3 transition ${!isNDCStudent
                  ? "bg-primary text-white"
                  : "hover:bg-zinc-200 active:bg-zinc-400"
                  }`}
              >
                Non-Member
              </button>
            </div>
          </div> */}

          {isNDCStudent ? (
            <MemberRegistration
              onRegistration={handleFinalRegistration}
              loading={formLoading}
              setLoading={setFormLoading}
            />
          ) : (
            <NonMemberRegistration
              onRegistration={handleFinalRegistration}
              loading={formLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;