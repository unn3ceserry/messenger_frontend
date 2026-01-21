"use client";

import { useTranslations } from "next-intl";
import { AppInput, Button } from "@/shared";
import { useState } from "react";
import { handleSetEmail } from "@/entities";

const UserPrivacyAndSecuritySettingsPrivacyEmailSetEmail = () => {
  const t = useTranslations();
  const [email, setEmail] = useState<string>("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSetEmail(email);
      }}
      className="flex flex-col items-center justify-center w-full px-5 gap-5"
    >
      <AppInput
        type="email"
        value={email}
        placeholder={t("settings.privacyAndSecurity.linkEmailInputPlaceholder")}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="flex w-full bg-accent/80 p-3 rounded-xl py-3 cursor-pointer hover:opacity-80 duration-500 text-[.9rem] items-center justify-center border border-white/20"
      >
        <p>{t("settings.privacyAndSecurity.linkEmailToAccount")}</p>
      </button>
      <p className="text-icons-color text-[.8rem]">
        {t("settings.privacyAndSecurity.linkEmailSubtext")}
      </p>
    </form>
  );
};

export default UserPrivacyAndSecuritySettingsPrivacyEmailSetEmail;
