/* eslint-disable @next/next/no-img-element */
"use client";

import { auth } from "@/config/firebase";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";
import {
  UserDataContextProvider,
  useUserDataContext,
} from "@/app/club/Components/Layout/UserDataProvider";
import ProfileHero from "../../Components/Profile/ProfileHero";
import { SubNav, SubNavItem } from "../../Components/SubNav";
import { CgProfile } from "react-icons/cg";
import { MdAnnouncement, MdEvent } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import ContestCard from "../../Components/Profile/ContestCard";
import Loading from "../../Components/Loading";
import { IoIosPower } from "react-icons/io";
import AdminContext from "../../Context/AdminContext";
import { BsGear } from "react-icons/bs";

const Page = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, loading, error] = useAuthState(auth);
  const [dLoading, setDLoading] = useState(true);

  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const Router = useRouter();
  const logOut = () => {
    auth.signOut();
    Router.push("/club/login");
  };

  useEffect(() => {
    if (userAuth && userAuth.email) {
      fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ id: userAuth.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
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
  }, [userAuth]);
  return (
    <>
      {userAuth && adminAuth ? (
        <div className="flex min-h-[100vh] flex-col bg-[#F6F6F6] py-28 md:py-36">
          <AdminContext.Provider value={adminAuth}>
            <div className="container">
              <div className="flex flex-col items-stretch gap-8 lg:flex-row">
                <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:flex-row">
                  <div className="">
                    <p className="mb-1 text-lg">Welcome Back!</p>
                    <h1 className="break-all text-4xl text-primary md:text-5xl">
                      WEB ADMIN
                    </h1>
                    {/*<h2 className="Inter break-all text-lg md:text-xl">
                      {userAuth.email || (
                        <div className="my-2 h-8 w-48 animate-pulse rounded-lg bg-zinc-300"></div>
                      )}
                    </h2>*/}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={logOut}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-semibold leading-[1.15] text-primary shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
                      >
                        <IoIosPower className="h-8 w-8" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <SubNav>
                  <SubNavItem href="/club/admin" icon={BsGear}>
                    Config
                  </SubNavItem>
                  <SubNavItem href="/club/admin/users" icon={IoPeopleOutline}>
                    Users
                  </SubNavItem>
                  <SubNavItem
                    href="/club/admin/announcements"
                    icon={MdAnnouncement}
                  >
                    Notice
                  </SubNavItem>
                  <SubNavItem href="/club/admin/events" icon={MdEvent}>
                    Events
                  </SubNavItem>
                </SubNav>
              </div>
              {children}
            </div>
          </AdminContext.Provider>
        </div>
      ) : loading || dLoading || authLoading ? (
        <Loading />
      ) : (
        <div className="grid h-screen w-full place-items-center"></div>
      )}
    </>
  );
};

export default Page;
