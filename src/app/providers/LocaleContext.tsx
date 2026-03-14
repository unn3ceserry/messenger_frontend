"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, useContext, useState } from "react";
import { setCookie } from "cookies-next";

type TAllMessages = Record<string, any>;

const LocaleContext = createContext({
  locale: "en",
  switchLocale: (locale: string) => {},
});

export const useLocaleSwitch = () => useContext(LocaleContext);

export function LocaleProvider({
  children,
  initialLocale,
  allMessages,
}: {
  children: React.ReactNode;
  initialLocale: string;
  allMessages: TAllMessages;
}) {
  const [locale, setLocale] = useState(initialLocale);

  function switchLocale(nextLocale: string) {
    setCookie("NEXT_LOCALE", nextLocale);
    setLocale(nextLocale);
  }

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      <NextIntlClientProvider locale={locale} messages={allMessages[locale]} timeZone="Europe/Kiev">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}