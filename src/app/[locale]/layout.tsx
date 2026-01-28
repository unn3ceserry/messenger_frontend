import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";
import { appConfig, routing } from "@/shared";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ThemeProvider from "../providers/ThemeProvider";

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
      template: `%s - ${appConfig.NAME()}`,
      default: `${t("pagesTitle.homeTitle")} - ${appConfig.NAME()}`,
    },
    description: `The best messanger in the industry - ${appConfig.NAME()}`,
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

  setRequestLocale(locale);
  return (
    <html lang="en">
      <body className={`${fontRoboto.className} antialiased`}>
        <StoreProvider>
          <ThemeProvider>
            <NextIntlClientProvider locale={locale}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
