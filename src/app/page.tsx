import Image from "next/image";
import BlogPost from "./Components/BlogPost";
import Accordion from "./Components/Accordion";
import Contact from "./Components/Contact";

export default function Home() {
  const blogPosts: BlogPost[] = [
    {
      title: "AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G",
      date: "18h ago",
    },
    {
      title: "AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G",
      date: "18h ago",
    },
    {
      title: "AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G",
      date: "18h ago",
    },
    {
      title: "AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G",
      date: "18h ago",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-x-hidden">
      <section className="relative w-screen flex flex-col md:flex-row justify-between">
        <div className="flex flex-col p-10 md:mt-16 md:ml-10 items-center md:items-start">
          <h1 className="font-ShareTechTown text-5xl text-black font-medium text-center md:text-left">
            JOIN THE
          </h1>
          <h1 className="font-ShareTechTown text-5xl text-black font-medium text-center md:text-left">
            COMMUNITY OF
          </h1>
          <h1 className="font-ShareTechTown text-5xl text-black font-medium text-center md:text-left">
            TECH ENTHUSIASTS
          </h1>
          <p className="mt-3 text-sm text-black break-words w-[70vw] md:w-[30vw] text-center md:text-left">
            Connect with like-minded individuals and expand your knowledge in
            computer, programming, robotics, and design.
          </p>
          <button
            type="button"
            className="mt-5 py-2.5 font-ShareTechTown px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            OUR ACTIVITIES
          </button>
        </div>
        <Image
          src={"/BigImg.png"}
          alt={"Image"}
          className="relative md:bottom-14 md:left-10 z-40"
          width={660}
          height={660}
        />
      </section>
      <Image
        src="/BigImg2.png"
        alt={"Image"}
        width={256}
        height={256}
        className="absolute left-0 z-[-1] top-[50rem] md:top-[30rem]"
      />
      <section className="mt-16 flex w-screen flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Image src={"/Ellipse1.png"} alt={"Image"} width={100} height={100} />
          <h6 className="text-black font-bold text-lg text-center font-ShareTechTown">
            NETWORK WITH PEERS AND MENTORS.
          </h6>
          <p className="text-black text-center text-sm">
            TechClub provides a supportive community for members to network with
            peers with similar interests and connect with mentors who can guide
            them in their journey.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Image src={"/Ellipse2.png"} alt={"Image"} width={100} height={100} />
          <h6 className="text-black font-bold text-lg text-center font-ShareTechTown">
            NETWORK WITH PEERS AND MENTORS.
          </h6>
          <p className="text-black text-center text-sm">
            TechClub provides a supportive community for members to network with
            peers with similar interests and connect with mentors who can guide
            them in their journey.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Image src={"/Ellipse3.png"} alt={"Image"} width={100} height={100} />
          <h6 className="text-black font-bold text-lg text-center font-ShareTechTown">
            NETWORK WITH PEERS AND MENTORS.
          </h6>
          <p className="text-black text-center text-sm">
            TechClub provides a supportive community for members to network with
            peers with similar interests and connect with mentors who can guide
            them in their journey.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-7 items-center">
        <h1 className="text-black text-center md:text-left font-ShareTechTown font-bold text-3xl mt-36">
          CHECK OUT OUR BLOGS
        </h1>
        <div className="flex mt-5 flex-col md:flex-row gap-3">
          {blogPosts.map((e, i) => {
            return (
              <BlogPost title={e.title} date={e.date} index={i} key={e.title} />
            );
          })}
        </div>
      </section>
      <section className="flex flex-col gap-7 items-center">
        <h1 className="text-black font-ShareTechTown font-bold text-2xl md:text-3xl mt-36">
          WE ORGANIZE EVENTS LIKE...
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-[90vw] md:w-[30rem] h-56 bg-[#2E2E2E] rounded flex">
            <Image
              src="/Cover.png"
              alt={"Image"}
              width={256}
              height={256}
              className="flex-1"
            />
            <div className="flex-1 flex flex-col justify-center gap-3">
              <h1 className="p-1 font-Roboto font-bold text-sm w-[90%] break-words mt-1">
                Inter College Programming Contest
              </h1>
              <p className="font-Roboto text-sm ml-1 mt-1 font-light">
                19h ago
              </p>
            </div>
          </div>
          <div className="w-[90vw] md:w-[30rem] h-56 bg-[#2E2E2E] rounded flex">
            <Image
              src="/Cover.png"
              alt={"Image"}
              width={256}
              height={256}
              className="flex-1"
            />
            <div className="flex-1 flex flex-col justify-center gap-3">
              <h1 className="p-1 font-Roboto font-bold text-sm w-[90%] break-words mt-1">
                Inter College Programming Contest
              </h1>
              <p className="font-Roboto text-sm ml-1 mt-1 font-light">
                19h ago
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-screen mt-16">
        <Image
          src="/Sectors.png"
          alt={"Sectors Image"}
          width={2048}
          height={2048}
          className="w-full"
        />
      </div>
      <section className="md:self-start mt-20">
        <h1 className="text-black text-3xl font-ShareTechTown mb-5 text-center md:text-left">
          FREQUENTLY ASKED QUESTIONS...
        </h1>
        {<Accordion />}
      </section>
      <Contact />
    </main>
  );
}

interface BlogPost {
  title: string;
  date: string;
}
