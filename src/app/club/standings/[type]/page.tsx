'use client';
import { useConfig } from '@/config/config_db';
import { pfp } from '@/config/firebase';
import nthNumber from '@/util/nthNumber';
import { getBlob, getBytes, getDownloadURL, ref } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCalendar2CheckFill, BsDownload, BsGraphUpArrow } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { FaTimes } from 'react-icons/fa';
import { FiUserCheck } from 'react-icons/fi';
import { GrTrophy, GrWorkshop } from 'react-icons/gr';
import { IoCheckmarkDone } from 'react-icons/io5';
import { LuArchive } from 'react-icons/lu';
import { toast } from 'react-toastify';

const Page = ({ params }: { params: { type: string } }) => {
  const { type } = params;
  const [config, , configLoading] = useConfig([]);
  const [result, setResult] = useState<null | 'loading' | any>('loading');
  useEffect(() => {
    setResult('loading');
    if (
      (type === 'final' && config?.final_result_published) ||
      (type === 'preliminary' && config?.pre_result_published)
    ) {
      getBytes(ref(pfp, 'result/' + (type === 'preliminary' ? 'pre_result' : 'final_result')))
        .then((data) => {
          const json = JSON.parse(new TextDecoder('utf-8').decode(new Uint8Array(data)));
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
    <div className="py-28  md:py-32  bg-[#F6F6F6] min-h-[100vh]">
      <h1 className="text-4xl md:text-5xl container pl-2">
        <BsGraphUpArrow className="w-8 h-8 md:w-12 md:h-12 text-primary inline mr-3" />
        <span>STANDINGS </span> <span className="text-primary">| </span>
        <span className="text-secondary">{String(type)}</span>
      </h1>
      <p className="container mt-4 md:mt-8">
        {type === 'preliminary'
          ? 'Only Selected Students are listed here!'
          : 'Final result have been published'}
      </p>
      {config?.pre_result_published ? (
        <div className="container flex mt-4 md:mt-8 sm:relative my-auto gap-2 justify-between sm:justify-start  flex-wrap">
          <Link
            href="/standings/preliminary"
            type="button"
            className={` shadow-md sm:shadow-lg flex gap-2 basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto items-center font-Nunito font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
              type == 'preliminary'
                ? 'bg-secondary hover:bg-primary hover:text-white  text-white shadow-lg'
                : 'bg-white text-black hover:bg-green-100 hover:text-secondary'
            }`}
          >
            <FiUserCheck
              className={
                'w-[1.125rem] h-[1.125rem] ' +
                (type === 'preliminary' ? 'text-green-200' : 'text-secondary')
              }
            />
            Preliminary
          </Link>

          {config?.final_result_published ? (
            <Link
              href="/standings/final"
              type="button"
              className={`shadow-md sm:shadow-lg font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
                type == 'final'
                  ? 'bg-secondary hover:bg-primary hover:text-white  text-white shadow-lg'
                  : 'bg-white text-black hover:bg-green-100 hover:text-secondary'
              }`}
            >
              <GrTrophy
                className={
                  'w-[1.125rem] h-[1.125rem] ' +
                  (type === 'final' ? 'text-green-200' : 'text-secondary')
                }
              />
              Final
            </Link>
          ) : null}
        </div>
      ) : null}
      <div className={'container mt-4 md:mt-8  '}>
        <div className="my-2 text-base max-h-[80vh] overscroll-contain  bg-white rounded-xl p-6 pr-2 overflow-auto">
          {((type === 'final' && config?.final_result_published) ||
            (type === 'preliminary' && config?.pre_result_published)) &&
          result?.length > 0 &&
          result !== 'loading' ? (
            <table className="table-padding w-full  min-w-[756px] border-collapse text-left ">
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
                            ? 'text-white bg-rose-500 shadow'
                            : index === 1
                            ? 'text-white bg-yellow-500 shadow'
                            : index === 2
                            ? 'text-white bg-secondary shadow'
                            : 'bg-gray-100'
                        } rounded`}
                      >
                        {nthNumber(index + 1)}
                      </span>
                    </td>
                    <td className="w-auto flex items-center gap-3">
                      <Image
                        className="w-14 rounded-full h-14 shadow-sm object-cover"
                        src={data.imageUrl}
                        width={56}
                        height={56}
                        alt="img"
                      />
                      <div>
                        <p className=" text-lg font-semibold leading-6">{data.name}</p>
                        <p className="text-sm leading-6">{data.institution}</p>
                      </div>
                    </td>
                    <td className="w-36">
                      <span className="text-lg font-bold text-secondary font-e">{data.score}</span>{' '}
                      / <span className="text-sm text-rose-600">{data.penalty}</span>
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
          ) : configLoading || result === 'loading' ? (
            <div className="grid place-items-center w-full h-[70vh] ">
              <CgSpinner className="mx-auto w-16 h-16 animate-spin text-primary" />
            </div>
          ) : (
            <p className="text-center h-[60vh] pt-8 text-gray-400">Result not published yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
