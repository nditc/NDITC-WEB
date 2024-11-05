import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./(main)/styles/markdown.css";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css.map";
// import "react-toastify/dist/react-toastify.esm.mjs.map";
import Navbar from "./(main)/Components/Layout/Navbar/Navbar";
import SideBar from "./(main)/Components/Layout/Sidebar/SideBar";
import Footer from "./(main)/Components/Layout/Footer";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import DeveloperLink from "./club/Components/DeveloperLink";
import { AuthContextProvider } from "./_context/AuthContextProvider";
import { UserDataContextProvider } from "./_context/UserDataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NDITC",
  description: "Love the light of Technology",
  icons: { icon: "/Logo.png" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    images: [
      {
        url: "/Logo.png",
        width: 512,
        height: 451,
        alt: "NDITC Logo",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/Logo.png",
        width: 512,
        height: 451,
        alt: "NDITC Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <AuthContextProvider>
            <UserDataContextProvider>
              <NextTopLoader color="#3b82f6" />
              <Suspense>
                <Navbar />
              </Suspense>
              <div id="scrollToTop" className="h-0 w-0" />
              <SideBar />
              {children}
              <Footer />
              <DeveloperLink />
              <ToastContainer bodyClassName={"Inter"} position="top-center" />
            </UserDataContextProvider>
          </AuthContextProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
