import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineDateRange } from 'react-icons/md';
import { notFound } from 'next/navigation';

type ParamType = { url: string; type: string; date: number };

const fetchData = async (params: ParamType) => {
  try {
    const res = await fetch(decodeURIComponent(params.url));
    console.log(res);
    if (!res.ok) {
      notFound();
    } else {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error(err);
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
      <div className="container pt-[81px] py-10 flex flex-col items-center gap-10 z-10 bg-transparent relative">
        <div className="w-screen bg-white shadow-xl ">
          <div className="container flex flex-col md:flex-row gap-5 items-center ">
            <div className="flex-1 ml-1 flex flex-col gap-5 w-full order-2 md:order-1">
              <Link href={`/activities?type=${params.type}`}>
                <h1 className="text-2xl pt-5 underline hover:text-blue-500">{params.type}&gt;</h1>
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
                <div className="pb-5 flex gap-3 flex-col md:flex-row items-start">
                  <a
                    href={data.action.target}
                    target="_blank"
                    className="before:ease relative flex items-center justify-center  overflow-hidden shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 Bebas cursor-pointer text-xl py-2 font-Bebas px-7 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-black text-white border-gray-600 hover:border-blue-500 hover:text-white hover:bg-zinc-700 rounded-lg"
                  >
                    <span className="relative z-10">{data.action.label}</span>
                  </a>
                  {params.url ==
                    'https%3A%2F%2Fnditc.pythonanywhere.com%2Fprojects%2FgAAAAABklDtCA8wgOMZar9YbvFJgn8e-jFUG27Ic9aHwhx40IBCUofeQ_uoinoAgpmskv_ojJNA4I9Rgswp3RLa9wWgp6846Zg%3D%3D' && (
                    <a
                      href="https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/nditc.apk"
                      target="_blank"
                      className="relative overflow-hidden bg-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-zinc-900 hover:after:w-2/4 hover:after:bg-zinc-900 self-start Bebas inline-block cursor-pointer text-xl py-2 font-Bebas px-7 font-medium text-whiterounded-lg border-2 focus:z-10 focus:ring-4  focus:ring-gray-700 border-zinc-800 hover:text-white rounded-lg"
                    >
                      <span className="relative z-10">Download Our APP</span>
                    </a>
                  )}
                </div>
              ) : null}
            </div>
            <Image
              className="flex-1 order-1 md:max-h-[45vh] object-cover md:order-2 rounded-b-xl md:rounded-none md:max-w-[60%]"
              src={data.images[0]}
              alt=""
              width={750}
              height={430}
            />
          </div>
        </div>
        <div>
          <p className="text-lg min-h-[30vh] my-10">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
