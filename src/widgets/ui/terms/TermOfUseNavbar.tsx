"use client";

import { TERMOFUSE_NAVBAR_CONFIG } from "@/widgets/config";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const TermOfUseNavbar = () => {
  const scrollToReview = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const params = useParams();
  const t = useTranslations();
  return (
    <div className="hidden lg:flex sticky top-0 flex-col w-full items-start justify-center max-w-80 gap-4 text-black p-5 pt-10">
      <h1 className="text-2xl font-bold max-w-50">{t("termsOfUse.title")}</h1>
      <hr className="w-full border-black/10" />
      <div className="flex flex-col items-center justify-center gap-1 w-full">
        {TERMOFUSE_NAVBAR_CONFIG.map((el, i) => (
          <Link
            key={i}
            href={`/${params.locale}/terms#${el.href}`}
            onClick={(e) => scrollToReview(e, el.href)}
            className="duration-500 rounded-2xl w-full flex p-3 px-10 items-center text-md font-medium text-black/70 hover:bg-black/5 hover:text-black"
          >
            {i + 1}. {t(el.title)}
          </Link>
        ))}
      </div>
      <Link
        href={`/${params.locale}/`}
        className="duration-500 rounded-2xl w-full flex items-center text-md font-medium text-black/70  hover:text-black"
      >
        {t('pagesTitle.homeTitle')}
      </Link>
    </div>
  );
};

export default TermOfUseNavbar;
