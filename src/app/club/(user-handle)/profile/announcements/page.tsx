"use client";

import { useUserDataContext } from "@/app/club/Components/Layout/UserDataProvider";
import Announcements from "@/app/club/Components/Profile/Announcements";
import React from "react";

const Page = () => {
  const { userData } = useUserDataContext();
  return (
    <div>
      {userData?.ndc_id ? <Announcements club /> : null}
      <Announcements />
    </div>
  );
};

export default Page;
