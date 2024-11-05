import React from "react";

const Hero = () => {
  return (
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
        activities club of the prestigious Notre Dame College, has started its
        journey on 2018, to promote and support learning and interaction within
        areas related to information systems and technology, to share new ideas
        and to encourage recreational activities in these areas. "Innovate and
        Encode Your Ideas" bearing this motto, the club has been established.
        Being the first club of Notre Dame College devoted to encourage the
        students to take part and make contribution to the ever evolving IT
        sector, NDITC is dedicated to set an example. The club aspires to
        encourage its members to discover their untapped zeal for information
        and technology. NDITC aims to give the necessary guidelines and
        opportunity and act as the leading light in spreading technological
        awareness among the pupils. Information and technology, with their own
        conundrum, are expected to create students who are up-to-date with the
        current world, being led by this sincere institution of knowledge. The
        club has taken the solemn oath to uphold the rich history of Notre Dame
        College through our activities and ignite the thirst for knowledge about
        the technology world within the students which, we believe, will
        construct the pathway towards a technologically advanced nation.
      </p>
    </div>
  );
};

export default Hero;
