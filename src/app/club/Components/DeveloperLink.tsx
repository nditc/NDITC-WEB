"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCodeSlash } from "react-icons/io5";

const DeveloperLink = () => {
  const Route = usePathname();
  return (
    <Link
      href="/club/developer"
      className={`${Route.includes("club") ? "" : "hidden"} fixed bottom-6 right-3 flex items-end justify-end rounded-full bg-secondary text-white shadow-[-5px_5px_20px_10px_#00000024]`}
    >
      <IoCodeSlash className="m-3 h-6 w-6 transition hover:rotate-90" />
    </Link>
  );
};

export default DeveloperLink;
