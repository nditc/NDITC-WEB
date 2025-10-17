"use client";

import Link from "next/link";
import { PiStudent } from "react-icons/pi";

const PartcipateButton = ({ id, isExternal, externalLink }: { id: string, isExternal: boolean, externalLink: string }) => {
  return (

    isExternal ?


    <Link
      href={externalLink}
      target="_blank"
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
    >
      <PiStudent className="h-7 w-7" />
      Participate
    </Link>

    :
    <Link
      href={`/club/participate/${id}`}
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
    >
      <PiStudent className="h-7 w-7" />
      Participate
    </Link>
  );
};

export default PartcipateButton;
