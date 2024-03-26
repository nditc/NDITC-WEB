import Image from "next/image";
import Contact from "./Components/Contact";
import ActivityCards from "./Components/ActivityCards";
import HashtechPosts from "./Components/HashtechPosts";
import SnapScroller from "./Components/Utilities/SnapScroller";
import Link from "next/link";
import CodeCompass from "./Components/NewsLAndApp";

export default function Home() {
  return (
    <main className="flex container mx-auto flex-col items-center justify-center bg-transparent">
      <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-between items-center pt-[75px] over">
        <div className="flex flex-col md:max-w-[40vw] lg:max-w-[35vw] items-center md:items-start md:gap-1 order-2 md:order-1">
          <h1 className="tracking-wide lg:tracking-widest text-5xl 2xl:text-6xl w-fit  font-medium text-center md:text-left">
            JOIN THE
          </h1>
          <h1 className="tracking-wide lg:tracking-widest text-5xl 2xl:text-6xl  font-medium text-center md:text-left">
            COMMUNITY OF
          </h1>
          <h1 className="tracking-wide lg:tracking-widest text-5xl 2xl:text-6xl  font-medium text-center md:text-left text-blue-500">
            TECH ENTHUSIASTS
          </h1>
          <p className="mt-3 text-lg 2xl:text-[1.375rem]   2xl:leading-8  break-words w-[85vw] md:w-fit text-center md:text-left">
            Connect with like-minded individuals and expand your knowledge in
            computer, programming, robotics, and design. Let's be the best
            together
          </p>
          <Link
            href="/about"
            className="hover:border-blue-500 before:ease relative flex items-center justify-center  overflow-hidden shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-black text-white border-gray-600 hover:text-white hover:bg-zinc-700 rounded-lg"
          >
            <span className="relative z-10">LEARN MORE</span>
          </Link>
        </div>
        <Image
          src={"/BigImg-old.png"}
          alt={"Image"}
          className="relative aspect-square md:-mt-12 md:-ml-6 xl:ml-0 lg:mt-0 object-contain max-h-[87vh] md:object-right 2xl:max-h-[82vh] md:-mr-6 max-w-[95vw] sm:max-w-[80vw] md:max-w-[55vw] order-1 md:order-2"
          width={850}
          height={850}
        />
        <img
          src="/image/bg2.svg"
          className="absolute bottom-[-4vh] right-0 -z-10"
          alt=""
        />
      </section>

      <div className="w-screen h-fit mt-16 pb-16 object-cover text-center">
        <h1 className="mx-auto mb-5 md:mb-8 ">
          <span className="text-4xl md:text-5xl text-center">WE HAVE </span>{" "}
          <br className="inline md:hidden" />
          <span className="text-blue-500 text-4xl md:text-5xl text-center">
            DEPARTMENTS{" "}
          </span>{" "}
          <span className="text-4xl md:text-5xl text-center">ON </span>
        </h1>
        <div className="container items-stretch justify-between flex gap-4 md:gap-6 flex-wrap">
          <div className=" min-w-[160px] flex relative overflow-hidden z-10 before:z-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all border before:w-full before:p-6 before:absolute before:left-0 before:bottom-0 before:h-full before:bg-blue-500 before:origin-left  before:ease-in-out  border-gray-200 hover:border-blue-300 flex-col justify-center items-center gap-3 flex-1  hover:text-white group cursor-pointer bg-gray-100 p-6 rounded-xl transition-all">
            <div className="z-10 justify-center items-center gap-3 flex flex-1  flex-col">
              <Image
                className="w-[80px] md:w-[100px] group-hover:brightness-0 group-hover:invert"
                width={100}
                height={100}
                src="/image/icon/ai.svg"
                alt=""
              />
              <p className="text-lg text-center">Artificial Intelligence</p>
            </div>
          </div>
          <div className=" min-w-[160px] flex relative overflow-hidden z-10 before:z-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all border before:w-full before:p-6 before:absolute before:left-0 before:bottom-0 before:h-full before:bg-blue-500 before:origin-left  before:ease-in-out  border-gray-200 hover:border-blue-300 flex-col justify-center items-center gap-3 flex-1  hover:text-white group cursor-pointer bg-gray-100 p-6 rounded-xl transition-all">
            <div className="z-10 justify-center items-center gap-3 flex flex-1  flex-col">
              <Image
                className="w-[80px] md:w-[100px] group-hover:brightness-0 group-hover:invert"
                width={100}
                height={100}
                src="/image/icon/robot.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-lg text-center">Hardwares & Robotics</p>
            </div>
          </div>
          <div className=" min-w-[160px] flex relative overflow-hidden z-10 before:z-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all border before:w-full before:p-6 before:absolute before:left-0 before:bottom-0 before:h-full before:bg-blue-500 before:origin-left  before:ease-in-out  border-gray-200 hover:border-blue-300 flex-col justify-center items-center gap-3 flex-1  hover:text-white group cursor-pointer bg-gray-100 p-6 rounded-xl transition-all">
            <div className="z-10 justify-center items-center gap-3 flex flex-1  flex-col">
              <Image
                className="w-[80px] md:w-[100px] group-hover:brightness-0 group-hover:invert"
                width={100}
                height={100}
                src="/image/icon/web_dev.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-lg text-center ">
                Website & Native App Development
              </p>
            </div>
          </div>
          <div className=" min-w-[160px] flex relative overflow-hidden z-10 before:z-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all border before:w-full before:p-6 before:absolute before:left-0 before:bottom-0 before:h-full before:bg-blue-500 before:origin-left  before:ease-in-out  border-gray-200 hover:border-blue-300 flex-col justify-center items-center gap-3 flex-1  hover:text-white group cursor-pointer bg-gray-100 p-6 rounded-xl transition-all">
            <div className="z-10 justify-center items-center gap-3 flex flex-1  flex-col">
              <Image
                className="w-[80px] md:w-[100px] group-hover:brightness-0 group-hover:invert"
                width={100}
                height={100}
                src="/image/icon/cp.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-lg text-center ">Competitive Programming</p>
            </div>
          </div>
          <div className=" min-w-[160px] flex relative overflow-hidden z-10 before:z-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all border before:w-full before:p-6 before:absolute before:left-0 before:bottom-0 before:h-full before:bg-blue-500 before:origin-left  before:ease-in-out  border-gray-200 hover:border-blue-300 flex-col justify-center items-center gap-3 flex-1  hover:text-white group cursor-pointer bg-gray-100 p-6 rounded-xl transition-all">
            <div className="z-10 justify-center items-center gap-3 flex flex-1  flex-col">
              <Image
                className="w-[80px] md:w-[100px] group-hover:brightness-0 group-hover:invert"
                width={100}
                height={100}
                src="/image/icon/gfx.svg"
                alt=""
                loading="lazy"
              />
              <p className="text-lg text-center ">
                Graphics Designing & Article
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="w-screen bg-[url(/image/hashtech_bg.png)] bg-no-repeat bg-cover bg-bottom  relative my-auto">
        {/* <img className="w-full absolute left-0 top-0" src="/image/hashtech_bg.png" alt="" /> */}
        <section className="flex flex-col container items-center my-auto">
          <div className="flex flex-col text-white md:flex-row self-center md:gap-2 mt-8  items-center z-10">
            <h1 className="text-[2.55rem] md:text-5xl">CHECK OUT OUR</h1>
            <img
              className="h-16 md:h-[6.5rem] ml-2"
              src="/image/hashtech_logo.png"
              alt=""
            />
          </div>
          <SnapScroller baseSize={475} gap={16} duration={2500}>
            <HashtechPosts
              title="Independence Day"
              desc="Independence day is a momentous occasion celebrated
with great enthusiasm. Notre Dame Information
Technology Club"
              redirectUrl="https://www.facebook.com/photo/?fbid=1057840939067437&set=a.762348471950020"
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
              title="Women's Day"
              desc="As International Women's Day nears, the Notre Dame Information Technology Club acknowledges women's pivotal role in IT history"
              redirectUrl="https://www.facebook.com/photo?fbid=1045766416941556&set=a.762348471950020"
            />
            <HashtechPosts
              title="Robotic Exoskeleton"
              desc="A robotic exoskeleton is a wearable device that boosts strength, endurance, and mobility by offering external support."
              redirectUrl="https://www.facebook.com/photo?fbid=1041937043991160&set=a.762348471950020"
            />
          </SnapScroller>
        </section>
      </section>
      <div className="w-screen relative mt-16">
        <section className="flex flex-col md:gap-3 items-start justify-start w-full relative container">
          <div className="flex flex-col md:flex-row md:gap-2 self-center">
            <h1 className="text-center  mx-auto md:text-left text-4xl md:text-5xl text-blue-500">
              OUR ACTIVITIES
            </h1>
            <h1 className="text-center mx-auto md:text-left text-4xl md:text-5xl">
              INCLUDE
            </h1>
          </div>
          <ActivityCards />
        </section>
      </div>

      <div className="w-screen relative">
        <img
          className="absolute left-0 top-[20%] md:-top-1/2 -z-10 max-w-[750px] w-[125%] md:w-[80%]"
          src="/image/lbg.svg"
          alt=""
        />
        <section className="mt-8 container md:mt-16 flex flex-col items-center gap-7 relative  mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row gap-1">
            <h1 className="text-4xl md:text-5xl text-center">WHY YOU SHOULD</h1>
            <h1 className="text-blue-500 text-4xl md:text-5xl text-center">
              JOIN NDITC?
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={"/Ellipse1.png"}
                alt={"Image"}
                width={150}
                height={150}
                className="hover:scale-110 transition-all"
                loading="lazy"
              />
              <h1 className="text-2xl 2xl:text-3xl px-3 text-center">
                GAIN EXPERIENCE BY CONTRIBUTING TO REAL-WORLD PROJECTS
              </h1>
              <p className="text-center text-base">
                Gain invaluable experience with NDITC by actively engaging in
                real-world projects like HashTech and Evya AI, shaping your
                practical expertise in the evolving tech sphere.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Image
                src={"/Ellipse2.png"}
                alt={"Image"}
                width={150}
                height={150}
                className="hover:scale-110 transition-all"
                loading="lazy"
              />
              <h1 className="text-2xl  2xl:text-3xl px-3 text-center">
                EXPLORE THE LEARNING BASED CLUB JOURNEY WITH NDITC
              </h1>
              <p className="text-center text-base">
                Embark on an enriching learning journey with NDITC's workshops,
                seminars, and groundbreaking events like Thynk 2.0, fostering an
                immersive educational experience in the IT realm.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Image
                src={"/Ellipse3.png"}
                alt={"Image"}
                width={150}
                height={150}
                className="hover:scale-110 transition-all"
                loading="lazy"
              />
              <h1 className="text-2xl  2xl:text-3xl px-3 text-center">
                NETWORK WITH PEERS AND MENTORS & SHOWCASE YOUR SKILLSET
              </h1>
              <p className="text-center text-base ">
                Join NDITC to network, collaborate with peers and mentors, and
                exhibit your diverse skill set through initiatives like FTMPC
                3.0, creating opportunities for professional growth and
                recognition.
              </p>
            </div>
          </div>
        </section>
      </div>

      <CodeCompass />

      <Contact />
    </main>
  );
}
