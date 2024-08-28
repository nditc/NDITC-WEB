import Image from "next/image";

const About = () => {
  return (
    <section
      className="w-screen bg-no-repeat bg-cover bg-bottom  relative my-auto"
      id="about"
    >
      <section className="w-screen bg-image bg-no-repeat bg-cover bg-bottom  relative my-auto">
        {" "}
        <section className="flex flex-col container items-center pt-14 pb-12 my-auto">
          <h1 className="text-[2.55rem] md:text-5xl text-white ">
            ABOUT <span className="text-secondary">FTMPC 4.0</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-[#ffffffbe] text-base xl:text-lg Nunito mt-3  pb-2 items-stretch">
            <div className="w-full flex-1 lg:w-1/2 h-[350px] lg:h-auto rounded-xl shadow grid  justify-items-center place-items-stretch">
              <img
                className="w-full md:w-3/4 lg:w-full h-[350px] lg:h-auto object-cover  md:mb-4  rounded-xl mt-3"
                src="/Images/abt.jpg"
                alt=""
              ></img>
            </div>
            <div className="flex-1 pb-5 mt-3">
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
