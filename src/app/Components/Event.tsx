import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  imageURL: string;
  descURL: string;
  type: string;
}

const Event = ({ title, imageURL, descURL, type }: Props) => {
  const [desc, setDesc] = useState<string | undefined>();
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/description/${encodeURIComponent(descURL)}`);
      const data = await res.json();
      setDesc(data?.description);
    })();
  }, [descURL]);
  return (
    <div id="init" className="card flex flex-col">
      <Image src={imageURL} alt={'Card Image'} className="card_banner" width={1024} height={512} />
      <div className="flex flex-1 flex-col justify-between h-full">
        <div className="p-5 pb-6 flex flex-col justify-center gap-2 text-center">
          <h1 className="text-2xl min-h-[64px] grid place-items-center">{title}</h1>
          <p className="line-clamp-4">{desc}</p>
        </div>
        <div className="w-full grid place-items-center justify-self-end">
          <Link
            className="learn_more text-white text-lg cursor-pointer"
            href={`/details/${encodeURIComponent(descURL)}/${type}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
