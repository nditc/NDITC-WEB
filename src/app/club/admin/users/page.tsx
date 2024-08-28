"use client";

import { auth } from "@/config/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";
import Error from "@/Components/Error";
import { toast } from "react-toastify";

const Page = () => {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  useEffect(() => {
    if (user && user.email) {
      fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ id: user.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          console.log(resp);
          setAdminAuth(resp.auth || false);
          setAuthLoading(false);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setAdminAuth(false);
          setAuthLoading(false);
        });
    } else {
      setAdminAuth(false);
      setAuthLoading(false);
    }
  }, [user]);
  return (
    <>
      {adminAuth ? (
        <div
          suppressHydrationWarning
          className="min-h-screen w-screen bg-[#f6f6f6]"
        >
          <div className="container py-[81px]">
            <h1 className="container mt-8 text-5xl">
              USERS <span className="text-primary">PANEL</span>
            </h1>
            <p className="mb-5 mt-3">
              Click once and wait for at least 15 seconds.
            </p>
          </div>
        </div>
      ) : authLoading ? (
        <div className="grid h-screen w-full place-items-center">
          <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
        </div>
      ) : (
        <Error statusCode={403} msg="Unauthorized User" location={"/"} />
      )}
    </>
  );
};

export default Page;
