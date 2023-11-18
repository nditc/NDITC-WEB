import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageURL: string;
}

const Event = ({ title, description, imageURL }: Props) => {
  return (
    <div id="init" className="card font-Roboto flex flex-col">
      <Image
        src={imageURL}
        alt={"Card Image"}
        className="card_banner"
        width={1024}
        height={512}
      />
      <h4>{title}</h4>
      <p>{description}</p>
      <button className="learn_more">Learn More</button>
    </div>
  );
};

export default Event;
