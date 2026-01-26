"use client";

import { appConfig } from "@/shared";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ReviewBlockTerms = () => {
  const t = useTranslations();
  const params = useParams();
  return (
    <div id="review" className="flex flex-col items-start justify-center w-full gap-5">
          <div className="flex flex-col items-start justify-center w-full gap-3 text-[.9rem]">
            <h1 className="text-2xl font-bold">{t("termsOfUse.review")}</h1>
            <p className="text-black/50">
              {t("termsOfUse.vstypaetVSily")}:{" "}
              {new Intl.DateTimeFormat(params.locale === 'en' ? "en-EN" : "ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(appConfig.TERMS_DATA())}
            </p>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <p key={i}>{t(`termsOfUse.reviewd${i}`)}</p>
            ))}
          </div>
    </div>
  );
};

export default ReviewBlockTerms;
