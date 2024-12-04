import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

const SubNavItem = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: IconType;
  children: React.ReactNode;
}) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      type="button"
      className={`flex flex-1 flex-col items-center justify-center rounded-lg px-4 py-3 font-Nunito text-sm font-bold shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 xxsm:gap-2 xxsm:px-4 xxsm:py-4 sm:basis-auto sm:shadow-sm md:mb-2 md:me-2 md:flex-row md:rounded-xl md:py-4 md:text-base ${
        path === href
          ? "bg-primary text-white shadow-lg hover:bg-secondary hover:text-white"
          : "bg-white text-black hover:bg-secondary_lightest hover:text-primary"
      }`}
    >
      {React.createElement(icon, {
        className:
          "h-[1.5rem] w-[1.5rem] md:h-[1.125rem] md:w-[1.125rem] " +
          (path === href ? "text-secondary_lightest" : "text-primary"),
      })}
      <div className={"text-center text-[.7rem] sm:text-sm"}>{children}</div>
    </Link>
  );
};

const SubNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container my-4 flex justify-between gap-2 sm:relative sm:mb-0 sm:justify-center md:mb-0 md:mt-8 xl:justify-start">
      {children}
    </div>
  );
};

export { SubNav, SubNavItem };
