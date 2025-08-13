/* eslint-disable jsx-a11y/img-redundant-alt */

import Hero from "@/app/club/Components/Home/Hero";
import About from "@/app/club/Components/Home/About";
import Contact from "@/app/club/Components/Contact";
import FAQ from "@/app/club/Components/Home/FAQ";
import Ranking from "./Components/Dashboard/Ranking";

const page = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center">
        <Hero />
        <About />
        <Ranking />
        <FAQ />
        <Contact />
      </main>
    </>
  );
};

export default page;
