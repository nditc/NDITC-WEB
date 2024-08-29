import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import Ranking from "../Dashboard/Ranking";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="over relative flex min-h-screen w-full flex-col items-center justify-center pt-[90px] md:flex-row md:justify-between">
        <h1 className="w-fit text-center text-2xl font-medium tracking-wide md:hidden md:text-left lg:tracking-widest 2xl:text-3xl">
          Welcome to
        </h1>
        <div className="order-2 flex flex-col items-center gap-1 md:order-1 md:max-w-[40vw] md:items-start lg:max-w-[35vw]">
          <h1 className="hidden w-fit text-center text-2xl font-medium tracking-wide md:block md:text-left lg:tracking-widest 2xl:text-3xl">
            Welcome to
          </h1>
          <h1 className="mt-2 text-center text-4xl font-medium tracking-wide text-black md:mt-0 md:text-left md:text-5xl lg:tracking-widest 2xl:text-7xl">
            <span className="text-primary">FTMPC</span> 4.0
          </h1>

          <p className="Nunito mt-3 w-[85vw] break-words text-center text-base md:w-fit md:max-w-[90%] md:text-left 2xl:text-[1.375rem] 2xl:leading-8">
            Dive headfirst into the code arena for{" "}
            <span className="font-bold text-secondary">FREE!</span> NDITC&apos;s
            FTMPC 4.0 is your chance to clash with fellow tech minds. This
            contest throws down coding challenges that will transform you into a
            programming warrior.
          </p>
          <img
            src="/Images/deadline.svg"
            alt="dealine"
            className="mt-3 w-[90%] max-w-[350px]"
          />
          <Link
            href="/club/register"
            className="before:ease Bebas text-whiterounded-lg relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-primary bg-primary px-7 py-2 font-Bebas text-xl font-medium text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-secondary_light before:duration-300 hover:border-secondary_light hover:bg-zinc-700 hover:text-primary_dark hover:shadow-secondary_light hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-primary"
          >
            <span className="relative z-10">REGISTER NOW</span>
          </Link>
        </div>
        <Image
          src={"/Images/FTMPC-Banner.svg"}
          alt={"Image"}
          className="relative order-1 my-[4vh] w-[90%] max-w-[850px] object-contain xsm:w-[70%] md:order-2 md:mb-0 md:max-h-[70vh] md:w-[50%]"
          width={850}
          height={850}
        />
        {/* <img src="/Images/bg.png" className="absolute bottom-[-4vh] right-0 -z-10" alt="" /> */}
      </section>
      <Ranking />
    </>
  );
};

export default Hero;
