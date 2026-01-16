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
      <Button
        type="submit"
        label={t("settings.privacyAndSecurity.linkEmailToAccount")}
        className="w-full rounded-2xl py-2"
      />
      <p className="text-white/50 text-[.8rem]">
        {t("settings.privacyAndSecurity.linkEmailSubtext")}
      </p>
    </form>
  );
};

export default UserPrivacyAndSecuritySettingsPrivacyEmailSetEmail;
