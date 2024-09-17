import Image from "next/image";

const About = () => {
  return (
    <section
      className="relative my-auto w-screen bg-cover bg-bottom bg-no-repeat"
      id="about"
    >
      <section className="relative my-auto w-screen overflow-hidden bg-no-repeat backdrop-blur-lg">
        {" "}
        <img
          className="absolute -left-[1px] -right-[1px] top-0 -z-10 h-full w-[115vw] bg-[url(/image/club/lbg.jpg)] bg-cover bg-bottom"
          alt=""
        ></img>
        <section className="container my-auto flex flex-col items-center pb-12 pt-14">
          <h1 className="text-[2.55rem] text-white md:text-5xl">
            ABOUT <span className="text-secondary">Club Panel</span>
          </h1>

          <div className="Nunito mt-3 flex flex-col items-stretch gap-4 pb-2 text-base text-[#ffffffbe] lg:flex-row lg:gap-8 xl:text-lg">
            {/* <div className="grid h-[350px] w-full flex-1 place-items-stretch justify-items-center rounded-xl shadow lg:h-auto lg:w-1/2">
              <img
                className="mt-3 h-[350px] w-full rounded-xl object-cover md:mb-4 md:w-3/4 lg:h-auto lg:w-full"
                src="/image/club/abt.jpg"
                alt=""
              ></img>
            </div> */}
            <div className="mt-3 flex-1 pb-5 text-white">
              <p className="flex-1">
                Welcome to the Club Panel, your gateway to an engaging and
                interactive club experience! Our Club Panel offers a variety of
                features designed to enhance your participation and enjoyment
                within the club. <br></br>
                <br></br> Quizzes: Test your knowledge with our diverse range of
                quizzes, including Intra College Quiz, Intra Club Quiz, and Open
                for All Quiz. Challenge yourself and compete with others!
                <br></br>
                Profile System: Create and manage your personal profile, keeping
                track of your progress within the club.
                <br></br>
                Leaderboard: Track your performance and see how you rank against
                your peers with our dynamic points-based leaderboard.
                <br />
                <br /> Open to students from diverse educational backgrounds,
                including schools, colleges, and polytechnic institutes, this
                panel promises to be a transformative experience. Participants
                will engage in the art of Tech individually.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default About;
