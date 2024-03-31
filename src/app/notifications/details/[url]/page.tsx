import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AES, enc } from 'crypto-js';

const Page = async ({ params }: { params: { url: string; type: string } }) => {
  const url = decodeURIComponent(params.url);
  const cypher = AES.decrypt(url, 'Anime');
  const text = cypher.toString(enc.Utf8);
  const res = await fetch(text, { cache: 'no-store' });
  const data = await res.json();

  return (
    <div className="w-screen bg-[#F6F6F6]">
      <div className="container pt-[81px] py-10 flex flex-col items-center gap-10 z-10 bg-transparent relative">
        <div className="w-screen bg-white shadow-xl ">
          <div className="container flex flex-col md:flex-row gap-5 items-center ">
            <div className="flex-1 ml-1 flex flex-col gap-5 w-full order-2 md:order-1">
              <Link href="/notifications">
                <h1 className="text-2xl pt-5 underline hover:text-blue-500">{'Notifications>'}</h1>
              </Link>

              <h1 className="text-4xl  2xl:text-5xl ">{data.title}</h1>
              {data.subtitle ? <p>{data.subtitle}</p> : null}
              <div className="pb-5">
                <a
                  href={data.action.target}
                  target="_blank"
                  className="Bebas inline-block cursor-pointer text-xl py-2 font-Bebas px-7 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-black text-white border-gray-600 hover:text-white hover:bg-zinc-700 rounded-lg"
                >
                  {data.action.label}
                </a>
              </div>
            </div>
            <Image
              className="flex-1 order-1 md:max-h-[45vh] object-cover md:order-2 rounded-b-xl md:rounded-none md:max-w-[60%]"
              src={data.image_url}
              alt=""
              width={750}
              height={430}
            />
          </div>
        </div>
        <div className="">
          <p className="text-lg min-h-[40vh] my-10">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
