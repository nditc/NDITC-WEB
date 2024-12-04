import CommonPage from "../Components/CommonPage/CommonPage";
import { FaRegQuestionCircle } from "react-icons/fa";
import Databox from "./_components/Databox";
import Hero from "./_components/Hero";
import Motive from "./_components/Motive";

const Sections = [
  {
    heading: "",
    content: (
      <>
        <Hero />
        <Databox />
        <Motive />
      </>
    ),
  },
];

const About = () => {
  return (
    <div>
      <CommonPage
        heading="About Us"
        icon={<FaRegQuestionCircle className={"h-16 w-16"} />}
        sections={Sections}
      />
    </div>
  );
};

export default About;
