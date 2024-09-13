"use client";
import AdminEvents from "@/app/club/Components/Admin/AdminEvents";
import AdminContext from "@/app/club/Context/AdminContext";
import React, { useContext } from "react";

const Page = () => {
  const adminAuth = useContext(AdminContext);
  return (
    <div>
      <AdminEvents adminAuth={adminAuth} />
    </div>
  );
};

export default Page;
