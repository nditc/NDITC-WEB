import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./(main)/styles/markdown.css";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css.map";
// import "react-toastify/dist/react-toastify.esm.mjs.map";
import Navbar from "./(main)/Components/Navbar";
import SideBar from "./(main)/Components/Sidebar/SideBar";
import Footer from "./(main)/Components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";

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
          <NextTopLoader color="#3b82f6" />
          <Suspense>
            <Navbar />
          </Suspense>
          <div id="scrollToTop" className="h-0 w-0" />
          <SideBar />
          {children}
          <Footer />

          <ToastContainer bodyClassName={"Inter"} position="top-center" />
        </NextUIProvider>
      </body>
    </html>
  );
}
