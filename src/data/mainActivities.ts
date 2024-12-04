export interface CardProps {
  title: string;
  href: string;
  desc: string;
  imgURL: string;
}

const mainActivities: CardProps[] = [
  {
    title: "National Level events and festivals",
    href: "event",
    desc: "NDITC hosts electrifying national events like FTMPC 3.0, INIT 3.0, and Thynk 2.0, pushing boundaries in technology engagement.",
    imgURL: "/image/activityCard/1.jpeg",
  },
  {
    title: "ReGular Workshop and seminar",
    href: "workshop",
    desc: "The club conducts diverse workshops, from cryptography to web development bootcamps, fostering continual learning and skill enhancement.",
    imgURL: "/image/activityCard/2.jpeg",
  },
  {
    title: "Research and Development based cloud projects",
    href: "project",
    desc: "NDITC innovates with HashTech, Evya AI, and other cloud-based projects, pioneering research and development in the IT domain.",
    imgURL: "/image/activityCard/3.jpeg",
  },
  {
    title: "Annual publication of the club",
    href: "publication",
    desc: "RECURSION 2019 stands as NDITC's yearly publication, showcasing insights, achievements, and contributions in the technology landscape.",
    imgURL: "/image/activityCard/4.jpeg",
  },
];

export default mainActivities;
