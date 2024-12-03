const Loading = async () => {
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <div className="container relative flex flex-col items-center gap-10 bg-transparent py-10 pt-[81px]">
        <div className="w-screen bg-white shadow-xl">
          <div className="container flex animate-pulse flex-col items-center gap-0 pb-5 md:flex-row md:gap-5 md:pb-0">
            <div className="order-2 ml-1 flex w-full flex-1 flex-col gap-2 md:order-1 md:gap-3 md:py-8 2xl:gap-5">
              <div className="my-1 h-5 w-1/4 rounded-lg bg-gray-300"></div>

              <div className="h-12 w-1/2 rounded-lg bg-gray-300"></div>
              <div className="h-4 w-1/3 rounded-lg bg-gray-200"></div>
              <div className="h-4 w-[90%] rounded-lg bg-gray-300"></div>
              <div className="h-4 w-[90%] rounded-lg bg-gray-300"></div>
              <div className="h-12 w-1/3 rounded-lg bg-gray-300"></div>
            </div>

            <div className="order-1 mb-8 h-[300px] min-h-[300px] w-full flex-1 rounded-b-xl bg-gray-300 md:order-2 md:mb-0 md:h-[410px] md:min-h-[410px] md:rounded-none"></div>
          </div>
        </div>
        <div className="w-full animate-pulse self-start">
          <div className="my-4 h-4 w-full rounded-lg bg-gray-200"></div>
          <div className="my-4 h-4 w-full rounded-lg bg-gray-300"></div>
          <div className="my-4 h-4 w-full rounded-lg bg-gray-200"></div>
          <div className="my-4 h-4 w-full rounded-lg bg-gray-300"></div>
          <div className="my-4 h-4 w-full rounded-lg bg-gray-200"></div>
          <div className="my-4 h-4 w-full rounded-lg bg-gray-300"></div>
          <div className="my-4 h-4 w-full rounded-lg bg-gray-200"></div>
          <div className="my-4 h-4 w-1/3 rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
