import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Submenu from "./SubMenu";
import Link from "next/link";
import Loginbtn from "./Loginbtn";

const NavLink = ({
  href,
  children,
  extraClass = "",
}: {
  href: string;
  children: React.ReactNode;
  extraClass?: string;
}) => {
  const Route = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={
          "block rounded px-3 py-2 text-gray-900 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-500 " +
          (Route === href
            ? "bg-blue-600 text-white hover:bg-blue-700 lg:bg-transparent lg:text-blue-500 "
            : "hover:bg-gray-200 lg:bg-transparent lg:text-black ") +
          extraClass
        }
        aria-current="page"
      >
        {children}
      </Link>
    </li>
  );
};

const NavLinkCont = ({
  showOptions,
  setShowOptions,
}: {
  showOptions: boolean;
  setShowOptions: (s: boolean) => void;
}) => {
  const [windowWidth, setWindowWidth] = useState(800);
  const Route = usePathname();
  const Params = useSearchParams();

  useEffect(() => {
    const listener = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setShowOptions(false);
      }
    };
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [Route, Params, setShowOptions]);

  const inClubPage = Route.startsWith("/club");

  return (
    <>
      <div
        style={{
          transformOrigin: "top",
        }}
        className={`z-30 w-screen shrink-0 items-center justify-between bg-white transition lg:order-1 lg:flex lg:w-auto ${showOptions || windowWidth >= 1024
            ? "scale-y-100"
            : "pointer-events-none scale-y-0"
          } ${windowWidth < 1024
            ? "fixed left-0 top-[72px] border-b border-gray-200 pb-5"
            : ""
          }`}
        id="navbar-sticky"
      >
        <ul className="Inter container mt-4 flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium lg:mt-0 lg:flex-row lg:gap-0 lg:space-x-8 lg:border-0 lg:bg-white lg:p-0 rtl:space-x-reverse">
          <NavLink href="/">Home</NavLink>

          {/* Conditionally show Club or Leaderboard + Events */}
          {!inClubPage ? (
            <>
              <NavLink
                href="/club"
                extraClass={
                  Route === "/" // highlight on home page
                    ? "bg-blue-500 text-white font-semibold rounded-md px-4 py-2"
                    : ""
                }
              >
                Club
              </NavLink>
        
            </>
          ) : (
            <>
              <NavLink href="/club/leaderboard">Leaderboard</NavLink>
              <NavLink href="/club/events">Events</NavLink>
            </>
          )}

          <NavLink href="/about">About</NavLink>

          {
            !inClubPage && <>
              <Submenu
                showOptions={showOptions}
                windowWidth={windowWidth}
                menuItems={[
                  {
                    href: "/activities?type=event&scroll=true",
                    name: "Events",
                  },
                  {
                    href: "/activities?type=workshop&scroll=true",
                    name: "Workshops",
                  },
                  {
                    href: "/activities?type=publication&scroll=true",
                    name: "Publications",
                  },
                  {
                    href: "/activities?type=projects&scroll=true",
                    name: "Projects",
                  },
                ]}
                href="/activities"
              >
                Activities
              </Submenu>

              <NavLink href="/executive">Executives</NavLink>
            </>
          }
          <NavLink href="/#contact">Contact</NavLink>

          {windowWidth <= 1024 && (
            <NavLink href="/developer">Developers</NavLink>
          )}

        </ul>
        {
          !inClubPage &&   <Loginbtn />
        }
      </div>
    </>
  );
};

export default NavLinkCont;
