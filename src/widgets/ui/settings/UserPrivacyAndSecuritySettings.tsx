"use client";

import { motion } from "framer-motion";
import UserPrivacyAndSecuritySettingsCategories from "./elements/privacy/UserPrivacyAndSecuritySettingsCategories";
import UserPrivacyAndSecuritySettingsPrivacy from "./elements/privacy/UserPrivacyAndSecuritySettingsPrivacy";
import { UserSettingsHeaderConstructor } from "@/shared";
import { UserType } from "@/entities";
import { FC } from "react";

interface IUserPrivacyAndSecuritySettings {
  data: UserType
}

const UserPrivacyAndSecuritySettings: FC<IUserPrivacyAndSecuritySettings> = ({data}) => {

  return (
    <div className="z-1233 flex flex-col items-center justify-start h-screen overflow-y-auto text-default-text-color scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={"userSettings"}
          title="settings.privacyAndSecurity.title"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-3">
          <UserPrivacyAndSecuritySettingsCategories
            cloudPassword={!!data.cloudPassword}
            email={data.email}
            blockedUsers={data.blockedUsers.length}
          />
          <hr className="w-full border-3 border-black/5" />
          <UserPrivacyAndSecuritySettingsPrivacy data={data} />
        </div>
      </motion.div>
    </div>
  );
};

export default UserPrivacyAndSecuritySettings;
