import Image from 'next/image';
import BlogPost from './Components/BlogPost';
import Accordion from './Components/Accordion';
import Contact from './Components/Contact';

export default function Home() {
  const blogPosts: BlogPost[] = [
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
  ];
  return (
    <main className="flex container mx-auto flex-col items-center justify-center">
      <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-0  pt-[75px]">
        <div className="flex flex-col items-center md:items-start md:gap-3 order-2 md:order-1">
          <h1 className="font-ShareTechTown text-4xl lg:text-5xl  font-medium text-center md:text-left">
            JOIN THE
          </h1>
          <h1 className="font-ShareTechTown text-4xl lg:text-5xl  font-medium text-center md:text-left">
            COMMUNITY OF
          </h1>
          <h1 className="font-ShareTechTown text-4xl lg:text-5xl  font-medium text-center md:text-left">
            TECH ENTHUSIASTS
          </h1>
          <p className="mt-3 text-base break-words w-[70vw] md:w-[30vw] text-center md:text-left">
            Connect with like-minded individuals and expand your knowledge in computer, programming,
            robotics, and design. Let's be the best together
          </p>
          <button
            type="button"
            className="mt-5 py-2.5 font-ShareTechTown px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            OUR ACTIVITIES
          </button>
        </div>
        <Image
          src={'/BigImg.png'}
          alt={'Image'}
          className="relative aspect-square object-contain max-h-[80vh] md:mr-[-10vw] max-w-[95vw] sm:max-w-[80vw] md:max-w-[55vw] order-1 md:order-2"
          width={850}
          height={850}
        />
        <img src="/image/bg2.svg" className="absolute bottom-[5vh] right-0" alt="" />
      </section>
      <Image
        src="/BigImg2.png"
        alt={'Image'}
        width={256}
        height={256}
        className="absolute left-0 z-[-1] top-[50rem] md:top-[30rem]"
      />
      <section className="mt-16 flex  flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={'/Ellipse1.png'}
            alt={'Image'}
            width={150}
            height={150}
            className="hover:scale-110 transition-all"
          />
          <h6 className=" font-bold text-xl text-center font-ShareTechTown">
            NETWORK WITH PEERS AND MENTORS.
          </h6>
          <p className="text-center text-base">
            TechClub provides a supportive community for members to network with peers with similar
            interests and connect with mentors who can guide them in their journey.
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
          <h6 className=" font-bold text-xl text-center font-ShareTechTown">
            NETWORK WITH PEERS AND MENTORS.
          </h6>
          <p className="text-center text-base">
            TechClub provides a supportive community for members to network with peers with similar
            interests and connect with mentors who can guide them in their journey.
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
          <h6 className=" font-bold text-xl text-center font-ShareTechTown">
            NETWORK WITH PEERS AND MENTORS.
          </h6>
          <p className="text-center text-base">
            TechClub provides a supportive community for members to network with peers with similar
            interests and connect with mentors who can guide them in their journey.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-7 items-start  justify-start w-full">
        <h1 className="text-center mx-auto md:text-left font-ShareTechTown font-bold text-3xl mt-36">
          CHECK OUT OUR BLOGS
        </h1>
        <div className="mt-5 w-full justify-items-center grid-fluid-fill-[15rem] items-center gap-8">
          {blogPosts.map((e, i) => {
            return <BlogPost title={e.title} date={e.date} index={i} key={i} />;
          })}
        </div>
      </section>
      <section className="flex flex-col gap-7 items-center">
        <h1 className=" font-ShareTechTown font-bold text-2xl md:text-3xl mt-36">
          WE ORGANIZE EVENTS LIKE...
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-[90vw] md:w-[30rem] h-56 bg-[#2E2E2E] rounded flex hover:scale-110 transition-all">
            <Image
              src="/Cover.png"
              alt={'Image'}
              width={256}
              height={256}
              className="flex-1 object-cover"
            />
            <div className="flex-1 flex flex-col justify-center gap-3">
              <h1 className="p-1 text-white font-Roboto font-bold text-base w-[90%] break-words mt-1">
                Inter College Programming Contest
              </h1>
              <p className="font-Roboto text-white text-base ml-1 mt-1 font-light">19h ago</p>
            </div>
          </div>
          <div className="w-[90vw] md:w-[30rem] h-56 bg-[#2E2E2E] rounded flex hover:scale-110 transition-all">
            <Image
              src="/Cover.png"
              alt={'Image'}
              width={256}
              height={256}
              className="flex-1 object-cover"
            />
            <div className="flex-1 flex flex-col justify-center gap-3">
              <h1 className="p-1 text-white font-Roboto font-bold text-base w-[90%] break-words mt-1">
                Inter College Programming Contest
              </h1>
              <p className="font-Roboto text-white text-base ml-1 mt-1 font-light">19h ago</p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-screen mt-16">
        <Image
          src="/Sectors.png"
          alt={'Sectors Image'}
          width={2048}
          height={2048}
          className="w-full"
        />
      </div>
      <section className="md:self-start mt-20">
        <h1 className=" text-3xl font-ShareTechTown mb-5 text-center md:text-left">
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
