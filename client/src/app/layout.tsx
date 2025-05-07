import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer";
import { Toaster } from "react-hot-toast";
import { getSettingValue } from "../api/settingValuesApi";
import { SettingValue } from "@/types/setting";

// Initialize font (commented out as in original code)
// const inter = Inter({ subsets: ["latin"] });

// Fetch metadata values
const titleResult = await getSettingValue('Site Title') || "IREAD | Online Training Platform - USA";
const descriptionResult = await getSettingValue('Site short description (Max 100 characters)') || "IREAD Online Learning Platform. Unlock the power of artificial intelligence with cutting-edge tools and resources.";

// Safely extract values
const title: string = typeof titleResult === "string" ? titleResult : titleResult?.value ?? "IREAD | Online Training Platform - USA";
const description: string = typeof descriptionResult === "string" ? descriptionResult : descriptionResult?.value ?? "";

// Define metadata with fallback values
export const metadata: Metadata = {
  title: title ?? "IREAD | Online Training Platform - USA",
  description: description ?? "IREAD Online Learning Platform. Unlock the power of artificial intelligence with cutting-edge tools and resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="wrapper" className="clearfix">
          <Header />
          {children}
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
