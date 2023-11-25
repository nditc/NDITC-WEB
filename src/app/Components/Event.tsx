import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageURL: string;
}

const Event = ({ title, description, imageURL }: Props) => {
  return (
    <div id="init" className="card flex flex-col">
      <Image
        src={imageURL}
        alt={"Card Image"}
        className="card_banner"
        width={1024}
        height={512}
      />
      <h1 className="text-3xl mt-3 mb-2 ml-5 mr-5">{title}</h1>
      <p className="line-clamp-4">{description}</p>
      <button className="learn_more text-white text-lg">Learn More</button>
    </div>
  );
};

export default Event;
