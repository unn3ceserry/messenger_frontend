"use client";

import { useAppDispatch } from "@/app";
import { UserType, WhoCanSeen } from "@/entities";
import { createRipple } from "@/shared";
import { userPrivacySettingsCategoriesConfig } from "@/widgets/config";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface IUserPrivacyAndSecuritySettingsPrivacy {
  data: UserType;
}

const UserPrivacyAndSecuritySettingsPrivacy: FC<
  IUserPrivacyAndSecuritySettingsPrivacy
> = ({ data }) => {
  const dispatch = useAppDispatch();
  const elements = userPrivacySettingsCategoriesConfig(dispatch);
  const t = useTranslations();

  return (
    <div className="flex flex-col items-start justify-center w-full gap-2">
      <p className="text-white/50 ml-5">
        {t("settings.privacyAndSecurity.privacy")}
      </p>
      {elements.map((el, i) => (
        <div
          onClick={(e) => {
            el.onClick();
            createRipple(e);
          }}
          key={i}
          className="relative overflow-hidden hover:bg-white/5 rounded-2xl px-5 py-1.5 flex items-center justify-start gap-5 cursor-pointer w-full"
        >
          <div className="flex flex-col items-start justify-between w-full">
            <p>{t(el.title)}</p>
            <p className="text-white/50 text-[.9rem]">
              {t(`settings.privacyAndSecurity.privacyWhoCanSee.types.${data[el.type].toLowerCase()}`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPrivacyAndSecuritySettingsPrivacy;
