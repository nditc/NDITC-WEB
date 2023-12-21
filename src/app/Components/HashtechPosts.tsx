import Image from "next/image";

interface Props {
  title: string;
  desc: string;
  imageURL: string;
  redirectUrl: string;
}

const HashtechPosts = ({ title, desc, imageURL, redirectUrl }: Props) => {
  // const inView = useInView(ref, { once: true });
  return (
    <a
      href={redirectUrl}
      target="_blank"
      className={`bg-[#2E2E2E] shadow-xl flex flex-col sm:flex-row rounded-xl duration-1000 overflow-hidden min-w-[290px]`}
    >
      <Image
        src={imageURL}
        alt={"Image"}
        width={512}
        height={512}
        className="w-full sm:w-1/2 aspect-square object-cover  flex-1"
      />
      <div className="p-5 py-10 flex-1 flex flex-col gap-3 text-left">
        <h1
          className={
            "text-white font-Roboto text-xl font-medium  break-words" + " "
          }
        >
          {title}
        </h1>
        <div className={"font-Roboto text-base text-white font-light pb-2"}>
          <div className="line-clamp-5">{desc}</div>
        </div>
      </div>
    </a>
  );
};

export default HashtechPosts;
