import CommonPage from "../Components/CommonPage/CommonPage";
import { FaRegQuestionCircle } from "react-icons/fa";
import Timeline from "../Components/Timeline";
import Image from "next/image";
import DataCard from "../Components/DataCard";
import { FaCode } from "react-icons/fa6";
import { PiBagSimple } from "react-icons/pi";
import Link from "next/link";
const Sections = [
  {
    heading: "",
    content: (
      <>
        <div className="mb-10 flex flex-col gap-8 md:mb-16 lg:flex-row">
          <img
            src="/About.jpg"
            alt="Image"
            className="w-full rounded-xl object-cover lg:max-w-[50%]"
            width={1920}
            height={1080}
          />
          <p className="flex-1">
            Notre Dame Information Technology Club (NDITC), a co-curricular
            activities club of the prestigious Notre Dame College, has started
            its journey on 2018, to promote and support learning and interaction
            within areas related to information systems and technology, to share
            new ideas and to encourage recreational activities in these areas.
            "Innovate and Encode Your Ideas" bearing this motto, the club has
            been established. Being the first club of Notre Dame College devoted
            to encourage the students to take part and make contribution to the
            ever evolving IT sector, NDITC is dedicated to set an example. The
            club aspires to encourage its members to discover their untapped
            zeal for information and technology. NDITC aims to give the
            necessary guidelines and opportunity and act as the leading light in
            spreading technological awareness among the pupils. Information and
            technology, with their own conundrum, are expected to create
            students who are up-to-date with the current world, being led by
            this sincere institution of knowledge. The club has taken the solemn
            oath to uphold the rich history of Notre Dame College through our
            activities and ignite the thirst for knowledge about the technology
            world within the students which, we believe, will construct the
            pathway towards a technologically advanced nation.
          </p>
        </div>
        <h1 className="mb-7 text-4xl md:text-5xl">
          Our<span className="text-blue-500"> Achievements</span>
        </h1>
        <div className="mb-10 rounded-xl bg-white p-3 md:mb-16 md:p-6">
          <div className="mb-4 flex flex-col gap-4 md:mb-8 md:gap-8 lg:flex-row">
            <Timeline />
            <DataCard />
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex flex-1 flex-wrap items-center justify-between gap-2 rounded-xl bg-white">
              <h1 className="Bebas flex items-center gap-2 align-middle text-3xl leading-[0.7_!important] md:text-4xl">
                <PiBagSimple className={"h-10 w-10 text-3xl text-blue-500"} />
                Total Panelists{" "}
                <span className="leading-[0.7_!important] text-blue-500">
                  19
                </span>
              </h1>
              <div className="flex w-full flex-col gap-2 sm:w-auto md:flex-row">
                <Link
                  href="/executive"
                  className="flex w-full items-center gap-3 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 sm:w-auto md:px-8 md:text-lg"
                >
                  <PiBagSimple className={"h-8 w-8"} />
                  See Executives
                </Link>
                <Link
                  href="/developer"
                  className="flex w-full items-center gap-3 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 sm:w-auto md:px-8 md:text-lg"
                >
                  <FaCode className={"h-8 w-8"} />
                  Explore Developers
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h1 className="mb-3 text-4xl md:text-5xl">
          Our<span className="text-blue-500"> Motive</span>
        </h1>
        <p className="mb-10">
          Technology, the catalyst of modern human revolution, has rooted its
          megabytes, gigabytes and terabytes into every neuron and synapse of
          our human brains, conquering the whole world with its enigma in the
          process. In this age, where information has become synonymous to
          power; with technology as its driving force, the need for a club in
          Notre Dame College for the young tech enthusiasts couldn't be more.
          You asked for it. We made it happen. Notre Dame Information Technology
          Club (NDITC), a co-curricular activities club of the prestigious Notre
          Dame College, has started its journey on 2018, to promote and support
          learning and interaction within areas related to information systems
          and technology, to share new ideas and to encourage recreational
          activities in these areas. "Innovate and Encode Your Ideas" bearing
          this motto, the club has been established. Being the first club of
          Notre Dame College devoted to encourage the students to take part and
          make contribution to the ever evolving IT sector, NDITC is dedicated
          to set an example. The club aspires to encourage its members to
          discover their untapped zeal for information and technology. NDITC
          aims to give the necessary guidelines and opportunity and act as the
          leading light in spreading technological awareness among the pupils.
          Information and technology, with their own conundrum, are expected to
          create students who are up-to-date with the current world, being led
          by this sincere institution of knowledge. The club has taken the
          solemn oath to uphold the rich history of Notre Dame College through
          our activities and ignite the thirst for knowledge about the
          technology world within the students which, we believe, will construct
          the pathway towards a technologically advanced nation.
        </p>
      </>
    ),
  },
];

const About = () => {
  return (
    <div>
      <CommonPage
        heading="About Us"
        icon={<FaRegQuestionCircle className={"h-16 w-16"} />}
        sections={Sections}
      />
    </div>
  );
};

export default About;
