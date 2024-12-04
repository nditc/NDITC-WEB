import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="z-50 flex grow-0 basis-0 items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="/Logo.png"
        className="h-12 w-32 min-w-32"
        alt="NDITC Logo"
        width={512}
        height={512}
      />
    </Link>
  );
};

export default Logo;
