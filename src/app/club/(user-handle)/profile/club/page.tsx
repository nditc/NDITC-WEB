"use client"
import { useUserDataContext } from "@/app/club/Components/Layout/UserDataProvider";
import ClubInfo from "@/app/club/Components/Profile/ClubInfo";
import React from "react";
import { auth } from "@/config/firebase";

const Page = () => {
  const { userData, userDataLoading, dataError } = useUserDataContext();

  return (
    <div>
     {userData && !userDataLoading ?  <ClubInfo
        ndc_id={userData?.ndc_id}
        email={auth.currentUser?.email || ""}
        uid={auth.currentUser?.uid || ""}
      />: null}
    </div>
  );
};

export default Page;
