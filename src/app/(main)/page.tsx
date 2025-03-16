import Contact from "./Components/Layout/Contact";
import ActivityCards from "./Components/Home/ActivityCards";
import HashtechPosts from "./Components/Home/HashtechPosts";
import CodeCompass from "./Components/NewsLAndApp";
import FAQ from "./Components/Home/FAQ";
import Hero from "./Components/Home/Hero";
import Departments from "./Components/Home/Departments";
import WhyNditc from "./Components/Home/WhyNditc";
import Upcoming from "./activities/_components/Upcoming";
import UpcomingEvents from "./activities/_components/UpcomingEvents";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      <Hero />
      <Departments />
      <HashtechPosts />
      <div className="mt-16 w-full">
        <UpcomingEvents />
      </div>
      <ActivityCards />
      {/* <FAQ /> */}
      <WhyNditc />
      <CodeCompass />
      <Contact />
    </main>
  );
}
