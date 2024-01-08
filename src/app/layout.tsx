import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/page";
import Footer from "@/components/layout/footer/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex flex-col w-full">
          <div className="flex w-[1440px] h-[90vh] my-0 mx-auto ">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
