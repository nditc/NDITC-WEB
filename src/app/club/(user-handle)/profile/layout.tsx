/* eslint-disable @next/next/no-img-element */
"use client";

import { auth } from "@/config/firebase";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { MdAnnouncement } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

const Page = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, loading, error] = useAuthState(auth);
  const [dLoading, setDLoading] = useState(true);
  const Route = useRouter();

  useEffect(() => {
    auth.currentUser?.reload();

    if (userAuth) {
      fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ id: userAuth.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          if (resp.auth) {
            Route.push("/club/admin");
          }
          setDLoading(false);
        })
        .catch((err) => {
          setDLoading(false);
          toast.error("Something went wrong");
        });
    }

    if (userAuth && !userAuth?.emailVerified) {
      setDLoading(false);
      Route.push("/club/verify");
    } else if (!loading && !userAuth) {
      setDLoading(false);
      Route.push("/club/login");
    }
  }, [Route, userAuth, loading]);

  return (
    <>
      {userAuth ? (
        <div className="flex min-h-[100vh] flex-col bg-[#F6F6F6] py-28 md:py-36">
          <UserDataContextProvider>
            <div className="container">
              <ProfileHero />
              <div className="mt-3">
                <SubNav>
                  <SubNavItem href="/club/profile" icon={CgProfile}>
                    User Data
                  </SubNavItem>
                  <SubNavItem href="/club/profile/club" icon={IoPeopleOutline}>
                    Club{" "}
                  </SubNavItem>
                  <SubNavItem
                    href="/club/profile/announcements"
                    icon={MdAnnouncement}
                  >
                    Announcements
                  </SubNavItem>
                </SubNav>
              </div>
              {children}
            </div>
          </UserDataContextProvider>
        </div>
      ) : loading || dLoading ? (
        <div className="grid h-screen w-full place-items-center">
          <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid h-screen w-full place-items-center"></div>
      )}
    </>
  );
};

export default Page;
