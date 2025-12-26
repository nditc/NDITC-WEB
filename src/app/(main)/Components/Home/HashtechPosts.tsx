"use client";

import Image from "next/image";
import SnapScroller from "../SnapScroller";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Props {
  title: string;
  desc: string;
  redirectUrl: string;
}

// Each Card

const HashtechPost = async ({ title, desc, redirectUrl }: Props) => {
  let regex = /fbid=(\d+)&/;
  let imageCode = redirectUrl.match(regex);

  try {
    const res = await fetch(
      imageCode
        ? `https://hashtechimg.pythonanywhere.com/${imageCode[1]}?size=360`
        : "https://hashtechimg.pythonanywhere.com/874301847421348?size=360",
      { cache: "no-store" },
    );

    if (!res.ok) {
      return <div />;
    }

    const imgURL = await res.url;

    // const inView = useInView(ref, { once: true });
    return (
      <a
        href={redirectUrl}
        target="_blank"
        className={`group flex min-w-[290px] flex-col overflow-hidden rounded-xl border border-[#ffffff31] bg-[#ffffff25] shadow-xl backdrop-blur-md duration-1000 sm:flex-row`}
      >
        <img
          loading="lazy"
          src={imgURL}
          alt={"Image"}
          width={512}
          height={512}
          className="aspect-square w-full flex-1 object-cover sm:w-1/2"
        />
        <div className="flex flex-1 flex-col justify-center gap-3 p-5 py-5 text-left md:py-10 md:pb-7">
          <h1
            className={
              "break-words text-3xl text-gray-200 group-hover:text-white" + " "
            }
          >
            {title}
          </h1>
          <div
            className={
              "font-nunito text-base text-gray-300 transition group-hover:text-white"
            }
          >
            <div className="line-clamp-4 md:line-clamp-5">{desc}</div>
          </div>
          <p className="mb-3 font-extrabold text-gray-400 transition group-hover:text-white">
            Click to learn More{" "}
            <span className="inline-block text-2xl transition group-hover:translate-x-2">
              →
            </span>{" "}
          </p>
        </div>
      </a>
    );
  } catch (err) {
    console.error(err);
    return <div />;
  }
};

// Responsive Facebook Video Component
const ResponsiveFacebookVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeSrc, setIframeSrc] = useState(
    "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F516490874347622%2F&show_text=false&width=500&height=400&t=0",
  );
  const [iframeHeight, setIframeHeight] = useState(400);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Maintain 5:4 aspect ratio (matching original 500:400), but cap at reasonable sizes
        const height = Math.min(Math.round((width * 4) / 5), 600);
        const clampedWidth = Math.min(width, 550);

        setIframeHeight(height);
        setIframeSrc(
          `https://www.facebook.com/plugins/video.php?height=${height}&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F516490874347622%2F&show_text=false&width=${clampedWidth}&height=${height}&t=0`,
        );
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <iframe
        src={iframeSrc}
        height={iframeHeight}
        width="100%"
        style={{ border: "none", overflow: "hidden" }}
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="w-full"
      ></iframe>
    </div>
  );
};

// Container Section

const HashtechPosts = () => {
  return (
    <section className="relative my-auto w-screen bg-[url(/image/hashtech_bg.png)] bg-cover bg-bottom bg-no-repeat">
      {/* <img className="w-full absolute left-0 top-0" src="/image/hashtech_bg.png" alt="" /> */}
      <section className="container my-auto flex flex-col items-center gap-4 py-8">
        <div className="z-10 flex flex-col items-center self-center text-white md:flex-row md:gap-2">
          <h1 className="text-[2.55rem] md:text-5xl">CHECK OUT OUR</h1>
          <img
            className="ml-2 h-20 md:h-[5rem]"
            src="/image/hashtech_logo.png"
            alt=""
          />
        </div>
        <div className="flex h-fit w-full max-w-[550px] flex-col items-center overflow-clip rounded-xl border border-gray-500 bg-white/10 shadow-lg shadow-black/50 backdrop-blur-md sm:max-w-[550px]">
          <div className="flex w-full select-none flex-col gap-4 bg-inherit p-4 sm:flex-row sm:gap-6 sm:p-5">
            <div className="flex flex-1 flex-col">
              <span className="Bebas text-xl font-light leading-tight text-white sm:text-2xl">
                Quantum Computer
              </span>
              <p className="break-words text-xs leading-tight text-gray-300 sm:text-sm">
                A non-profit production by NDITC Hashtech Team.
              </p>
            </div>

            <Link
              target="_blank"
              href={"https://web.facebook.com/reel/516490874347622"}
              className="Bebas relative flex h-fit w-full items-center justify-center rounded-lg border border-gray-600 bg-white/10 px-5 py-2 font-Bebas text-base font-medium text-white shadow-2xl transition-all hover:bg-blue-500 hover:text-white hover:shadow-blue-500 sm:w-36 sm:px-7 sm:text-lg"
            >
              <span className="relative z-10">LEARN MORE</span>
            </Link>
          </div>
          <ResponsiveFacebookVideo />
        </div>
        {/* <SnapScroller baseSize={475} gap={16} duration={2500}>
          <HashtechPost
            title="Nano Robotics"
            desc="Nanorobotics designs and controls ultra-small robots at the nanoscale for tasks such as delivering medication to specific cells or precisely handling materials."
            redirectUrl="https://www.facebook.com/photo/?fbid=1060979518753579&set=a.762348471950020"
          />
          <HashtechPost
            title="Li-Fi"
            desc="Li-Fi also known as light fidelity is a wireless communication technology that transmit utilizing LED. It is faster than Wi-Fi.
Benefits of Li-Fi :"
            redirectUrl="https://www.facebook.com/photo?fbid=1051372199714311&set=a.762348471950020"
          />
          <HashtechPost
            title="5G"
            desc="Even a decade ago, the term 'wireless mobile network' was unimaginable to us. Who else could have thought of connecting with anyone from anywhere on the globe and communicate"
            redirectUrl="https://www.facebook.com/photo?fbid=1046808550170676&set=a.762348471950020"
          />

          <HashtechPost
            title="Robotic Exoskeleton"
            desc="A robotic exoskeleton is a wearable device that boosts strength, endurance, and mobility by offering external support."
            redirectUrl="https://www.facebook.com/photo?fbid=1041937043991160&set=a.762348471950020"
          />

          <HashtechPost
            title="Quantum Computing"
            desc="Quantum computing is a revolutionary technology that utilizes quantum mechanics principles to process information"
            redirectUrl="https://www.facebook.com/photo?fbid=1037396531111878&set=a.762348471950020"
          />
        </SnapScroller> */}
      </section>
    </section>
  );
};

export default HashtechPosts;
