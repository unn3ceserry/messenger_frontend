import { routing } from "./routing";

export type TLocales = (typeof routing.locales)[number];

export const i18nPattern = (lng: TLocales) =>  {
  switch (lng) {
    case 'en':
      return {orig: 'English', en: 'English'};
    case 'ru':
      return {orig: 'Русский', en: "Russian"}
  }
}