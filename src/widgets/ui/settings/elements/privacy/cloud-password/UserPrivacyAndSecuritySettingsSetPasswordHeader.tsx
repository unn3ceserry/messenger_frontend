"use client";

import { useAppDispatch } from "@/app";
import { ArrowLeft, } from "lucide-react";
import { useTranslations } from "next-intl";
import { openComponent } from "@/entities";

const UserPrivacyAndSecuritySettingsSetPasswordHeader = () => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();

  return (
    <header className="flex w-full justify-between items-center text-[#919191] sticky top-0 bg-[#212121] z-123123123 p-2">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() => dispatch(openComponent("userSettings"))}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-white/6 bg-transparent rounded-full duration-300"
        >
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-white font-medium text-xl">
          {t("settings.privacyAndSecurity.cloudPasswordCreate")}
        </h1>
      </div>
    </header>
  );
};

export default UserPrivacyAndSecuritySettingsSetPasswordHeader;