"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const timelineData = [
    {
      time1: "2018",
      time2: "01 Jan",
      title: "Our journey began",
      description:
        "Born in 2018, NDITC sprouted at Notre Dame College to nurture tech talent and bridge the gap between knowledge and innovation.",
      imgURL:
        "https://scontent.fdac27-1.fna.fbcdn.net/v/t39.30808-6/277797494_1145818566238927_8441761877643773829_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGK1e9kDrqw06-bQYm2hm0whL2V1B9eR8KEvZXUH15HwpHCPsjO6I13idH5zX4ZHNEZkd9RqrJqoQ4EFRfTqiN4&_nc_ohc=ZuhKcirwTYwAX8tnc-V&_nc_ht=scontent.fdac27-1.fna&oh=00_AfBCc-038LYzJNCpAHR0W8Px_NRnGLbsZi7ZKb8y4Xz9lg&oe=65905E56",
    },
    {
      time1: "2018",
      time2: "21 Mar",
      title: "College Robotics Contest Winner",
      description:
        "Our first achievement came when we won the 1st robotics competition for college organized by campusbd.net with a price of 1 lakh taka.",
      imgURL: "/Timeline.png",
    },
    {
      time1: "2018",
      time2: "23 Nov",
      title: "INIT 2018: Our very first national event",
      description:
        "We successfully organized our first event ``NDITC_init 2018`` with 11 different segments.",
      imgURL:
        "https://scontent.fdac27-1.fna.fbcdn.net/v/t1.6435-9/47213039_329585844528874_4244135400274132992_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=4dc865&_nc_eui2=AeFwIa948mxFTMCZ3HbRfc7kz9DPXwl7DyjP0M9fCXsPKNbdtH2ZhTEcQJlt9MriO0xpWcn1nU16dV94XsbpvIwa&_nc_ohc=JocY97aqD_cAX-_EV_O&_nc_ht=scontent.fdac27-1.fna&oh=00_AfBxTvZwYtMgzinsILtmKt4jWWjeUiLtHOPKyk7dQRoYnw&oe=65B31286",
    },
    {
      time1: "2019",
      time2: "09 Aug",
      title: "Tinker, First non-human member, was born",
      description: "The first robot of our club.",
      imgURL:
        "https://scontent.fdac142-1.fna.fbcdn.net/v/t1.6435-9/67924877_475030843317706_7015976674567127040_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeEJi_5q71EwMWYUZJF7qR6zNd8PHDgJC1A13w8cOAkLUAnzBup2clzSbhA_Ky8G1dimeMF9tJRbDQCIDg8cOLai&_nc_ohc=xDi21Cw1pTQAX_qDZad&_nc_ht=scontent.fdac142-1.fna&oh=00_AfCSu7MCg5MsRUN_XDRbu4gKvzhPaV5Xw2x6Aj-c2_sm-Q&oe=65B31D8A",
    },
    {
      time1: "2023",
      time2: "03 Apr",
      title: "Our AI project, EVYA.AI",
      description:
        "Our R&D team developed a Face Recognition application for our AI project named ‘EVYA.AI’ using the Python programming language.",
      imgURL:
        "https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/339662794_548865080666633_4038810144068896006_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFmlK4cq0VMSszociTyzLI7P34C8qT6Gv4_fgLypPoa_uK6Ku4-K8z3lOMmyYKRdXBQAfJ1Q50E7tcg5kslAAQB&_nc_ohc=9yGhqZFUf2AAX-hQEsP&_nc_ht=scontent.fdac27-2.fna&oh=00_AfCPQYTNW770U-2lr7c7AHLR9UsBKcSPM6xU8G5Lnq23sw&oe=65918F2B",
    },
    {
      time1: "2023",
      time2: "16 May",
      title: "Publishing First Monthly Newsletter",
      description:
        "In order to keep ourselves updated about our club activities, trending tech stories and sharing resources, we published our first monthly newsletter ``Code Compass``.",
      imgURL:
        "https://scontent.fdac27-1.fna.fbcdn.net/v/t39.30808-6/347107110_194740690126915_4846416508705261757_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEXgqMP5010SUC_3hh6STV_KKCGAkiT4GgooIYCSJPgaDQeuy1j0L4RnPMFo4ml6qChX3JC132TVDzQDR4h_t7i&_nc_ohc=8kghu0i0yfQAX8603Zq&_nc_ht=scontent.fdac27-1.fna&oh=00_AfCagmdVkO1vBHYk5iMd32lt6WH3JS4rg5Xxi1yOshrmYQ&oe=659132AF",
    },
    {
      time1: "2023",
      time2: "15 Jun",
      title: "Official Android app was launched",
      description:
        "We published an android application to attend many club purposes.",
      imgURL:
        "https://scontent.fdac27-1.fna.fbcdn.net/v/t39.30808-6/356406063_872423734275826_1932514875199257554_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEOYKVOfHN7myDg7PJQaMmRhsjmmQ620SaGyOaZDrbRJpemk_iV9UnGp73UnmdVjS-QE1PkctiAIOqoNjIpBNYp&_nc_ohc=LQ7iP_M8fooAX-vSKN4&_nc_ht=scontent.fdac27-1.fna&oh=00_AfBtlBSbWtEVDyA6sv9Xch_9ilwweLXrM_KNKVoLXQe34Q&oe=65903566",
    },
    {
      time1: "2023",
      time2: "29 Nov",
      title: "First wall magazine",
      description:
        "We launched our first wall magazine at the fresher's ceremony",
      imgURL:
        "https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/407638320_982471246604407_6908868430944244848_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeG7Dj4W90EM9OVlCH2LqCd821v2VvLcnfnbW_ZW8tyd-YeSQ9eiH0IqIOyZe_0tHe0uqY_cF5XVRn9dEAHaDune&_nc_ohc=XJMpR7rKytgAX8Qm-1W&_nc_ht=scontent.fdac27-2.fna&oh=00_AfA08UDB0cUeCEe1AAM5zB_v3WWFzPyOLbVncQCss-Kerg&oe=65903D21",
    },
  ];

  const [currentTitle, setCurrentTitle] = useState(timelineData[0].title);

  const [currentDescription, setCurrentDescription] = useState(
    timelineData[0].description
  );

  const [currentImage, setCurrentImage] = useState(timelineData[0].imgURL);

  const setCurrentData = (i: number) => {
    setSelectedIndex(i);
  };

  useEffect(() => {
    setCurrentTitle(timelineData[selectedIndex].title);
    setCurrentDescription(timelineData[selectedIndex].description);
    setCurrentImage(timelineData[selectedIndex].imgURL);
  }, [selectedIndex]);

  return (
    <section className="h-96 w-full mt-10 mb-32 px-10 md:px-32 flex justify-center">
      <div className="flex gap-5">
        <div className="h-full flex flex-col flex-1 justify-center gap-5">
          {timelineData.map((e, i) => {
            return (
              <Time
                time1={e.time1}
                time2={e.time2}
                index={i}
                current={selectedIndex == i}
                setCurrentAsSelected={setCurrentData}
                key={i}
              />
            );
          })}
        </div>
        <div className="w-1 h-full bg-gray-400 rounded-3xl gradient-mask-t-90-d" />
      </div>

      <div className="flex-[10] flex justify-center items-center relative">
        <MdKeyboardArrowUp
          onClick={() => {
            if (selectedIndex > 0) {
              setSelectedIndex(selectedIndex - 1);
            }
          }}
          className={`w-10 h-10 cursor-pointer absolute -top-16 transition-all ${
            selectedIndex > 0
              ? "scale-110 hover:scale-150"
              : "text-gray-500 scale-90"
          }`}
        />
        <MdKeyboardArrowDown
          onClick={() => {
            if (selectedIndex < timelineData.length - 1) {
              setSelectedIndex(selectedIndex + 1);
            }
          }}
          className={`w-10 h-10 cursor-pointer absolute -bottom-16 transition-all ${
            selectedIndex < timelineData.length - 1
              ? "scale-110 hover:scale-150"
              : "text-gray-500 scale-90"
          }`}
        />
        <div className="h-[90%] w-[90%] rounded-xl shadow-[020px_20px_20px_10px_#00000024] flex flex-col md:flex-row items-center justify-center gap-5 px-[1rem]">
          <div className="gap-5 flex-col">
            <h1 className="text-3xl md:text-5xl">{currentTitle}</h1>
            <p>{currentDescription}</p>
          </div>
          <Image
            src={currentImage}
            alt="Image"
            className="w-full h-[90%] rounded-[.75rem] object-cover"
            width={720}
            height={720}
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;

const Time = ({
  time1,
  time2,
  index,
  current,

  setCurrentAsSelected,
}: {
  time1: string;
  time2: string;
  index: number;
  current: boolean;

  setCurrentAsSelected: (i: number) => void;
}) => {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        setCurrentAsSelected(index);
      }}
    >
      <div className="w-10">
        <h1
          className={`transition-all ${
            current ? "text-2xl" : "text-gray-400 text-xl"
          }`}
        >
          {time1}
        </h1>
        <h1
          className={`transition-all ${
            current ? "text-base" : "text-gray-400 text-sm"
          }`}
        >
          {time2}
        </h1>
      </div>

      <div
        className={`transition-all duration-300 w-5 h-5 rounded-full absolute bg-blue-500 z-10 left-[3.25rem] top-[50%] -translate-y-[50%] flex items-center justify-center shadow-[5px_5px_20px_10px_#00000024] ${
          current ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
  );
};
