import Image from "next/image";

interface Props {
  title: string;
  date: string;
}

const BlogPost = ({ title, date }: Props) => {
  return (
    <div className="w-60 h-72 bg-[#2E2E2E] shadow-xl rounded">
      <Image
        src="/Ryzen.jpg"
        alt={"Image"}
        width={256}
        height={256}
        className="w-full"
      />
      <h1 className="p-1 font-Roboto font-medium text-sm w-[90%] break-words mt-1">
        {title}
      </h1>
      <p className="font-Roboto text-sm ml-1 mt-1 font-light">{date}</p>
    </div>
  );
};

export default BlogPost;
