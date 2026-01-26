"use client";

import { useTranslations } from "next-intl";

const ContactsBlockTerms = () => {
  const t = useTranslations();
  return (
    <div id="contacts" className="flex flex-col items-start justify-center w-full gap-5">
      <div className="flex flex-col items-start justify-center w-full gap-3 text-[.9rem]">
        <h1 className="text-2xl font-bold">5. {t("termsOfUse.contacts")}</h1>
        {[1, 2, 3, 4, 5].map((i) => (
          <p key={i}>{t(`termsOfUse.contactst${i}`)}</p>
        ))}
      </div>
    </div>
  );
};


export default ContactsBlockTerms;