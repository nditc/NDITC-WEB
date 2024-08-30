"use client";

import { auth, db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";
import Error from "@/app/club/Components/Error";
import { toast } from "react-toastify";
import Field from "../../Components/Field";
import { MdOutlinePersonSearch } from "react-icons/md";
import { collection, getDocs, limit, query } from "firebase/firestore";

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
        .then(() => {
          const docSnap = getDocs(
            query(collection(db, "participants"), limit(5)),
          );
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

  const [searchText, setSearchText] = useState("");
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

            <div className="flex flex-col gap-1 py-6 md:flex-row md:gap-16">
              <div className="flex w-full flex-col gap-1 md:w-[80%]">
                <label
                  className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
                  htmlFor={"searchtext"}
                >
                  Search User
                </label>
                <input
                  className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  type={"text"}
                  name={"searchtext"}
                  placeholder={"User Name ..."}
                />
              </div>
              <button
                type={"button"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary md:mt-7"
              >
                <MdOutlinePersonSearch className="h-6 w-6" /> Search User
              </button>
            </div>

            <table>
              <thead></thead>
            </table>
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
