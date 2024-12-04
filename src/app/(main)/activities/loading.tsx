import { PiSmileySad } from "react-icons/pi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { GrWorkshop } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";
import "../styles/eventCard.css";

const loading = () => {
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img
        src="/image/bg2.svg"
        className="absolute right-0 top-1/4 z-0"
        alt=""
      ></img>
      <div className="container relative z-10 mb-5 flex flex-col items-center gap-5 bg-transparent py-10 pt-28 sm:gap-10 sm:pt-[7.5rem]">
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
          <div className="my-auto mb-5 flex flex-col justify-between gap-3 lg:mb-6 lg:flex-row lg:gap-8">
            <h1
              className="my-auto ml-1 items-center justify-center self-start text-[2.5rem] leading-none md:justify-start md:text-5xl"
              id="SCROLLHERE"
            >
              <span className="text-blue-500">ALL</span> EVENTS
            </h1>
            <div className="my-auto flex flex-wrap justify-between gap-2 sm:justify-start">
              <div
                className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
                  0
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                <BsCalendar2EventFill
                  className={
                    "h-[1.125rem] w-[1.125rem] " +
                    (0 ? "text-blue-200" : "text-blue-500")
                  }
                />
                Events
              </div>
              <div
                className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
                  0
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                <GrWorkshop
                  className={
                    "h-[1.125rem] w-[1.125rem] " +
                    (0 ? "text-blue-200" : "text-blue-500")
                  }
                />
                Workshop
              </div>
              <div
                className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
                  0
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                <FaProjectDiagram
                  className={
                    "h-[1.125rem] w-[1.125rem] " +
                    (0 ? "text-blue-200" : "text-blue-500")
                  }
                />
                Projects
              </div>
              <div
                className={`-gray-300 flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 active:outline-none sm:basis-auto sm:shadow-lg md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
                  0
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                <BiSolidBook
                  className={
                    "h-[1.125rem] w-[1.125rem] " +
                    (0 ? "text-blue-200" : "text-blue-500")
                  }
                />
                Publication
              </div>
            </div>
          </div>

          <div className="w-full justify-items-center gap-3 grid-fluid-fill-[16.5rem] 2xl:gap-5">
            {[...Array(8)].map((e, i) => {
              return (
                <div
                  id="init"
                  role="status"
                  className="card flex flex-col"
                  key={i}
                >
                  <div className="card_banner animate-pulse bg-gray-400"></div>
                  <div className="flex h-full flex-1 flex-col justify-between">
                    <div className="flex flex-col justify-center gap-2 p-5 pb-6 text-center">
                      <h1 className="grid min-h-[64px] place-items-center text-2xl">
                        Loading...
                      </h1>
                      <p className="line-clamp-5">
                        <div
                          role="status"
                          className="max-w-lg animate-pulse space-y-2.5"
                        >
                          <div className="flex w-full items-start">
                            <div className="h-2.5 w-32 rounded-full bg-gray-400"></div>
                            <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-500"></div>
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-500"></div>
                          </div>
                          <div className="flex w-full max-w-[480px] items-start">
                            <div className="h-2.5 w-full rounded-full bg-gray-400"></div>
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-500"></div>
                            <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-500"></div>
                          </div>
                          <div className="flex w-full max-w-[400px] items-start">
                            <div className="h-2.5 w-full rounded-full bg-gray-400"></div>
                            <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-400"></div>
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-500"></div>
                          </div>
                          <div className="flex w-full max-w-[480px] items-start">
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-400"></div>
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-500"></div>
                            <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-500"></div>
                          </div>
                          <div className="flex w-full max-w-[440px] items-start">
                            <div className="ms-2 h-2.5 w-32 rounded-full bg-gray-500"></div>
                            <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-500"></div>
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-400"></div>
                          </div>
                          <div className="flex w-full max-w-[360px] items-start">
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-500"></div>
                            <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-400"></div>
                            <div className="ms-2 h-2.5 w-full rounded-full bg-gray-500"></div>
                          </div>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </p>
                    </div>
                    <div className="grid w-full place-items-center justify-self-end">
                      <div className="learn_more cursor-pointer text-lg text-white">
                        Learn More
                      </div>
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
