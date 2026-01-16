"use client";

import { useTranslations } from "next-intl";
import { AppInput, Button } from "@/shared";
import { FC, useState } from "react";
import { handleChangeEmail } from "@/entities";

interface IUserPrivacyAndSecuritySettingsPrivacyEmailSetEmailChangeEmail {
  cloudPassword: boolean;
}

const UserPrivacyAndSecuritySettingsPrivacyEmailSetEmailChangeEmail: FC<
  IUserPrivacyAndSecuritySettingsPrivacyEmailSetEmailChangeEmail
> = ({ cloudPassword }) => {
  const t = useTranslations();
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleChangeEmail({
          newEmail: data.email,
          cloudPassword: data.password,
        });
      }}
      className="flex flex-col items-center justify-center w-full px-5 gap-5"
    >
      <AppInput
        type="email"
        value={data.email}
        placeholder={t("settings.privacyAndSecurity.linkEmailInputPlaceholder")}
        onChange={(e) =>
          setData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      {cloudPassword && (
        <AppInput
          type="password"
          value={data.password}
          placeholder={t(
            "settings.privacyAndSecurity.cloudPasswordInputPlaceholder"
          )}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      )}

      <Button
        type="submit"
        label={t("settings.privacyAndSecurity.changeEmail")}
        className="w-full rounded-2xl py-2"
      />
      <p className="text-white/50 text-[.8rem]">
        {t("settings.privacyAndSecurity.linkEmailSubtext")}
      </p>
    </form>
  );
};

export default UserPrivacyAndSecuritySettingsPrivacyEmailSetEmailChangeEmail;
