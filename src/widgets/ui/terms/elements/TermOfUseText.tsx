"use client";

import { useTranslations } from "next-intl";
import ContactsBlockTerms from "./ContactsBlockTerms";
import DopBLockTerms from "./DopBLockTerms";
import FinanceBlockTerms from "./FinanceBlockTerms";
import ObyazanostiBlockTerms from "./ObyazanostiBlockTerms";
import ReviewBlockTerms from "./ReviewBlockTerms";
import UsligoBlockTerms from "./UsligoBlockTerms";

const TermOfUseText = () => {
  const t = useTranslations()
  return (
    <div className="flex flex-col w-full items-start justify-center max-w-150 gap-4 text-black p-5 pt-10">
      <h1 className="text-2xl font-bold text-black/70">{t('termsOfUse.title')}</h1>
      <ReviewBlockTerms />
      <UsligoBlockTerms />
      <FinanceBlockTerms />
      <ObyazanostiBlockTerms />
      <DopBLockTerms />
      <ContactsBlockTerms />
    </div>
  );
};

export default TermOfUseText;
