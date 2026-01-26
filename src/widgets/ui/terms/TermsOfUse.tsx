"use client";

import { useTranslations } from "next-intl";
import TermOfUseNavbar from "./TermOfUseNavbar";
import UsligoBlockTerms from "./Blocks/UsligoBlockTerms";
import ReviewBlockTerms from "./Blocks/ReviewBlockTerms";
import FinanceBlockTerms from "./Blocks/FinanceBlockTerms";
import ObyazanostiBlockTerms from "./Blocks/ObyazanostiBlockTerms";
import DopBLockTerms from "./Blocks/DopBLockTerms";
import ContactsBlockTerms from "./Blocks/ContactsBlockTerms";

const TermsOfUse = () => {
  const t = useTranslations();

  return (
    <div className="flex w-full max-w-400 items-start justify-center gap-5">
      <TermOfUseNavbar />
      <div className="hidden lg:block w-0.5 bg-black/10 self-stretch" />
      <div className="flex flex-col w-full items-start justify-center max-w-150 gap-4 text-black p-5 pt-10">
        <h1 className="text-2xl font-bold text-black/70">
          {t("termsOfUse.title")}
        </h1>
        <ReviewBlockTerms />
        <UsligoBlockTerms />
        <FinanceBlockTerms />
        <ObyazanostiBlockTerms />
        <DopBLockTerms />
        <ContactsBlockTerms />
      </div>
    </div>
  );
};

export default TermsOfUse;
