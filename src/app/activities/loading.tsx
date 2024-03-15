import { PiSmileySad } from 'react-icons/pi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { GrWorkshop } from 'react-icons/gr';
import { FaProjectDiagram } from 'react-icons/fa';
import { BiSolidBook } from 'react-icons/bi';

const loading = () => {
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img src="/image/bg2.svg" className="absolute top-1/4 right-0 z-0" alt=""></img>
      <div className="container pt-28 sm:pt-[7.5rem] py-10 flex flex-col items-center  mb-5 gap-5 sm:gap-10 z-10 bg-transparent relative">
        {/* <div className="flex gap-3 items-end justify-center self-start md:justify-start">
          <h1 className="text-3xl md:text-5xl pb-1">UPCOMING</h1>
          <h1 className="text-5xl md:text-7xl text-blue-500">EVENT</h1>
        </div>
        <section className="w-full ">
          <div className="w-full grid place-items-center h-60 bg-slate-400 rounded-xl text-slate-100 shadow-xl animate-pulse">
            <p className="Bebas text-2xl">Upcoming...</p>
          </div>
        </section> */}
        <section className="w-full">
          <div className="flex flex-col lg:flex-row my-auto  justify-between gap-3 lg:gap-8 mb-5 lg:mb-6">
            <h1
              className="text-[2.5rem] md:text-5xl leading-none ml-1 my-auto items-center justify-center self-start md:justify-start"
              id="SCROLLHERE"
            >
              <span className=" text-blue-500 ">ALL</span> EVENTS
            </h1>
            <div className="flex my-auto gap-2 justify-between sm:justify-start  flex-wrap">
              <div
                className={` shadow-md sm:shadow-lg flex gap-2 basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto items-center font-Nunito font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
                  0
                    ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                    : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <BsCalendar2EventFill
                  className={'w-[1.125rem] h-[1.125rem] ' + (0 ? 'text-blue-200' : 'text-blue-500')}
                />
                Events
              </div>
              <div
                className={`shadow-md sm:shadow-lg font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
                  0
                    ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                    : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <GrWorkshop
                  className={'w-[1.125rem] h-[1.125rem] ' + (0 ? 'text-blue-200' : 'text-blue-500')}
                />
                Workshop
              </div>
              <div
                className={` shadow-md sm:shadow-lg font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0  sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
                  0
                    ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                    : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <FaProjectDiagram
                  className={'w-[1.125rem] h-[1.125rem] ' + (0 ? 'text-blue-200' : 'text-blue-500')}
                />
                Projects
              </div>
              <div
                className={` shadow-md sm:shadow-lg  font-Nunito basis-[calc(50%-0.25rem)] shrink-0 grow-0 sm:basis-auto flex gap-2 items-center font-bold -gray-300 focus:outline-none active:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg md:rounded-xl  text-sm md:text-base px-5 py-4 md:py-3 md:me-2 md:mb-2  transition-colors  ${
                  0
                    ? 'bg-blue-500 hover:bg-blue-600 hover:text-white  text-white shadow-lg'
                    : 'bg-white text-black hover:bg-blue-100 hover:text-blue-500'
                }`}
              >
                <BiSolidBook
                  className={'w-[1.125rem] h-[1.125rem] ' + (0 ? 'text-blue-200' : 'text-blue-500')}
                />
                Publication
              </div>
            </div>
          </div>

          <div className="grid-fluid-fill-[16.5rem] gap-3 2xl:gap-5 justify-items-center w-full">
            {[...Array(8)].map((e, i) => {
              return (
                <div id="init" role="status" className="card flex flex-col" key={i}>
                  <div className="card_banner animate-pulse bg-gray-400 "></div>
                  <div className="flex flex-1 flex-col justify-between h-full">
                    <div className="p-5 pb-6 flex flex-col justify-center gap-2 text-center">
                      <h1 className="text-2xl min-h-[64px] grid place-items-center">Loading...</h1>
                      <p className="line-clamp-5">
                        <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
                          <div className="flex items-center w-full">
                            <div className="h-2.5 bg-gray-400 rounded-full w-32"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-24"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-full"></div>
                          </div>
                          <div className="flex items-center w-full max-w-[480px]">
                            <div className="h-2.5 bg-gray-400 rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-24"></div>
                          </div>
                          <div className="flex items-center w-full max-w-[400px]">
                            <div className="h-2.5 bg-gray-400 rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-80"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-full"></div>
                          </div>
                          <div className="flex items-center w-full max-w-[480px]">
                            <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-24"></div>
                          </div>
                          <div className="flex items-center w-full max-w-[440px]">
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-32"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-24"></div>
                            <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-full"></div>
                          </div>
                          <div className="flex items-center w-full max-w-[360px]">
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-80"></div>
                            <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-full"></div>
                          </div>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </p>
                    </div>
                    <div className="w-full grid place-items-center justify-self-end">
                      <div className="learn_more text-white text-lg cursor-pointer">Learn More</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default loading;
