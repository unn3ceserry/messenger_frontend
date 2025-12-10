import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { configApp } from "../config/conig-app";
import StoreProvider from "../store/StoreProvider";
import { ShaderDarkVeil } from "@/shared/ui";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: configApp.NAME(),
    template: `%s - ${configApp.NAME()}`,
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
      <body className={`${fontRoboto.className} antialiased`}>
        <StoreProvider>
          <div className="w-full h-screen fixed">
            <ShaderDarkVeil speed={2} hueShift={245} noiseIntensity={0.1} scanlineFrequency={3.8} scanlineIntensity={1} warpAmount={1} />
          </div>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
