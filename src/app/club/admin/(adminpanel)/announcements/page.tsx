import Announcements from "@/app/club/Components/Admin/AdminAnnouncements";
import AdminEvents from "@/app/club/Components/Admin/AdminEvents";
import AdminContext from "@/app/club/Context/AdminContext";
import React, { useContext } from "react";

const Page = () => {
  return (
    <div>
      <Announcements />
    </div>
  );
};

export default Page;
