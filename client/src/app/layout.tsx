import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer";
import { Toaster } from "react-hot-toast";
import { getSettingValue } from "../api/settingValuesApi";

export const revalidate = 60; // Revalidate every 60 seconds


export async function generateMetadata() {
  // Fetch metadata values
  const titleResult = await getSettingValue('Site Title') || "IREAD | Online Training Platform - USA";
  const descriptionResult = await getSettingValue('Site short description (Max 100 characters)') || "IREAD Online Learning Platform. Unlock the power of artificial intelligence with cutting-edge tools and resources.";

  // Safely extract values
  const title = typeof titleResult === "string" ? titleResult : titleResult?.value ?? "IREAD | Online Training Platform - USA";
  const description = typeof descriptionResult === "string" ? descriptionResult : descriptionResult?.value ?? "";

  return {
    title: title,
    description: description,
    // You can add other metadata properties here
  };
}

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
