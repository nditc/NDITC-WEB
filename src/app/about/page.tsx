import CommonPage from '../Components/CommonPage/CommonPage';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Timeline from '../Components/Timeline';
import Image from 'next/image';
import DataCard from '../Components/DataCard';

const Sections = [
  {
    heading: '',
    content: (
      <>
        <div className="flex gap-8 lg:flex-row flex-col  mb-10">
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
        <h1 className="text-4xl md:text-5xl mb-5">
          Our<span className="text-blue-500"> Achievements</span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 mb-10">
          <Timeline />
          <DataCard />
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
