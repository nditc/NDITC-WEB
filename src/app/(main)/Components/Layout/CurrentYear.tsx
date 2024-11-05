"use client";

import Link from "next/link";

const CurrentYear = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <span className="absolute bottom-3 left-3 mt-7 text-xs text-zinc-700 dark:text-zinc-400 sm:text-center md:text-xs">
      © {currentYear}{" "}
      <Link href="#" className="hover:underline">
        NDITC™
      </Link>
      . All Rights Reserved.
    </span>
  );
};

export default CurrentYear;
