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
      className={`flex shrink-0 grow-0 basis-[calc(50%-0.25rem)] items-center gap-2 rounded-lg px-5 py-4 font-Nunito text-sm font-bold shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 sm:basis-auto sm:shadow-md md:mb-2 md:me-2 md:rounded-xl md:py-3 md:text-base ${
        path === href
          ? "bg-primary text-white shadow-lg hover:bg-secondary hover:text-white"
          : "bg-white text-black hover:bg-secondary_lightest hover:text-primary"
      }`}
    >
      {React.createElement(icon, {
        className:
          "h-[1.125rem] w-[1.125rem] " +
          (path === href ? "text-secondary_lightest" : "text-primary"),
      })}
      {children}
    </Link>
  );
};

const SubNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container my-auto mt-4 flex flex-wrap justify-between gap-2 sm:relative sm:justify-start md:mt-8">
      {children}
    </div>
  );
};

export { SubNav, SubNavItem };
