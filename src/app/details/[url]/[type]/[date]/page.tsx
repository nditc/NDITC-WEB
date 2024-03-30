import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineDateRange } from 'react-icons/md';
import { notFound } from 'next/navigation';
import { AES, enc } from 'crypto-js';
import ImageGrid from '@/app/Components/ImageComponents/ImageGrid';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ParamType = { url: string; type: string; date: number };

const fetchData = async (params: ParamType) => {
  const url = decodeURIComponent(params.url);
  const cypher = AES.decrypt(url, 'SWAPNIL');
  const text = cypher.toString(enc.Utf8);

  try {
    const res = await fetch(text, { cache: 'no-cache' });
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

const Page = async ({ params }: { params: ParamType }) => {
  const data = await fetchData(params);
  const DateData = new Date(params.date * 1000);
  const titleArray = data.title.split(' ');
  const firstPart = titleArray.splice(0, 1) + ' ';

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <div className="container pt-[81px] py-10 flex flex-col items-center gap-10 bg-transparent relative">
        <div className="w-screen bg-white shadow-xl ">
          <div className="container flex flex-col md:flex-row gap-0 md:gap-5 items-center pb-5 md:pb-0">
            <div className="flex-1 ml-1 md:py-8 flex flex-col gap-2 md:gap-3 2xl:gap-5 w-full order-2 md:order-1">
              <Link href={`/activities?type=${params.type}`}>
                <h1 className="text-2xl pt-5 md:pt-0 hover:text-blue-500">{params.type}&gt;</h1>
              </Link>

              <h1 className="text-4xl  2xl:text-5xl ">
                <span className="text-blue-500">{firstPart}</span>
                {titleArray.join(' ')}
              </h1>
              <p className="line-clamp-5  font-semibold flex justify-start items-center">
                <MdOutlineDateRange className={'mr-2 w-6 h-6 text-blue-500'} />

                {DateData.toDateString()}
              </p>
              {data.subtitle ? <p>{data.subtitle}</p> : null}
              {data?.action ? (
                <div className=" flex md:pb-5 gap-2 md:gap-3  flex-wrap mt-2 flex-col md:flex-row items-start">
                  <a
                    href={data.action.target}
                    target="_blank"
                    className="before:ease relative align-middle border-2   h-full flex-1 md:flex-[0_auto] min-w-[48%] sm:min-w-[auto]    text-center flex items-center justify-center  overflow-hidden  transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 Bebas cursor-pointer text-xl py-2 font-Bebas px-7 font-medium text-whiterounded-lg border-2focus:z-10 focus:ring-4 focus:ring-gray-700 bg-black text-white border-black hover:border-blue-500 hover:text-white hover:bg-zinc-700 rounded-lg"
                  >
                    <span className="relative z-10">{data.action.label}</span>
                  </a>
                  {data.title == 'Official Mobile App' && (
                    <a
                      href="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/nditc.apk"
                      target="_blank"
                      className="relative  align-middle overflow-hidden flex-1 md:flex-[0_auto] min-w-[48%] sm:min-w-[auto]    text-center bg-white  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-zinc-900 hover:after:w-2/4 hover:after:bg-zinc-900 self-start Bebas inline-block cursor-pointer text-xl py-2 font-Bebas px-7 font-medium text-whiterounded-lg border-2 focus:z-10 focus:ring-4  focus:ring-gray-700 border-zinc-800 hover:text-white rounded-lg"
                    >
                      <span className="relative z-10">Download Our APP</span>
                    </a>
                  )}
                </div>
              ) : null}
              {params.type === 'publication' ? (
                <div className=" flex gap-2 md:gap-3 mt-2 flex-wrap   h-full items-start md:pb-5">
                  <a
                    href={data.pdf_url}
                    target="_blank"
                    className="before:ease relative align-middle    flex-1 md:flex-[0_auto] min-w-[48%] sm:min-w-[auto]   text-center flex items-center justify-center  overflow-hidden  transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 Bebas cursor-pointer text-xl py-2 font-Bebas px-7 font-medium text-whiterounded-lg border-2focus:z-10 focus:ring-4 focus:ring-gray-700 bg-black text-white border-black hover:border-blue-500 border-2 hover:text-white hover:bg-zinc-700 rounded-lg"
                  >
                    <span className="relative z-10">Read Now</span>
                  </a>
                </div>
              ) : null}
            </div>
            <div className="flex-1 md:h-[40vh] 2xl:h-[50vh] w-full order-1 md:order-2">
              <Image
                className="  object-cover  rounded-b-xl md:rounded-none w-full h-full"
                src={data.images[0]}
                alt=""
                width={750}
                height={430}
              />
            </div>
          </div>
        </div>
        <div className="self-start w-full">
          {data.images.length > 1 ? (
            <div>
              <h1 className="text-4xl">Gallery</h1>
              <div className="py-5 w-full">
                <ImageGrid images={data.images} layout={data.layout_id} />
              </div>
            </div>
          ) : null}

          <div className="text-lg min-h-[30vh] mt-3 mb-10 text-left font-Nunito markdown">
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
