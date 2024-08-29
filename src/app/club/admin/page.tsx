"use client";
import Announcements from "@/app/club/Components/Admin/AdminAnnouncements";
import AdminEvents from "@/app/club/Components/Admin/AdminEvents";
import EditConfig from "@/app/club/Components/Admin/EditConfig";
import Error from "@/app/club/Components/Error";
import { auth, db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiDownload, BiUpload } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { FaPlus, FaUserSecret } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GrAnnounce } from "react-icons/gr";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const Page = () => {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [file, setFile] = useState<FileList | null>();
  const [loading, setLoading] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const fileRef = useRef<HTMLFormElement>(null);
  const [dataURL, setUrl] = useState<string>("");
  const Router = useRouter();

  const setLoadingIndexed = (index: number, state: boolean) => {
    setLoading((s) => {
      const newArr = s.map((itm, ind) => {
        return index === ind ? state : itm;
      });
      return newArr;
    });
  };

  /*  const getAllDocs = async (selected: boolean) => {
    try {
      const loadIndex = selected ? 1 : 0;
      if (adminAuth) {
        setLoadingIndexed(loadIndex, true);
        const data: any = [];
        const x = !selected
          ? await getDocs(
              query(
                collection(db, "participants"),
                where("verified", "==", true),
              ),
            )
          : await getDocs(
              query(
                collection(db, "participants"),
                where("verified", "==", true),
                where("selected", "==", true),
              ),
            );
        x.forEach((doc) => {
          const temp = doc.data();
          const createdAt = new Date(
            temp?.timestamp?.seconds * 1000,
          ).toString();
          if (temp.timestamp) {
            delete temp.timestamp;
          }
          data.push({
            uid: doc.id,
            createdAt,
            ...temp,
          });
        });

        const workBook = XLSX.utils.book_new();
        const xlsx = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workBook, xlsx, "All Participants");

        XLSX.writeFile(workBook, "Participants.xlsx");

        // setUrl(URL.createObjectURL(blob));

        // setTimeout(() => downloadRef.current?.click(), 3000);
        setLoadingIndexed(loadIndex, false);
        toast.info("Data Downloaded as XLSX");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
*/
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
              ADMIN <span className="text-primary">PANEL</span>
            </h1>
            <p className="mb-5 mt-3">
              Click once and wait for at least 15 seconds.
            </p>

            {/* Downloads */}
            {/*<div className="container my-6 rounded-xl bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-2">
                  <BiDownload className="h-12 w-12 text-primary" />
                  <h1 className="text-4xl leading-none">
                    <span className="">DOWNLOADS</span>
                  </h1>
                </div>
                <div className="flex gap-4">
                  <button
                    disabled={loading[0]}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
                    onClick={() => getAllDocs(false)}
                  >
                    {" "}
                    {loading[0] ? (
                      <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                    ) : (
                      "All User Data"
                    )}
                  </button>
                  <button
                    disabled={loading[1]}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
                    onClick={() => getAllDocs(true)}
                  >
                    {loading[1] ? (
                      <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                    ) : (
                      "All Club Member Data"
                    )}
                  </button>
                </div>
              </div>
            </div>*/}
            {/* Uploads */}
            {/*<div className="container my-6 rounded-xl bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-2">
                  <BiUpload className="h-12 w-12 text-primary" />
                  <h1 className="text-4xl leading-none">
                    <span className="">UPLOADS</span>
                  </h1>
                </div>

                <form ref={fileRef}>
                  <input
                    onChange={(e) => setFile(e.target.files)}
                    className="my-0 file:px-5 file:py-3"
                    type={"file"}
                  />
                </form>
              </div>
            </div>*/}
            <div className="container my-8 rounded-xl bg-white p-6 pb-2 md:p-8 md:pb-4">
              <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                <div className="flex items-center gap-5">
                  <FaUserSecret className="h-12 w-12 text-primary" />
                  <h1 className="text-4xl leading-none">
                    <span className="">USERS INFO</span>
                  </h1>
                </div>
                <div>
                  <Link
                    type={"button"}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
                    href={"/admin/users"}
                  >
                    <FiUsers className="h-6 w-6" />
                    Users
                  </Link>
                </div>
              </div>
            </div>

            <Announcements />
            <AdminEvents adminAuth={adminAuth} />
            <EditConfig />
            <div className="flex flex-wrap gap-5">
              <button
                disabled={loading[0]}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-lg leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
                onClick={() => {
                  auth.signOut();
                  Router.push("/club/login");
                }}
              >
                Sign Out
              </button>
            </div>
            <a
              className="hidden"
              ref={downloadRef}
              href={dataURL}
              download={true}
            >
              Down
            </a>
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
