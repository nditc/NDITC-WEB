import Image from 'next/image';
import Contact from './Components/Contact';
import ActivityCards from './Components/ActivityCards';
import { GiRobotGolem, GiArtificialIntelligence } from 'react-icons/gi';
import { SiWebpack } from 'react-icons/si';
import { FaFileCode, FaPenNib } from 'react-icons/fa';
import HashtechPosts from './Components/HashtechPosts';
import SnapScroller from './Components/Utilities/SnapScroller';

export default function Home() {
  return (
    <main className="flex container mx-auto flex-col items-center justify-center bg-transparent">
      <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-0  pt-[75px] over">
        <div className="flex flex-col items-center md:items-start md:gap-2 order-2 md:order-1">
          <h1 className="tracking-widest text-5xl lg:text-6xl  font-medium text-center md:text-left">
            JOIN THE
          </h1>
          <h1 className="tracking-widest text-5xl lg:text-6xl  font-medium text-center md:text-left">
            COMMUNITY OF
          </h1>
          <h1 className="tracking-widest text-5xl lg:text-6xl  font-medium text-center md:text-left text-blue-600">
            TECH ENTHUSIASTS
          </h1>
          <p className="mt-3 text-lg 2xl:text-[1.375rem] break-words w-[70vw] md:w-[30vw] text-center md:text-left">
            Connect with like-minded individuals and expand your knowledge in computer, programming,
            robotics, and design. Let's be the best together
          </p>
          <button
            type="button"
            className="Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-black text-white border-gray-600 hover:text-white hover:bg-zinc-700 rounded-lg"
          >
            LEARN MORE
          </button>
        </div>
        <Image
          src={'/BigImg.png'}
          alt={'Image'}
          className="relative aspect-square object-contain max-h-[87.5vh] md:mr-[-10vw] max-w-[95vw] sm:max-w-[80vw] md:max-w-[55vw] order-1 md:order-2"
          width={850}
          height={850}
        />
        <img src="/image/bg2.svg" className="absolute bottom-[-4vh] right-0" alt="" />
      </section>

      <div className="w-screen h-fit mt-16 py-14 bg-sectorsBG object-cover text-center">
        <h1 className="text-5xl mb-12 text-white">WE HAVE LEARNING RESOURCES ON..</h1>
        <div className="container items-start justify-between flex gap-16 flex-wrap">
          <div className="flex flex-col items-center gap-3 flex-1 ">
            <Image width={100} height={100} src="/image/icon/ai.svg" alt="" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Artificial Intelligence
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 5">
            <Image width={100} height={100} src="/image/icon/robot.svg" alt="" />
            <p className="text-lg md:text-xl text-white text-cente font-lightr">
              Hardwares & Robotics
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 ">
            <Image width={100} height={100} src="/image/icon/web_dev.svg" alt="" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Website & Native App Development
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 ">
            <Image width={100} height={100} src="/image/icon/cp.svg" alt="" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Competitive Programming
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 ">
            <Image width={100} height={100} src="/image/icon/gfx.svg" alt="" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Graphics Designing & Article
            </p>
          </div>
        </div>
      </div>

      <section className="flex flex-col md:gap-7 items-center w-full">
        <div className="flex flex-col md:flex-row self-center md:gap-2 mt-12 md:mt-20  items-center">
          <h1 className="text-3xl md:text-5xl">CHECK OUT OUR</h1>

          <h1 className="text-3xl md:text-5xl text-blue-500">HASHTECH POSTS</h1>
        </div>

        <SnapScroller baseSize={475} gap={16}>
          <HashtechPosts
            title="Morbi habitasse felis nulla arcu, morbi ultricies."
            desc="Volutpat tellus porta felis, accumsan. Praesent quis amet et scelerisque dictum fringilla id."
            imageURL="/hashtech.png"
          />
          <HashtechPosts
            title="Morbi habitasse felis nulla arcu, morbi ultricies."
            desc="Volutpat tellus porta felis, accumsan. Praesent quis amet et scelerisque dictum fringilla id."
            imageURL="/hashtech.png"
          />
          <HashtechPosts
            title="Morbi habitasse felis nulla arcu, morbi ultricies."
            desc="Volutpat tellus porta felis, accumsan. Praesent quis amet et scelerisque dictum fringilla id."
            imageURL="/hashtech.png"
          />
          <HashtechPosts
            title="Morbi habitasse felis nulla arcu, morbi ultricies."
            desc="Volutpat tellus porta felis, accumsan. Praesent quis amet et scelerisque dictum fringilla id."
            imageURL="/hashtech.png"
          />
        </SnapScroller>
      </section>
      <div className="w-screen relative">
        <img
          className="absolute left-0 top-0 -z-10 max-w-[750px] w-[80%]"
          src="/image/lbg.svg"
          alt=""
        />
        <section className="flex flex-col md:gap-7 items-start justify-start w-full pb-5 relative container">
          <div className="flex flex-col md:flex-row md:gap-2 self-center mt-10 md:mt-20">
            <h1 className="text-center tracking-wider mx-auto md:text-left text-3xl md:text-5xl text-blue-500">
              OUR ACTIVITIES
            </h1>
            <h1 className="text-center mx-auto md:text-left text-3xl md:text-5xl">INCLUDE</h1>
          </div>
          <ActivityCards />
        </section>
      </div>

      <section className="mt-24 flex flex-col items-center gap-9">
        <div className="flex flex-col md:flex-row gap-1">
          <h1 className="text-3xl md:text-5xl text-center">WHY YOU SHOULD</h1>
          <h1 className="text-blue-500 text-3xl md:text-5xl text-center">JOIN NDITC?</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={'/Ellipse1.png'}
              alt={'Image'}
              width={150}
              height={150}
              className="hover:scale-110 transition-all"
            />
            <h1 className="text-2xl 2xl:text-3xl px-3 text-center">
              GAIN EXPERIENCE BY CONTRIBUTING TO REAL-WORLD PROJECTS
            </h1>
            <p className="text-center text-base">
              TechClub provides a supportive community for members to network with peers with
              similar interests and connect with mentors who can guide them in their journey.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={'/Ellipse2.png'}
              alt={'Image'}
              width={150}
              height={150}
              className="hover:scale-110 transition-all"
            />
            <h1 className="text-2xl  2xl:text-3xl px-3 text-center">
              EXPLORE THE LEARNING BASED CLUB JOURNEY WITH NDITC
            </h1>
            <p className="text-center text-base">
              TechClub provides a supportive community for members to network with peers with
              similar interests and connect with mentors who can guide them in their journey.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={'/Ellipse3.png'}
              alt={'Image'}
              width={150}
              height={150}
              className="hover:scale-110 transition-all"
            />
            <h1 className="text-2xl  2xl:text-3xl px-3 text-center">
              NETWORK WITH PEERS AND MENTORS & SHOWCASE YOUR SKILLSET
            </h1>
            <p className="text-center text-base">
              TechClub provides a supportive community for members to network with peers with
              similar interests and connect with mentors who can guide them in their journey.
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
