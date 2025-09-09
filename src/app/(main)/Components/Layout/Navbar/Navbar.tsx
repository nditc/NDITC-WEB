"use client";

import { useEffect, useRef, useState } from "react";
import Hover from "./SubMenu";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import NavLinks from "./NavLinks";
import AppnLogin from "./App&Login";
import Logo from "./Logo";
import ToggleButton from "./ToggleButton";
import Loginbtn from "./Loginbtn";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const Route = usePathname();
  const Params = useSearchParams();
  const navRef = useRef<HTMLElement>(null);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const stateHandler = () => {
      setShowOptions(false);
    };
    const handleClickOutside: EventListener = (e) => {
      if (
        navRef.current &&
        e.target instanceof Node &&
        !navRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };
    const install = (e: any) => {
      setDeferredPrompt(e);
    };
    setShowOptions(false);
    window.addEventListener("hashchange", stateHandler);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("beforeinstallprompt", install);
    return () => {
      window.removeEventListener("hashchange", stateHandler);
      window.removeEventListener("beforeinstallprompt", install);
    };
  }, [Route, Params]);

  return (
    <nav
      ref={navRef}
      className={
        "fixed start-0 top-0 z-50 w-full max-w-[100vw] border border-gray-200 bg-white " +
        (showOptions ? "border-transparent" : "")
      }
      onClick={() => {
        setShowOptions(false);
      }}
    >
      <div className="container relative mx-auto flex flex-wrap items-center justify-between px-1 py-4">
        <Logo />
        <NavLinks
          setShowOptions={(s) => setShowOptions(s)}
          showOptions={showOptions}
        />
        <AppnLogin />
        
        <ToggleButton
          setShowOptions={(s) => setShowOptions(s)}
          showOptions={showOptions}
        />
      </div>
    </nav>
  );
};

export default Navbar;
