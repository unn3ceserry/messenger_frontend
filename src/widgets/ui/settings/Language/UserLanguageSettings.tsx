"use client";

import { motion } from "framer-motion";
import {
  CheckboxLanguage,
  i18nPattern,
  routing,
  TLocales,
  UserSettingsHeaderConstructor,
} from "@/shared";
import { useLocale, useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

const UserLanguageSettings = () => {
  const locales = routing.locales;
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitchLanguage(nextLocale: TLocales) {
    setCookie("NEXT_LOCALE", nextLocale);

    const segments = pathname.split("/");
    segments[1] = nextLocale;

    router.replace(segments.join("/"));
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen overflow-y-auto text-default-text-color scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={"userSettings"}
          title="settings.languageSettings.title"
          typeHeader="default"
        />
        <hr className="w-full border-3 border-black/5" />
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div className="w-full flex flex-col items-start justify-center gap-3">
            <p className="text-icons-color text-md ml-5">
              {t("settings.languageSettings.interfaceLanguage")}
            </p>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              {locales.map((el, i) => (
                <CheckboxLanguage
                  key={i}
                  content={i18nPattern(el).orig}
                  contentEn={i18nPattern(el).en}
                  isActive={el === locale}
                  onClick={() => handleSwitchLanguage(el)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLanguageSettings;
