import React from "react";

const WhyNditc = () => {
  return (
    <div className="relative w-screen overflow-x-clip">
      <img
        className="absolute left-0 top-[20%] -z-10 w-[125%] max-w-[750px] md:-top-1/2 md:w-[80%]"
        src="/image/lbg.svg"
        alt=""
      />
      <section className="container relative mb-10 mt-8 flex flex-col items-center gap-7 md:mb-20 md:mt-16">
        <div className="flex flex-col gap-1 md:flex-row">
          <h1 className="text-center text-4xl md:text-5xl">WHY YOU SHOULD</h1>
          <h1 className="text-center text-4xl text-blue-500 md:text-5xl">
            JOIN NDITC?
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          <div className="flex flex-col items-center gap-3">
            <img
              src={"/Ellipse1.png"}
              alt={"Image"}
              width={150}
              height={150}
              className="transition-all hover:scale-110"
              loading="lazy"
            />
            <h1 className="px-3 text-center text-2xl 2xl:text-3xl">
              GAIN EXPERIENCE BY CONTRIBUTING TO REAL-WORLD PROJECTS
            </h1>
            <p className="text-center text-base">
              Gain invaluable experience with NDITC by actively engaging in
              real-world projects like HashTech and Evya AI, shaping your
              practical expertise in the evolving tech sphere.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img
              src={"/Ellipse2.png"}
              alt={"Image"}
              width={150}
              height={150}
              className="transition-all hover:scale-110"
              loading="lazy"
            />
            <h1 className="px-3 text-center text-2xl 2xl:text-3xl">
              EXPLORE THE LEARNING BASED CLUB JOURNEY WITH NDITC
            </h1>
            <p className="text-center text-base">
              Embark on an enriching learning journey with NDITC's workshops,
              seminars, and groundbreaking events like Thynk 2.0, fostering an
              immersive educational experience in the IT realm.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img
              src={"/Ellipse3.png"}
              alt={"Image"}
              width={150}
              height={150}
              className="transition-all hover:scale-110"
              loading="lazy"
            />
            <h1 className="px-3 text-center text-2xl 2xl:text-3xl">
              NETWORK WITH PEERS AND MENTORS & SHOWCASE YOUR SKILLSET
            </h1>
            <p className="text-center text-base">
              Join NDITC to network, collaborate with peers and mentors, and
              exhibit your diverse skill set through initiatives like FTMPC 3.0,
              creating opportunities for professional growth and recognition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyNditc;
