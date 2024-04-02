import React from 'react';

const Loading = async () => {
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <div className="container pt-[81px] py-10 flex flex-col items-center gap-10 bg-transparent relative">
        <div className="w-screen bg-white shadow-xl ">
          <div className="container flex flex-col md:flex-row gap-0 md:gap-5 items-center pb-5 md:pb-0 animate-pulse">
            <div className="flex-1 ml-1 md:py-8 flex flex-col gap-2 md:gap-3 2xl:gap-5 w-full order-2 md:order-1">
              <div className="h-5 my-1 bg-gray-300 rounded-lg w-1/4"></div>

              <div className="h-12  bg-gray-300 rounded-lg w-1/2"></div>
              <div className="h-4  bg-gray-200 rounded-lg w-1/3"></div>
              <div className="h-4  bg-gray-300 rounded-lg w-[90%]"></div>
              <div className="h-4  bg-gray-300 rounded-lg w-[90%]"></div>
              <div className="h-12  bg-gray-300 rounded-lg w-1/3"></div>
            </div>

            <div className="flex-1 rounded-b-xl md:rounded-none mb-8 md:mb-0 h-[300px] min-h-[300px] md:h-[410px] md:min-h-[410px] w-full order-1 md:order-2 bg-gray-300"></div>
          </div>
        </div>
        <div className="self-start w-full animate-pulse">
          <div className="h-4 my-4 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-300 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-300 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-300 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-4 my-4 bg-gray-300 rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
