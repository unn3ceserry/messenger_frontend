import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { configApp } from "../config/conig-app";
import StoreProvider from "../store/StoreProvider";
import { ShaderDarkVeil, routing } from "@/shared";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: {
      template: `%s - ${configApp.NAME()}`,
      default: `${t("pagesTitle.homeTitle")} - ${configApp.NAME()}`,
    },
    description: `The best messanger in the industry - ${configApp.NAME()}`,
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={`${fontRoboto.className} antialiased`}>
        <StoreProvider>
          <NextIntlClientProvider>
            <div className="w-full h-screen fixed top-0 left-0 -z-10">
              <ShaderDarkVeil
                speed={2}
                hueShift={9}
                noiseIntensity={0.1}
                scanlineFrequency={3.8}
                scanlineIntensity={1}
                warpAmount={1}
              />
            </div>
            {children}
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
