import Image from "next/image";

interface Props {
  title: string;
  desc: string;
  redirectUrl: string;
}

const HashtechPosts = async ({ title, desc, redirectUrl }: Props) => {
  let regex = /fbid=(\d+)&/;
  let imageCode = redirectUrl.match(regex);

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
      <Image
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
};

export default HashtechPosts;
