"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { FaCode } from "react-icons/fa6";

const DeveloperIcon = () => {
  const Route = usePathname();
  return (
    <Suspense>
      <Link
        href="/developer"
        title="Developers"
        className={`${Route.includes("club") ? "hidden" : ""} transition-all hover:scale-125`}
      >
        <FaCode className="h-7 w-7" />
      </Link>
    </Suspense>
  );
};

export default DeveloperIcon;
