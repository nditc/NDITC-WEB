import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import Ranking from "../Dashboard/Ranking";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="soloPassBg absolute left-0 top-0 -z-10 h-3/4 w-1/2"></div>
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center pt-[90px] text-center">
        <h1 className="w-fit text-center text-2xl font-medium tracking-wide md:hidden lg:tracking-widest 2xl:text-3xl">
          Welcome to
        </h1>
        <div className="order-2 flex flex-col items-center gap-1 md:order-1 md:max-w-[40vw] lg:max-w-[35vw]">
          <h1 className="hidden w-fit text-center text-2xl font-medium tracking-wide md:block lg:tracking-widest 2xl:text-3xl">
            Welcome to
          </h1>
          <h1 className="Inter mt-2 text-center text-4xl font-extrabold tracking-wide text-black md:mt-0 md:text-5xl 2xl:text-7xl">
            <span className="text-primary">Club </span>Panel
          </h1>

          <p className="Nunito mt-3 w-[85vw] break-words text-center text-base md:w-fit md:max-w-[90%] 2xl:text-[1.375rem] 2xl:leading-8">
            Join the ultimate event experience at FusionFest – where everyone is
            welcome to connect, create, and celebrate together!
          </p>

          <div className="flex">
            <Link
              href="/club/login"
              className="before:ease Bebas hover:border-bg-zinc-700 hover:shadow-bg-zinc-700 relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-300 bg-zinc-300 px-7 py-2 font-Bebas text-base font-medium text-black shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-zinc-700 before:duration-300 hover:border-zinc-700 hover:bg-zinc-700 hover:text-white hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-zinc-400 md:text-xl"
            >
              <span className="relative z-10">Login</span>
            </Link>
            <Link
              href="/club/register"
              className="before:ease text-whiterounded-lg Bebas relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-primary bg-primary px-7 py-2 font-Bebas text-base font-medium text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-secondary_light before:duration-300 hover:border-secondary_light hover:bg-zinc-300 hover:text-primary_dark hover:shadow-secondary_light hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-primary md:text-xl"
            >
              <span className="relative z-10">Register</span>
            </Link>
          </div>
        </div>
        <Image
          src={"/image/club/banner.png"}
          alt={"Image"}
          className="relative order-1 my-[4vh] w-[90%] max-w-[850px] object-contain xsm:w-[70%] md:order-2 md:mb-0 md:max-h-[70vh] md:w-[50%]"
          width={850}
          height={850}
        />
        {/* <img src="/Images/bg.png" className="absolute bottom-[-4vh] right-0 -z-10" alt="" /> */}
      </section>
      <img
        src="/image/bg2.svg"
        className="absolute bottom-[10vh] right-0 -z-10"
        alt=""
      />
    </>
  );
};

export default Hero;
