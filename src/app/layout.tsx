import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Footer from "./Components/Footer";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NDITC",
  description: "Love the light of Technology",
  icons: { icon: "favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#3b82f6" />
        <Navbar />
        <div id="scrollToTop" className="w-0 h-0" />
        <SideBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
