"use client";
import { useConfig } from "@/config/config_db";
import { pfp } from "@/config/firebase";
import nthNumber from "@/util/nthNumber";
import { getBlob, getBytes, getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import {
  BsCalendar2CheckFill,
  BsDownload,
  BsGraphUpArrow,
} from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { FaTimes } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { GrTrophy, GrWorkshop } from "react-icons/gr";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuArchive } from "react-icons/lu";
import { toast } from "react-toastify";

const Page = (props: { params: Promise<{ type: string }> }) => {
  const params = use(props.params);
  const { type } = params;
  const [config, , configLoading] = useConfig([]);
  const [result, setResult] = useState<null | "loading" | any>("loading");
  useEffect(() => {
    setResult("loading");
    if (
      (type === "final" && config?.final_result_published) ||
      (type === "preliminary" && config?.pre_result_published)
    ) {
      getBytes(
        ref(
          pfp,
          "result/" + (type === "preliminary" ? "pre_result" : "final_result"),
        ),
      )
        .then((data) => {
          const json = JSON.parse(
            new TextDecoder("utf-8").decode(new Uint8Array(data)),
          );
          setResult(json);
        })
        .catch((err) => {
          setResult(null);
          console.error(err);
        });
    } else if (!configLoading) {
      setResult(null);
    }
  }, [type, config, configLoading]);

  return (
    <div className="min-h-[100vh] bg-[#F6F6F6] py-28 md:py-32">
      <h1 className="container pl-2 text-4xl md:text-5xl">
        <BsGraphUpArrow className="mr-3 inline h-8 w-8 text-primary md:h-12 md:w-12" />
        <span>STANDINGS </span> <span className="text-primary">| </span>
        <span className="text-secondary">{String(type)}</span>
      </h1>
      <p className="container mt-4 md:mt-8">
        {type === "preliminary"
          ? "Only Selected Students are listed here!"
          : "Final result have been published"}
      </p>
      {config?.pre_result_published ? (
        <div className="container my-auto mt-4 flex flex-wrap justify-between gap-2 sm:relative sm:justify-start md:mt-8">
          <Link
            href="/standings/preliminary"
            type="button"
            className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
              type == "preliminary"
                ? "bg-secondary text-white shadow-lg hover:bg-primary hover:text-white"
                : "bg-white text-black hover:bg-green-100 hover:text-secondary"
            }`}
          >
            <FiUserCheck
              className={
                "h-[1.125rem] w-[1.125rem] " +
                (type === "preliminary" ? "text-green-200" : "text-secondary")
              }
            />
            Preliminary
          </Link>

          {config?.final_result_published ? (
            <Link
              href="/standings/final"
              type="button"
              className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
                type == "final"
                  ? "bg-secondary text-white shadow-lg hover:bg-primary hover:text-white"
                  : "bg-white text-black hover:bg-green-100 hover:text-secondary"
              }`}
            >
              <GrTrophy
                className={
                  "h-[1.125rem] w-[1.125rem] " +
                  (type === "final" ? "text-green-200" : "text-secondary")
                }
              />
              Final
            </Link>
          ) : null}
        </div>
      ) : null}
      <div className={"container mt-4 md:mt-8"}>
        <div className="my-2 max-h-[80vh] overflow-auto overscroll-contain rounded-xl bg-white p-6 pr-2 text-base">
          {((type === "final" && config?.final_result_published) ||
            (type === "preliminary" && config?.pre_result_published)) &&
          result?.length > 0 &&
          result !== "loading" ? (
            <table className="table-padding w-full min-w-[756px] border-collapse text-left">
              <thead className="border-b">
                <tr>
                  <th className="w-14 lg:w-28">Ranking</th>
                  <th className="w-auto">Participant</th>
                  <th className="w-36">Score / Penalty</th>
                  {/* <td className="w-28 text-center">Selected</td> */}
                </tr>
              </thead>
              <tbody>
                {result.map((data: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="w-14 lg:w-28">
                      <span
                        className={`p-2 ${
                          index === 0
                            ? "bg-rose-500 text-white shadow"
                            : index === 1
                              ? "bg-yellow-500 text-white shadow"
                              : index === 2
                                ? "bg-secondary text-white shadow"
                                : "bg-gray-100"
                        } rounded`}
                      >
                        {nthNumber(index + 1)}
                      </span>
                    </td>
                    <td className="flex w-auto items-center gap-3">
                      <img
                        className="h-14 w-14 rounded-full object-cover shadow-sm"
                        src={data.imageUrl}
                        width={56}
                        height={56}
                        alt="img"
                      />
                      <div>
                        <p className="text-lg font-semibold leading-6">
                          {data.name}
                        </p>
                        <p className="text-sm leading-6">{data.institution}</p>
                      </div>
                    </td>
                    <td className="w-36">
                      <span className="font-e text-lg font-bold text-secondary">
                        {data.score}
                      </span>{" "}
                      /{" "}
                      <span className="text-sm text-rose-600">
                        {data.penalty}
                      </span>
                    </td>
                    {/* <td className="w-28 Inter font-normal text-center ">
                      {data.selected ? (
                        <span className="p-2 bg-green-200 text-primary rounded">
                          <IoCheckmarkDone className="w-4 h-4  text-primary inline" />
                        </span>
                      ) : (
                        <span className="p-2 bg-rose-200 text-rose-600 text-red  rounded">
                          <FaTimes className="w-3 h-3  text-rose-600 inline" />
                        </span>
                      )}
                    
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : configLoading || result === "loading" ? (
            <div className="grid h-[70vh] w-full place-items-center">
              <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
            </div>
          ) : (
            <p className="h-[60vh] pt-8 text-center text-gray-400">
              Result not published yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
