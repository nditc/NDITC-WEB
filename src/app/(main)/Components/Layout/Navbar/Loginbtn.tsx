import React from "react";
 
import Link from "next/link";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
 
const Loginbtn = () => {  

  const { userAuth, loading: userLoading } = useAuthContext(); 

  return (
    <div className="z-50 mr-2 ml-0 lg:ml-8 mt-2 lg:mt-0 flex flex-1 items-center justify-center space-x-3 lg:order-2 lg:mr-0 lg:flex-none lg:grow-0 lg:basis-0 lg:space-x-0 rtl:space-x-reverse">
      <Link
        href="/club/login"
        className="before:ease relative mr-1 flex shrink-0 overflow-hidden rounded-lg border border-blue-600 bg-blue-500 px-4 py-2 text-center font-ShareTechTown text-sm font-medium  shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-blue-900 before:transition-all before:duration-300 hover:bg-blue-600-700 text-white hover:before:-rotate-180 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:flex lg:mr-3 lg:px-4"
      >
       
        <span className="relative z-10"> {(!userLoading && userAuth) ? "Profile" : "Login"} </span>
      </Link>

     
    </div>
  );
};

export default Loginbtn;
