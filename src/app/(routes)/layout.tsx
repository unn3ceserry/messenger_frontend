import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { configApp } from "../config/conig-app";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: configApp.NAME(),
    template: `%s - ${configApp.NAME()}`
  },
  description: `The best messanger in the industry - ${configApp.NAME()}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontRoboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
