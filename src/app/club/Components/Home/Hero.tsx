import RedirectButton from "./RedirectButton";

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
            <span className="text-primary">Club </span>Portal
          </h1>

          <p className="Nunito mt-3 w-[85vw] break-words text-center text-base md:w-fit md:max-w-[90%] 2xl:text-[1.375rem] 2xl:leading-8">
            Join the ultimate event experience at NDITC – where everyone is
            welcome to connect, create, and celebrate together!
          </p>

          <RedirectButton />
        </div>
        <img
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
