"use client";

import Field from "@/app/club/Components/Field";
import React, { useState } from "react";
import Link from "next/link";
import { auth, db, pfp } from "@/config/firebase";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { CgArrowLeft, CgSpinner, CgDanger } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteObject, ref } from "firebase/storage";

const deleteEventParticipantDoc = async (uid: string) => {
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ uid }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete event participation data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting event participant doc:", error);
    throw error;
  }
};

const Page = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!user?.email) {
      toast.error("User not logged in");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate user
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        user.email, 
        password
      );
      
      const currentUser = userCredential.user;
      
      // Delete user data
      await Promise.all([
        deleteDoc(doc(db, "participants", currentUser.uid)),
        deleteObject(ref(pfp, `pfp/${currentUser.uid}`)).catch(() => {}), // Ignore if no profile picture
        deleteEventParticipantDoc(currentUser.uid),
        deleteUser(currentUser)
      ]);

      toast.success("Account deleted successfully");
      router.push("/club");
    } catch (error: any) {
      console.error("Deletion error:", error);
      
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid password");
          break;
        case "auth/requires-recent-login":
          toast.error("Session expired. Please login again before deleting your account.");
          break;
        default:
          toast.error(error.message.replace("Firebase: ", "") || "Failed to delete account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex w-full flex-col bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 lg:flex-row">
        <div className="my-5 ml-5 mr-0 hidden w-[40%] flex-1 rounded-xl p-5 lg:block">
          <Image
            src="/image/club/login.svg"
            alt="Account Deletion Illustration"
            width={400}
            height={400}
            className="h-full w-full object-contain"
            priority
          />
        </div>
        
        <form 
          className="grid w-full flex-1 grid-cols-1 gap-5 p-5 sm:p-12" 
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between text-sm md:text-base">
            <button
              type="button"
              className="ml-2 flex items-center gap-2 border-b-2 border-transparent font-medium text-primary hover:border-primary"
              onClick={() => router.back()}
            >
              <CgArrowLeft /> Go Back
            </button>
          </div>

          <div className="flex items-center gap-3">
            <CgDanger className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl">
              <span className="text-red-500">Delete</span> Account
            </h1>
          </div>
          
          <div className="rounded-xl bg-red-100 p-5 text-red-900">
            <p className="font-bold">Warning: This action is irreversible!</p>
            <p className="mt-2">
              Deleting your account will permanently remove all your data including:
            </p>
            <ul className="ml-5 list-disc">
              <li>Your profile information</li>
              <li>Event participation records</li>
              <li>Any uploaded content</li>
            </ul>
            <p className="mt-2">
              You will need to register again if you want to rejoin.
            </p>
          </div>

          <Field
            state={password}
            setValue={(name, value) => setPassword(String(value))}
            name="password"
            label="Password"
            type="password"
            required
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full rounded-xl border border-gray-300 px-8 py-2 text-lg transition-all hover:bg-gray-100 sm:w-auto"
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 px-8 py-2 text-lg text-white transition-all hover:bg-red-700 disabled:opacity-70 sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
              ) : (
                "Delete Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;