import Contact from "./Components/Layout/Contact";
import ActivityCards from "./Components/Home/ActivityCards";
import HashtechPosts from "./Components/Home/HashtechPosts";
import CodeCompass from "./Components/NewsLAndApp";
import FAQ from "./Components/Home/FAQ";
import Hero from "./Components/Home/Hero";
import Departments from "./Components/Home/Departments";
import WhyNditc from "./Components/Home/WhyNditc";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      <Hero />
      <Departments />
      <HashtechPosts />
      <ActivityCards />
      <FAQ />
      <WhyNditc />
      <CodeCompass />
      <Contact />
    </main>
  );
}
