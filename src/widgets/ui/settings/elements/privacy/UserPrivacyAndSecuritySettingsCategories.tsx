"use client";

import { useAppDispatch } from "@/app";
import { createRipple } from "@/shared";
import { userSecuritySettingsCategoriesConfig } from "@/widgets/config";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface IUserPrivacyAndSecuritySettingsCategories {
  cloudPassword: boolean;
  email: string | null;
  blockedUsers: number;
}

const UserPrivacyAndSecuritySettingsCategories: FC<
  IUserPrivacyAndSecuritySettingsCategories
> = ({ cloudPassword, email, blockedUsers }) => {
  const dispatch = useAppDispatch();
  const elements = userSecuritySettingsCategoriesConfig(dispatch);
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {elements.map((el, i) => (
        <div
          onClick={(e) => {
            el.onClick();
            createRipple(e);
          }}
          key={i}
          className={`relative overflow-hidden hover:bg-white/5 rounded-2xl px-5 py-1.5 flex items-center justify-start gap-5 cursor-pointer w-full`}
        >
          {el.icon}
          <div className="flex flex-col items-start justify-between w-full">
            <p>{t(el.title)}</p>
            {el.isCloudPassword ? (
              <p className="text-white/50 text-[.9rem]">
                {cloudPassword
                  ? t("settings.privacyAndSecurity.enabled")
                  : t("settings.privacyAndSecurity.disabled")}
              </p>
            ) : el.isLinkEmail ? (
              <p className="text-white/50 text-[.9rem]">
                {email ? email : t("settings.privacyAndSecurity.notLinked")}
              </p>
            ) : (
               <p className="text-white/50 text-[.9rem]">
                {t("settings.privacyAndSecurity.blockedUsers")}: {blockedUsers}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPrivacyAndSecuritySettingsCategories;
