const loading = () => {
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <img
        src="/image/bg2.svg"
        className="absolute top-1/4 right-0 z-0"
        alt=""
      ></img>
      <div className="container pt-32 py-10  flex flex-col items-center gap-10 z-10 bg-transparent relative">
        <div className="flex gap-3 items-end justify-center self-start md:justify-start">
          <h1 className="text-3xl md:text-5xl pb-1">UPCOMING</h1>
          <h1 className="text-5xl md:text-7xl text-blue-500">EVENT</h1>
        </div>
        <section className="w-full ">
          <div className="w-full grid place-items-center h-60 bg-slate-400 rounded-xl text-slate-100 shadow-xl animate-pulse">
            <p className="Bebas text-2xl">Upcoming...</p>
          </div>
        </section>
        <section className="w-full">
          <div className="flex gap-3 mb-9 flex-wrap w-full">
            <div
              className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors
               `}
            >
              Events
            </div>
            <div
              className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors`}
            >
              Workshop
            </div>

            <div
              className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors`}
            >
              Projects
            </div>

            <div
              className={`bg-white  font-Nunito font-bold -gray-300 focus:outline-none active:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-xl text-sm px-5 py-2.5 me-2 mb-2 shadow-[5px_5px_21px_7px_#00000024] transition-colors`}
            >
              Publication
            </div>
          </div>
          <div className="flex gap-3 ml-1 mt-8 items-end justify-center self-start md:justify-start pb-7">
            <h1 className="text-3xl md:text-5xl text-blue-500">ALL</h1>
            <h1 className="text-3xl md:text-5xl">EVENTS</h1>
          </div>

          <div className="grid-fluid-fill-[16.5rem] gap-3 2xl:gap-5 justify-items-center w-full">
            {[...Array(4)].map((e, i) => {
              return (
                <div
                  id="init"
                  role="status"
                  className="card flex flex-col"
                  key={i}
                >
                  <div className="card_banner animate-pulse bg-gray-400 "></div>
                  <div className="flex flex-1 flex-col justify-between h-full">
                    <div className="p-5 pb-6 flex flex-col justify-center gap-2 text-center">
                      <h1 className="text-2xl min-h-[64px] grid place-items-center">
                        Loading...
                      </h1>
                      <p className="line-clamp-5">
                        <div
                          role="status"
                          className="space-y-2.5 animate-pulse max-w-lg"
                        >
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
                      <div className="learn_more text-white text-lg cursor-pointer">
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
