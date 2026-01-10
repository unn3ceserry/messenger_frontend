"use client";

import { userApi } from "@/entities";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import UserSettingsHeader from "./elements/UserSettingsHeader";
import UserSettingsShortInfo from "./elements/UserSettingsShortInfo";
import UserSettingsCategories from "./elements/UserSettingsCategories";
import { useRouter } from "next/navigation";
import { ReceiptText } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { createRipple, RenderAvatarElement } from "@/shared";

interface IUserSettings {
  width: number;
}

const UserSettings: FC<IUserSettings> = ({ width }) => {
  const { data, isLoading } = userApi.useGetMeQuery();
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div
      style={{ width }}
      className="z-1233 flex flex-col items-center justify-start gap-5 bg-[#212121] h-screen overflow-y-auto text-white scrollbar-thin"
    >
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeader />
        {/* avatar & names */}
        <div className="w-full flex flex-col items-center justify-center p-2 gap-3">
          <div className="flex flex-col items-center w-full gap-3 cursor-pointer p-3">
          <RenderAvatarElement hasAvatar={!!data.avatars} size={130} avatar={data.avatars[data.avatars.length -1]} />
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-white/50 text-[.85rem]">
                {t("settings.online")}
              </p>
            </div>
          </div>

          <UserSettingsShortInfo
            number={data.number}
            username={data.username}
            email={data.email}
          />
          <hr className="w-full border-3 border-black/15" />
          <UserSettingsCategories />
          <hr className="w-full border-3 border-black/15" />

          {/* terms of use */}
          <div
            onClick={(e) => {
              createRipple(e);
              router.push(`/${locale}/terms`);
            }}
            className="relative overflow-hidden hover:bg-white/5 rounded-2xl px-5 py-4 flex items-center justify-start gap-5 cursor-pointer w-full"
          >
            <ReceiptText className={"text-[#818181]"} />
            <p>{t("settings.termOfUse")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSettings;
