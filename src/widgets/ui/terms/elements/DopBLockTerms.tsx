"use client";

import { useTranslations } from "next-intl";

const DopBLockTerms = () => {
  const t = useTranslations();
  return (
    <div id="dop" className="flex flex-col items-start justify-center w-full gap-5">
      <div className="flex flex-col items-start justify-center w-full gap-3 text-[.9rem]">
        <h1 className="text-2xl font-bold">4. {t("termsOfUse.dop")}</h1>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <p key={i}>{t(`termsOfUse.dopd${i}`)}</p>
        ))}
      </div>
    </div>
  );
};


export default DopBLockTerms;