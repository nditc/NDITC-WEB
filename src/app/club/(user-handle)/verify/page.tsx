"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";
import {
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const [lastSentTime, setLastSentTime] = useState<number>(0);
  const router = useRouter();

  const handleResendVerification = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        toast.error("User not signed in!");
        setLoading(false);
        return;
      }

      // Prevent spamming the send button
      const now = Date.now();
      if (now - lastSentTime < 30000) { // 30 seconds cooldown
        toast.info("Please wait before sending another verification email");
        setLoading(false);
        return;
      }

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setLastSentTime(now);
        
        if (!userData?.pass_set) {
          await sendPasswordResetEmail(auth, user.email!);
          toast.success("Verification & password reset email sent! Check your inbox.");
        } else {
          toast.success("Verification email sent! Check your inbox.");
        }
      } else {
        toast.info("Your email is already verified");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      
      switch (error.code) {
        case "auth/too-many-requests":
          toast.error("Too many requests. Please try again later.");
          break;
        default:
          toast.error("Failed to send verification email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading2(true);
    
    try {
      if (user) {
        await deleteUser(user);
        toast.info("Account deleted. Please register again.");
        router.push("/club/register");
      }
    } catch (error: any) {
      console.error("Delete account error:", error);
      
      if (error?.code === "auth/requires-recent-login") {
        toast.error("Session expired. Please login again.");
        await auth.signOut();
        router.push("/club/login");
      } else {
        toast.error("Failed to delete account. Please try again.");
      }
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    if (user?.emailVerified) {
      router.push("/club/profile");
    } else if (!user && !loading2) {
      router.push("/club/login");
    }
  }, [user, router, loading2]);

  useEffect(() => {
    const reloadUser = setInterval(() => {
      user?.reload();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(reloadUser);
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "participants", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data");
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return (
      <div className="mt-[81px] grid h-[calc(100vh_-_81px)] w-screen place-items-center">
        <CgSpinner className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full flex-col bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 md:min-h-[70vh] lg:flex-row">
        <div className="order-2 flex w-full flex-col justify-center gap-5 p-5 sm:p-12 lg:w-1/2">
          <h1 className="text-4xl">
            ACCOUNT <span className="text-primary">VERIFICATION</span>
          </h1>
          
          <p className="text-base">
            Please verify your account. An email has been sent to{" "}
            <span className="font-semibold">{user?.email}</span>.{" "}
            {!userData?.pass_set && (
              <>
                Verify your email and set your new password. For security reasons
                we require this step.
              </>
            )}
            <br />
            <span className="text-sm text-gray-600">
              Don't forget to check your spam folder.
            </span>
          </p>

          <div className="flex w-full flex-col gap-4">
            <button
              onClick={() => window.location.reload()}
              disabled={loading}
              className="w-full rounded-xl bg-primary px-8 py-3 text-lg text-white transition-all hover:bg-primary_dark disabled:opacity-70"
            >
              I'm Verified!
            </button>

            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full rounded-xl bg-primary px-8 py-3 text-lg text-white transition-all hover:bg-primary_dark disabled:opacity-70"
            >
              {loading ? (
                <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
              ) : (
                "Resend Verification Link"
              )}
            </button>

            <button
              onClick={deleteAccount}
              disabled={loading2}
              className="w-full rounded-xl bg-red-600 px-8 py-3 text-lg text-white transition-all hover:bg-red-700 disabled:opacity-70"
            >
              {loading2 ? (
                <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
              ) : (
                "Incorrect Email? Register Again"
              )}
            </button>
          </div>
        </div>

        <div className="order-1 hidden w-full p-5 lg:block lg:w-1/2">
          <Image
            src="/image/club/login.svg"
            alt="Verification Illustration"
            width={512}
            height={512}
            className="h-full w-full rounded-xl object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Page;