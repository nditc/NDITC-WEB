/* eslint-disable jsx-a11y/img-redundant-alt */

import Setter from "@/app/club/Components/Home/Setter";
import Hero from "@/app/club/Components/Home/Hero";
import About from "@/app/club/Components/Home/About";
import Rules from "@/app/club/Components/Home/Rules";
import Contact from "@/app/club/Components/Contact";
import FAQ from "@/app/club/Components/Home/FAQ";
import { AuthContextProvider } from "./Components/Layout/AuthContextProvider";
import { UserDataContextProvider } from "./Components/Layout/UserDataProvider";

const page = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center">
        <AuthContextProvider>
          <UserDataContextProvider>
            <Hero />
            <About />
            <Rules />
            <Setter />
            <FAQ />
            <Contact />
          </UserDataContextProvider>
        </AuthContextProvider>
      </main>
    </>
  );
};

export default page;
