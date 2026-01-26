import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { ShaderDarkVeil, TimeClient, routing } from "@/shared";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/app/store/StoreProvider";
import { appConfig } from "@/shared";

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
  const now = new Date().toISOString();
  return (
      <div className={`${fontRoboto.className} antialiased`}>
        <StoreProvider>
          <NextIntlClientProvider locale={locale}>
            <div className="w-full h-screen fixed top-0 left-0 -z-10">
              <ShaderDarkVeil
                speed={2}
                hueShift={335}
                noiseIntensity={0.1}
                scanlineFrequency={3.8}
                scanlineIntensity={1}
                warpAmount={1}
              />
            </div>
            <TimeClient initialTime={now} />
            {children}
            <ToastContainer position="bottom-right" />
          </NextIntlClientProvider>
        </StoreProvider>
      </div>
  );
}
