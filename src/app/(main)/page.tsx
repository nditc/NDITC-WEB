import Image from "next/image";
import Contact from "./Components/Contact";
import ActivityCards from "./Components/ActivityCards";
import HashtechPosts from "./Components/HashtechPosts";
import SnapScroller from "./Components/SnapScroller";
import Link from "next/link";
import CodeCompass from "./Components/NewsLAndApp";
import FAQ from "./Components/FAQ";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      <section className="over relative flex min-h-screen w-full flex-col items-center justify-center pt-[75px] md:flex-row md:justify-between">
        <div className="order-2 flex flex-col items-center md:order-1 md:max-w-[40vw] md:items-start md:gap-1 lg:max-w-[35vw]">
          <h1 className="w-fit text-center text-5xl font-medium tracking-wide md:text-left lg:tracking-widest 2xl:text-6xl">
            JOIN THE
          </h1>
          <h1 className="text-center text-5xl font-medium tracking-wide md:text-left lg:tracking-widest 2xl:text-6xl">
            COMMUNITY OF
          </h1>
          <h1 className="text-center text-5xl font-medium tracking-wide text-blue-500 md:text-left lg:tracking-widest 2xl:text-6xl">
            TECH ENTHUSIASTS
          </h1>
          <p className="mt-3 w-[85vw] break-words text-center text-lg md:w-fit md:text-left 2xl:text-[1.375rem] 2xl:leading-8">
            Connect with like-minded individuals and expand your knowledge in
            computer, programming, robotics, and design. Let's be the best
            together
          </p>
          <Link
            href="/about"
            className="before:ease Bebas text-whiterounded-lg relative mb-2 me-2 mt-5 flex items-center justify-center overflow-hidden rounded-lg border border-gray-600 bg-black px-7 py-2 font-Bebas text-xl font-medium text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 focus:z-10 focus:ring-4 focus:ring-gray-700"
          >
            <span className="relative z-10">LEARN MORE</span>
          </Link>
        </div>
        <img
          src={"/BigImg-old.png"}
          alt={"Image"}
          className="relative order-1 aspect-square max-h-[87vh] max-w-[95vw] object-contain sm:max-w-[80vw] md:order-2 md:-ml-6 md:-mr-6 md:-mt-12 md:max-w-[55vw] md:object-right lg:mt-0 xl:ml-0 2xl:max-h-[82vh]"
          width={850}
          height={850}
        />
        <img
          src="/image/bg2.svg"
          className="absolute bottom-[-4vh] right-0 -z-10"
          alt=""
        />
      </section>

      <div className="mt-16 h-fit w-screen object-cover pb-16 text-center">
        <h1 className="mx-auto mb-5 md:mb-8">
          <span className="text-center text-4xl md:text-5xl">WE HAVE </span>{" "}
          <br className="inline md:hidden" />
          <span className="text-center text-4xl text-blue-500 md:text-5xl">
            DEPARTMENTS{" "}
          </span>{" "}
          <span className="text-center text-4xl md:text-5xl">ON </span>
        </h1>
        <div className="container flex flex-wrap items-stretch justify-between gap-4 md:gap-6">
          <div className="group relative z-10 flex min-w-[160px] flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-6 transition-all before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-blue-500 before:p-6 before:transition-all before:ease-in-out hover:border-blue-300 hover:text-white hover:before:scale-x-100">
            <div className="z-10 flex flex-1 flex-col items-center justify-center gap-3">
              <img
                className="w-[80px] group-hover:brightness-0 group-hover:invert md:w-[100px]"
                width={100}
                height={100}
                src="/image/icon/ai.svg"
                alt=""
              />
              <p className="text-center text-lg">Artificial Intelligence</p>
            </div>
          </div>
          <div className="group relative z-10 flex min-w-[160px] flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-6 transition-all before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-blue-500 before:p-6 before:transition-all before:ease-in-out hover:border-blue-300 hover:text-white hover:before:scale-x-100">
            <div className="z-10 flex flex-1 flex-col items-center justify-center gap-3">
              <img
                className="w-[80px] group-hover:brightness-0 group-hover:invert md:w-[100px]"
                width={100}
                height={100}
                src="/image/icon/robot.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-center text-lg">Hardwares & Robotics</p>
            </div>
          </div>
          <div className="group relative z-10 flex min-w-[160px] flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-6 transition-all before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-blue-500 before:p-6 before:transition-all before:ease-in-out hover:border-blue-300 hover:text-white hover:before:scale-x-100">
            <div className="z-10 flex flex-1 flex-col items-center justify-center gap-3">
              <img
                className="w-[80px] group-hover:brightness-0 group-hover:invert md:w-[100px]"
                width={100}
                height={100}
                src="/image/icon/web_dev.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-center text-lg">
                Website & Native App Development
              </p>
            </div>
          </div>
          <div className="group relative z-10 flex min-w-[160px] flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-6 transition-all before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-blue-500 before:p-6 before:transition-all before:ease-in-out hover:border-blue-300 hover:text-white hover:before:scale-x-100">
            <div className="z-10 flex flex-1 flex-col items-center justify-center gap-3">
              <img
                className="w-[80px] group-hover:brightness-0 group-hover:invert md:w-[100px]"
                width={100}
                height={100}
                src="/image/icon/cp.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-center text-lg">Competitive Programming</p>
            </div>
          </div>
          <div className="group relative z-10 flex min-w-[160px] flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-6 transition-all before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-blue-500 before:p-6 before:transition-all before:ease-in-out hover:border-blue-300 hover:text-white hover:before:scale-x-100">
            <div className="z-10 flex flex-1 flex-col items-center justify-center gap-3">
              <img
                className="w-[80px] group-hover:brightness-0 group-hover:invert md:w-[100px]"
                width={100}
                height={100}
                src="/image/icon/gfx.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-center text-lg">
                Graphics Designing & Article
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative my-auto w-screen bg-[url(/image/hashtech_bg.png)] bg-cover bg-bottom bg-no-repeat">
        {/* <img className="w-full absolute left-0 top-0" src="/image/hashtech_bg.png" alt="" /> */}
        <section className="container my-auto flex flex-col items-center">
          <div className="z-10 mt-8 flex flex-col items-center self-center text-white md:flex-row md:gap-2">
            <h1 className="text-[2.55rem] md:text-5xl">CHECK OUT OUR</h1>
            <img
              className="ml-2 h-16 md:h-[6.5rem]"
              src="/image/hashtech_logo.png"
              alt=""
            />
          </div>
          <SnapScroller baseSize={475} gap={16} duration={2500}>
            <HashtechPosts
              title="Nano Robotics"
              desc="Nanorobotics designs and controls ultra-small robots at the nanoscale for tasks such as delivering medication to specific cells or precisely handling materials."
              redirectUrl="https://www.facebook.com/photo/?fbid=1060979518753579&set=a.762348471950020"
            />
            <HashtechPosts
              title="Li-Fi"
              desc="Li-Fi also known as light fidelity is a wireless communication technology that transmit utilizing LED. It is faster than Wi-Fi.
