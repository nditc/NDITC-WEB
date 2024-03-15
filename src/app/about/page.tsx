import CommonPage from '../Components/CommonPage/CommonPage';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Timeline from '../Components/Timeline';
import Image from 'next/image';
import DataCard from '../Components/DataCard';
import { FaCode } from 'react-icons/fa6';
import { PiBagSimple } from 'react-icons/pi';
import Link from 'next/link';
const Sections = [
  {
    heading: '',
    content: (
      <>
        <div className="flex gap-8 lg:flex-row flex-col mb-10 md:mb-16">
          <Image
            src="/About.jpg"
            alt="Image"
            className="rounded-xl object-cover w-full lg:max-w-[50%]"
            width={1920}
            height={1080}
          />
          <p className="flex-1">
            Notre Dame Information Technology Club (NDITC), a co-curricular activities club of the
            prestigious Notre Dame College, has started its journey on 2018, to promote and support
            learning and interaction within areas related to information systems and technology, to
            share new ideas and to encourage recreational activities in these areas. "Innovate and
            Encode Your Ideas" bearing this motto, the club has been established. Being the first
            club of Notre Dame College devoted to encourage the students to take part and make
            contribution to the ever evolving IT sector, NDITC is dedicated to set an example. The
            club aspires to encourage its members to discover their untapped zeal for information
            and technology. NDITC aims to give the necessary guidelines and opportunity and act as
            the leading light in spreading technological awareness among the pupils. Information and
            technology, with their own conundrum, are expected to create students who are up-to-date
            with the current world, being led by this sincere institution of knowledge. The club has
            taken the solemn oath to uphold the rich history of Notre Dame College through our
            activities and ignite the thirst for knowledge about the technology world within the
            students which, we believe, will construct the pathway towards a technologically
            advanced nation.
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl mb-7">
          Our<span className="text-blue-500"> Achievements</span>
        </h1>
        <div className="bg-white rounded-xl p-3 md:p-6 mb-10 md:mb-16">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8 mb-4 md:mb-8  ">
            <Timeline />
            <DataCard />
          </div>
          <div className=" flex flex-col md:flex-row gap-4 md:gap-8">
            <div className=" flex-1  flex-wrap gap-2  bg-white rounded-xl  flex justify-between items-center ">
              <h1 className="Bebas text-3xl md:text-4xl flex gap-2 items-center leading-[0.7_!important] align-middle">
                <PiBagSimple className={'text-blue-500 text-3xl h-10 w-10'} />
                Total Panelists <span className="text-blue-500 leading-[0.7_!important] ">19</span>
              </h1>
              <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
                <Link
                  href="/executive"
                  className="py-2 px-4 md:px-8 w-full sm:w-auto flex gap-3 items-center md:text-lg bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                  <PiBagSimple className={'w-8 h-8'} />
                  See Executives
                </Link>
                <Link
                  href="/developer"
                  className="py-2 px-4 md:px-8 w-full sm:w-auto flex gap-3 items-center md:text-lg bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                  <FaCode className={'w-8 h-8'} />
                  Explore Developers
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl mb-3">
          Our<span className="text-blue-500"> Motive</span>
        </h1>
        <p className="mb-10">
          Technology, the catalyst of modern human revolution, has rooted its megabytes, gigabytes
          and terabytes into every neuron and synapse of our human brains, conquering the whole
          world with its enigma in the process. In this age, where information has become synonymous
          to power; with technology as its driving force, the need for a club in Notre Dame College
          for the young tech enthusiasts couldn't be more. You asked for it. We made it happen.
          Notre Dame Information Technology Club (NDITC), a co-curricular activities club of the
          prestigious Notre Dame College, has started its journey on 2018, to promote and support
          learning and interaction within areas related to information systems and technology, to
          share new ideas and to encourage recreational activities in these areas. "Innovate and
          Encode Your Ideas" bearing this motto, the club has been established. Being the first club
          of Notre Dame College devoted to encourage the students to take part and make contribution
          to the ever evolving IT sector, NDITC is dedicated to set an example. The club aspires to
          encourage its members to discover their untapped zeal for information and technology.
          NDITC aims to give the necessary guidelines and opportunity and act as the leading light
          in spreading technological awareness among the pupils. Information and technology, with
          their own conundrum, are expected to create students who are up-to-date with the current
          world, being led by this sincere institution of knowledge. The club has taken the solemn
          oath to uphold the rich history of Notre Dame College through our activities and ignite
          the thirst for knowledge about the technology world within the students which, we believe,
          will construct the pathway towards a technologically advanced nation.
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
        icon={<FaRegQuestionCircle className={'w-16 h-16'} />}
        sections={Sections}
      />
    </div>
  );
};

export default About;
