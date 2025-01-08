import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IREAD",
  description: "IREAD", // Optional: Set default title of metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="wrapper" className="clearfix">
          <Header/>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
