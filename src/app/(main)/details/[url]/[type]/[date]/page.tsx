import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import { notFound } from "next/navigation";
import ImageGrid from "@/app/(main)/Components/ImageComponents/ImageGrid";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { decrypt } from "@/util/Encrypt";

type ParamType = { url: string; type: string; date: number };

const fetchData = async (params: ParamType) => {
  const url = decodeURIComponent(params.url);
  const text = decrypt(url);

  try {
    const res = await fetch(text, { cache: "no-store" });
    if (!res.ok) {
      notFound();
    } else {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error(text);
    notFound();
  }
};

const Page = async (props: { params: Promise<ParamType> }) => {
  const params = await props.params;
  const data = await fetchData(params);
  const DateData = new Date(params.date * 1000);
  const titleArray = data.title.split(" ");
  const firstPart = titleArray.splice(0, 1) + " ";

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <div className="container relative flex flex-col items-center gap-10 bg-transparent py-10 pt-[81px]">
        <div className="w-screen bg-white shadow-xl">
          <div className="container flex flex-col items-center gap-0 pb-5 md:flex-row md:gap-5 md:pb-0">
            <div className="order-2 ml-1 flex w-full flex-1 flex-col gap-2 md:order-1 md:gap-3 md:py-8 2xl:gap-5">
              <Link href={`/activities?type=${params.type}`}>
                <h1 className="pt-5 text-2xl hover:text-blue-500 md:pt-0">
                  {params.type}&gt;
                </h1>
              </Link>

              <h1 className="text-4xl 2xl:text-5xl">
                <span className="text-blue-500">{firstPart}</span>
                {titleArray.join(" ")}
              </h1>
              {DateData.toDateString() !== "Invalid Date" ? (
                <p className="line-clamp-5 flex items-center justify-start font-semibold">
                  <MdOutlineDateRange
                    className={"mr-2 h-6 w-6 text-blue-500"}
                  />

                  {DateData.toDateString()}
                </p>
              ) : null}
              {data.subtitle ? <p>{data.subtitle}</p> : null}
              {data?.action ? (
                <div className="mt-2 flex flex-col flex-wrap items-start gap-2 md:flex-row md:gap-3 md:pb-5">
                  <a
                    href={data.action.target}
                    target="_blank"
                    className="before:ease Bebas text-whiterounded-lg border-2focus:z-10 relative flex h-full min-w-[48%] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-black px-7 py-2 text-center align-middle font-Bebas text-xl font-medium text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-white hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 focus:ring-4 focus:ring-gray-700 sm:min-w-[auto] md:flex-[0_auto]"
                  >
                    <span className="relative z-10">{data.action.label}</span>
                  </a>
                  {data.title == "Official Mobile App" && (
                    <a
                      href="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/nditc.apk"
                      target="_blank"
                      className="Bebas text-whiterounded-lg relative inline-block min-w-[48%] flex-1 cursor-pointer self-start overflow-hidden rounded-lg border-2 border-zinc-800 bg-white px-7 py-2 text-center align-middle font-Bebas text-xl font-medium transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-zinc-900 hover:after:w-2/4 hover:after:bg-zinc-900 focus:z-10 focus:ring-4 focus:ring-gray-700 sm:min-w-[auto] md:flex-[0_auto]"
                    >
                      <span className="relative z-10">Download Our APP</span>
                    </a>
                  )}
                </div>
              ) : null}
              {params.type === "publication" ? (
                <div className="mt-2 flex h-full flex-wrap items-start gap-2 md:gap-3 md:pb-5">
                  <a
                    href={data.pdf_url}
                    target="_blank"
                    className="before:ease Bebas text-whiterounded-lg border-2focus:z-10 relative flex min-w-[48%] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-black px-7 py-2 text-center align-middle font-Bebas text-xl font-medium text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-white hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 focus:ring-4 focus:ring-gray-700 sm:min-w-[auto] md:flex-[0_auto]"
                  >
                    <span className="relative z-10">Read Now</span>
                  </a>
                </div>
              ) : null}
            </div>
            <div className="order-1 h-full max-h-[50vh] w-full flex-1 md:order-2 md:min-h-[410px]">
              <img
                className="h-full max-h-[50vh] w-full rounded-b-xl object-cover md:min-h-[410px] md:rounded-none"
                src={data.images[0]}
                alt=""
                width={750}
                height={430}
              />
            </div>
          </div>
        </div>
        <div className="w-full self-start">
          {data.images.length > 1 ? (
            <div>
              <h1 className="text-4xl">Gallery</h1>
              <div className="w-full py-5">
                <ImageGrid images={data.images} layoutID={data.layout_id} />
              </div>
            </div>
          ) : null}

          <div className="markdown mb-10 mt-3 min-h-[30vh] text-left font-Nunito text-lg">
            <Markdown remarkPlugins={[remarkGfm]}>
              {data.description || data.short_description}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
