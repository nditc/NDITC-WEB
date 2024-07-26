import Image from "next/image";

interface Props {
  title: string;
  desc: string;
  redirectUrl: string;
}

async function getData(imageCode: any) {
  const res = await fetch(
    imageCode
      ? `https://hashtechimg.pythonanywhere.com/${imageCode[1]}?size=360`
      : "https://hashtechimg.pythonanywhere.com/874301847421348?size=360",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return "/Logo.png";
  } else {
    return res.url;
  }
}

const HashtechPosts = async ({ title, desc, redirectUrl }: Props) => {
  let regex = /fbid=(\d+)&/;
  let imageCode = redirectUrl.match(regex);

  let imgURL = "";

  try {
    imgURL = await getData(imageCode);
  } catch (error) {}

  // const inView = useInView(ref, { once: true });
  return (
    <a
      href={redirectUrl}
      target="_blank"
      className={`bg-[#ffffff25] backdrop-blur-md border-[#ffffff31] border group shadow-xl flex flex-col sm:flex-row rounded-xl duration-1000 overflow-hidden min-w-[290px]`}
    >
      <Image
        src={imgURL}
        alt={"Image"}
        width={512}
        height={512}
        className="w-full sm:w-1/2 aspect-square object-cover flex-1"
      />
      <div className="p-5 py-5 md:py-10 md:pb-7 flex-1 flex flex-col gap-3 text-left justify-center">
        <h1
          className={
            "group-hover:text-white text-gray-200 text-3xl  break-words" + " "
          }
        >
          {title}
        </h1>
        <div
          className={
            "font-nunito text-base transition group-hover:text-white text-gray-300"
          }
        >
          <div className="line-clamp-4 md:line-clamp-5">{desc}</div>
        </div>
        <p className="text-gray-400 font-extrabold transition group-hover:text-white  mb-3">
          Click to learn More{" "}
          <span className=" inline-block text-2xl transition group-hover:translate-x-2">
            →
          </span>{" "}
        </p>
      </div>
    </a>
  );
};

export default HashtechPosts;
