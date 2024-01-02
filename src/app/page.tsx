import Image from 'next/image';
import Contact from './Components/Contact';
import ActivityCards from './Components/ActivityCards';
import HashtechPosts from './Components/HashtechPosts';
import SnapScroller from './Components/Utilities/SnapScroller';
import Link from 'next/link';
import CodeCompass from './Components/NewsLAndApp';

export default function Home() {
  return (
    <main className="flex container mx-auto flex-col items-center justify-center bg-transparent">
      <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-0 pt-[75px] over">
        <div className="flex flex-col items-center md:items-start md:gap-1 order-2 md:order-1">
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
          <Link
            href="/about"
            className="Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-black text-white border-gray-600 hover:text-white hover:bg-zinc-700 rounded-lg"
          >
            LEARN MORE
          </Link>
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
          <div className="flex flex-col items-center gap-3 flex-1 hover:scale-110 transition-all">
            <Image width={100} height={100} src="/image/icon/ai.svg" alt="" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Artificial Intelligence
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 hover:scale-110 transition-all">
            <Image width={100} height={100} src="/image/icon/robot.svg" alt="" loading="lazy" />
            <p className="text-lg md:text-xl text-white text-cente font-lightr">
              Hardwares & Robotics
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 hover:scale-110 transition-all">
            <Image width={100} height={100} src="/image/icon/web_dev.svg" alt="" loading="lazy" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Website & Native App Development
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 hover:scale-110 transition-all">
            <Image width={100} height={100} src="/image/icon/cp.svg" alt="" loading="lazy" />
            <p className="text-lg md:text-xl text-white text-center font-light">
              Competitive Programming
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-1 hover:scale-110 transition-all">
            <Image width={100} height={100} src="/image/icon/gfx.svg" alt="" loading="lazy" />
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

        <SnapScroller baseSize={475} gap={16} duration={2500}>
          <HashtechPosts
            title="Firewall"
            desc="A security system set up on the network which monitors and controls incoming and outgoing traffic based on predetermined security protocols is called firewall..."
            imageURL="https://scontent.fdac142-1.fna.fbcdn.net/v/t39.30808-6/411683470_994353095416222_7206788424372546186_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zZ5u_yiF2iUAX8t6Ypu&_nc_oc=AQmYsb3uHQtRTLiAqJ-IfYqdv18tW5vyV4WUJAvybXJNK4pf8eaExigCDdYA1GD5KZQ&_nc_ht=scontent.fdac142-1.fna&oh=00_AfBZ1wv1XrFPRGitQn-UY5kdQRP7YMPF6tlWn-Ns8B7FRA&oe=658C0802"
            redirectUrl="https://www.facebook.com/photo/?fbid=994363988748466&set=a.762348471950020"
          />
          <HashtechPosts
            title="Google Gemini"
            desc="“Google Gemini” is a new advertising platform that integrates search and video ads into Google Play, allowing advertisers to promote mobile app installs and in-app actions."
            imageURL="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/409871839_988884939296371_726850100000577863_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=Quf5Qiu6fgYAX-s1Sol&_nc_ht=scontent-iad3-1.xx&oh=00_AfAvelqSmpLx7AciJ2CeG55tpb_-zDACkUD_qwNtlZLxmg&oe=6589178D"
            redirectUrl="https://www.facebook.com/photo?fbid=988884942629704&set=a.762348471950020"
          />

          <HashtechPosts
            title="Computer Architecture"
            desc="“Computer Architecture” is the design and structure of computer systems, encompassing the arrangement and interaction of various hardware components. This includes the central processing unit (CPU)..."
            imageURL="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/409502585_984963203021878_7547505903699746104_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_ohc=4RjZ02-ngmgAX84rzmO&_nc_ht=scontent-iad3-1.xx&oh=00_AfBA9mnf0ubRzkx8EhXJwh7fOxde7xMufI6NsnuVJebq_g&oe=658907D3"
            redirectUrl="https://www.facebook.com/photo?fbid=984987733019425&set=a.762348471950020"
          />

          <HashtechPosts
            title="Augmented Reality"
            desc="Augmented Reality (AR) is an innovative technology that superimposes digital content onto the real world, enhancing the user's perception of their environment."
            imageURL="https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/405030064_974777844040414_2375425671905176021_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=Jv6_3OXZqvQAX9pZaQ1&_nc_ht=scontent-iad3-2.xx&oh=00_AfA-Epsu8BSWKxuZXY5o3VYTusyROpseF_3cXstmjjVFpw&oe=6589AE1B"
            redirectUrl="https://www.facebook.com/photo/?fbid=974777847373747&set=a.762348471950020"
          />

          <HashtechPosts
            title="Malware"
            desc="Malware, also stands for “malicious software”, is a software that is intentionally created to harm or obtain unauthorized access to computer systems, networks."
            imageURL="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/402110429_970323207819211_7263427348214765051_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=OItL41E-YEUAX9hUKHB&_nc_ht=scontent-iad3-1.xx&oh=00_AfDmZndSFL2AK8WmofBL2e5YJtS7kiOtBIUkRZiMJxb71w&oe=65892DEA"
            redirectUrl="https://www.facebook.com/photo/?fbid=970339901150875&set=a.762348471950020"
          />
          <HashtechPosts
            title="NLP"
            desc="NLP stands for Natural Language Processing. It's a field of artificial intelligence (AI) that focuses on the interaction between computers and humans through natural language. The goal of NLP is to enable computers to understand, interpret, and generate human language in a valuable and meaningful way."
            imageURL="https://scontent.fdac142-1.fna.fbcdn.net/v/t39.30808-6/400035393_965244961660369_6724820738509894849_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=6KDsVckl_uAAX-ueNMm&_nc_ht=scontent.fdac142-1.fna&oh=00_AfBIhfib-ekoVU1BwCQWibjt2VRendRrl2Wg2b--FZSejA&oe=658CA285"
            redirectUrl="https://www.facebook.com/photo/?fbid=965835914934607&set=a.762348471950020"
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
              loading="lazy"
            />
            <h1 className="text-2xl 2xl:text-3xl px-3 text-center">
              GAIN EXPERIENCE BY CONTRIBUTING TO REAL-WORLD PROJECTS
            </h1>
            <p className="text-center text-base">
              Gain invaluable experience with NDITC by actively engaging in real-world projects like
              HashTech and Evya AI, shaping your practical expertise in the evolving tech sphere.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={'/Ellipse2.png'}
              alt={'Image'}
              width={150}
              height={150}
              className="hover:scale-110 transition-all"
              loading="lazy"
            />
            <h1 className="text-2xl  2xl:text-3xl px-3 text-center">
              EXPLORE THE LEARNING BASED CLUB JOURNEY WITH NDITC
            </h1>
            <p className="text-center text-base">
              Embark on an enriching learning journey with NDITC's workshops, seminars, and
              groundbreaking events like Thynk 2.0, fostering an immersive educational experience in
              the IT realm.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={'/Ellipse3.png'}
              alt={'Image'}
              width={150}
              height={150}
              className="hover:scale-110 transition-all"
              loading="lazy"
            />
            <h1 className="text-2xl  2xl:text-3xl px-3 text-center">
              NETWORK WITH PEERS AND MENTORS & SHOWCASE YOUR SKILLSET
            </h1>
            <p className="text-center text-base">
              Join NDITC to network, collaborate with peers and mentors, and exhibit your diverse
              skill set through initiatives like FTMPC 3.0, creating opportunities for professional
              growth and recognition.
            </p>
          </div>
        </div>
      </section>

      <CodeCompass />

      <Contact />
    </main>
  );
}
