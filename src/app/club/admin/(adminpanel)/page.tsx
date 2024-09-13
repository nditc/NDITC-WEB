"use client";
import Announcements from "@/app/club/Components/Admin/AdminAnnouncements";
import EditConfig from "@/app/club/Components/Admin/EditConfig";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

const Page = () => {
  const [loading, setLoading] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [dataURL, setUrl] = useState<string>("");
  const Router = useRouter();

  return (
    <>
      <div suppressHydrationWarning className="bg-[#f6f6f6]">
        <div className="pb-[81px]">
          {/* Downloads */}
          {/*<div className=" my-6 rounded-xl bg-white p-6">
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
          {/*<div className=" my-6 rounded-xl bg-white p-6">
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

          <EditConfig />

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
    </>
  );
};

export default Page;
