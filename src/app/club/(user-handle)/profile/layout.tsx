"use client";

import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  UserDataContextProvider,
  useUserDataContext,
} from "@/app/_context/UserDataProvider";
import ProfileHero from "../../Components/Profile/ProfileHero";
import { SubNav, SubNavItem } from "../../Components/SubNav";
import { CgProfile } from "react-icons/cg";
import { MdAnnouncement, MdEvent } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import Loading from "../../Components/Loading";

const Page = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, authLoading, authError] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!userAuth && !authLoading) {
      router.push("/club/login");
      return;
    }

    if (userAuth) {
      // Check email verification
      if (!userAuth.emailVerified) {
        router.push("/club/verify");
        return;
      }

      // Check admin status
      const checkAdminStatus = async () => {
        try {
          const response = await fetch("/api/admin", {
            method: "POST",
            body: JSON.stringify({ id: userAuth.email }),
          });

          if (!response.ok) throw new Error("Admin check failed");

          const data = await response.json();
          if (data.auth) {
            router.push("/club/admin");
          }
        } catch (error) {
          console.error("Admin check error:", error);
          toast.error("Failed to verify user status");
        } finally {
          setDataLoading(false);
        }
      };

      checkAdminStatus();
    }
  }, [userAuth, authLoading, router]);

  if (authLoading || dataLoading) {
    return <Loading />;
  }

  if (authError) {
    return (
      <div className="grid h-screen w-full place-items-center">
        <div className="text-center">
          <p className="text-red-500">Authentication error occurred</p>
          <button 
            onClick={() => router.push("/club/login")}
            className="mt-2 text-primary"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!userAuth) {
    return null; // Redirect will handle this
  }

  return (
    <div className="flex min-h-[100vh] flex-col bg-[#F6F6F6] py-28 md:py-36">
      <UserDataContextProvider>
        <div className="container">
          <div className="flex flex-col items-stretch gap-8 lg:flex-row">
            <ProfileHero />
          </div>
          
          <div className="mt-3">
            <SubNav>
              <SubNavItem href="/club/profile" icon={CgProfile}>
                Profile
              </SubNavItem>
              <SubNavItem href="/club/profile/club" icon={IoPeopleOutline}>
                Club
              </SubNavItem>
              <SubNavItem
                href="/club/profile/announcements"
                icon={MdAnnouncement}
              >
                Notice
              </SubNavItem>
              <SubNavItem
                href="/club/profile/events/nditc/all"
                icon={MdEvent}
              >
                Events
              </SubNavItem>
            </SubNav>
          </div>
          
          {children}
        </div>
      </UserDataContextProvider>
    </div>
  );
};

export default Page;