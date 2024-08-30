/* eslint-disable jsx-a11y/img-redundant-alt */

import Setter from "@/app/club/Components/Home/Setter";
import Hero from "@/app/club/Components/Home/Hero";
import About from "@/app/club/Components/Home/About";
import Rules from "@/app/club/Components/Home/Rules";
import Contact from "@/app/club/Components/Contact";
import FAQ from "@/app/club/Components/Home/FAQ";

const page = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center">
        <Hero />
        <About />
        <Rules />
        <Setter />
        <FAQ />
        <Contact />
      </main>
    </>
  );
};

export default page;