Benefits of Li-Fi :"
              redirectUrl="https://www.facebook.com/photo?fbid=1051372199714311&set=a.762348471950020"
            />
            <HashtechPosts
              title="5G"
              desc="Even a decade ago, the term 'wireless mobile network' was unimaginable to us. Who else could have thought of connecting with anyone from anywhere on the globe and communicate"
              redirectUrl="https://www.facebook.com/photo?fbid=1046808550170676&set=a.762348471950020"
            />

            <HashtechPosts
              title="Robotic Exoskeleton"
              desc="A robotic exoskeleton is a wearable device that boosts strength, endurance, and mobility by offering external support."
              redirectUrl="https://www.facebook.com/photo?fbid=1041937043991160&set=a.762348471950020"
            />

            <HashtechPosts
              title="Quantum Computing"
              desc="Quantum computing is a revolutionary technology that utilizes quantum mechanics principles to process information"
              redirectUrl="https://www.facebook.com/photo?fbid=1037396531111878&set=a.762348471950020"
            />
          </SnapScroller>
        </section>
      </section>
      <div className="relative mt-16 w-screen">
        <section className="container relative flex w-full flex-col items-start justify-start md:gap-3">
          <div className="flex flex-col self-center md:flex-row md:gap-2">
            <h1 className="mx-auto text-center text-4xl text-blue-500 md:text-left md:text-5xl">
              OUR ACTIVITIES
            </h1>
            <h1 className="mx-auto text-center text-4xl md:text-left md:text-5xl">
              INCLUDE
            </h1>
          </div>
          <ActivityCards />
        </section>
      </div>

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
                exhibit your diverse skill set through initiatives like FTMPC
                3.0, creating opportunities for professional growth and
                recognition.
              </p>
            </div>
          </div>
        </section>
      </div>
      <FAQ />
      <CodeCompass />

      <Contact />
    </main>
  );
}
