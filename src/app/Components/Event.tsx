import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  imageURL: string;
}

const Event = ({ title, description, imageURL }: Props) => {
  return (
    <div id="init" className="card flex flex-col">
      <Image src={imageURL} alt={'Card Image'} className="card_banner" width={1024} height={512} />
      <div className="p-5 flex flex-col justify-center gap-2">
        <h1 className="text-3xl">{title}</h1>
        <p className="line-clamp-4">{description}</p>
      </div>
      <div className="w-full grid place-items-center">
        <button className="learn_more text-white text-lg">Learn More</button>
      </div>
    </div>
  );
};

export default Event;
