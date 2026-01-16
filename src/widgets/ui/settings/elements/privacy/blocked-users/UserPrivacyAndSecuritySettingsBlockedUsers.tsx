"use client";

import { motion } from "framer-motion";
import { userApi } from "@/entities";
import UserPrivacyAndSecuritySettingsBlockedUsersPain from "./UserPrivacyAndSecuritySettingsBlockedUsersPain";
import { useTranslations } from "next-intl";
import { UserSettingsHeaderConstructor } from "@/shared";

const UserPrivacyAndSecuritySettingsBlockedUsers = () => {
  const t = useTranslations();
  const { data, isLoading } = userApi.useGetMeQuery();

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="z-1233 flex flex-col items-center justify-start h-screen overflow-y-auto text-white scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={"userSettingsPrivacy"}
          title="settings.privacyAndSecurity.blockedUsers"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-1">
          {data.blockedUsers.length ? (
            data.blockedUsers.map((el, i) => (
              <UserPrivacyAndSecuritySettingsBlockedUsersPain
                key={i}
                userId={el}
              />
            ))
          ) : (
            <p className="text-white/50 text-[.9rem]">
              {t("settings.privacyAndSecurity.blockListEmpty")}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserPrivacyAndSecuritySettingsBlockedUsers;
