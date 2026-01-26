"use client";

import { useTranslations } from "next-intl";

const FinanceBlockTerms = () => {
  const t = useTranslations();
  return (
    <div id="finance" className="flex flex-col items-start justify-center w-full gap-5">
      <div className="flex flex-col items-start justify-center w-full gap-3 text-[.9rem]">
        <h1 className="text-2xl font-bold">4. {t("termsOfUse.finance")}</h1>
        {[1, 2, 3, 4].map((i) => (
          <p key={i}>{t(`termsOfUse.financed${i}`)}</p>
        ))}
      </div>
    </div>
  );
};


export default FinanceBlockTerms;