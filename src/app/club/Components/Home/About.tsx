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
            ABOUT <span className="text-secondary">FTMPC 4.0</span>
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
                Embarking on the journey of knowledge and innovation, Notre Dame
                Information Technology Club proudly presents the fourth
                installment of the prestigious Father Timm Memorial Programming
                Contest (FTMPC 4.0). Named in honour of the illustrious Father
                Richard William Timm, a luminary figure whose legacy spans the
                realms of academia, humanitarianism, and biodiversity
                exploration, this programming contest stands as a testament to
                his enduring influence. <br></br>
                <br></br> FTMPC 4.0 is not merely a competition but a
                celebration of intellect and creativity, aimed at nurturing the
                next generation of tech-savvy minds. With a nod to the timeless
                wisdom of Steve Jobs, we believe that coding transcends the
                boundaries of programming languages; it instills in individuals
                a profound ability to think critically, problem-solve, and
                innovate.
                <br />
                <br /> Open to students from diverse educational backgrounds,
                including schools, colleges, and polytechnic institutes, this
                contest promises to be a transformative experience. Participants
                will engage in the art of coding individually, employing
                languages such as Python, C, or C++ to tackle challenges
                inspired by the prestigious International Olympiad in
                Informatics (IOI) format.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default About;
