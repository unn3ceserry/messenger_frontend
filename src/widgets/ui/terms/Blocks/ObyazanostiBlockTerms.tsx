"use client";

import { useTranslations } from "next-intl";

const ObyazanostiBlockTerms = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-start justify-center w-full gap-5">
      <div className="flex flex-col items-start justify-center w-full gap-3 text-[.9rem]">
        <h1 className="text-2xl font-bold">3. {t("termsOfUse.obyazanosti")}</h1>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <p key={i}>{t(`termsOfUse.obyazanostid${i}`)}</p>
        ))}
      </div>
    </div>
  );
};

export default ObyazanostiBlockTerms;