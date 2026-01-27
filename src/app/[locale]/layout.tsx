import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";
import { appConfig, routing } from "@/shared";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "../providers/ThemeProvider";
import bg from "@/app/assets/imgs/pattern.svg";

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
              <div
                className="absolute inset-0 w-full h-full bg-linear-to-b from-accent/70 to-accent/20"
                style={{
                  WebkitMaskImage: `url(${bg.src})`,
                  WebkitMaskRepeat: "repeat",
                  WebkitMaskSize: "350px",
                  maskImage: `url(${bg.src})`,
                  maskRepeat: "repeat",
                  maskSize: "350px",
                }}
              ></div>

              {children}
              <ToastContainer position="bottom-right" />
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
