"use client";

import { userApi } from "@/entities";
import { motion } from "framer-motion";
import { useTranslations } from "use-intl";
import { RenderAvatarElement } from "@/shared";
import { UserSettingsShortInfo } from "@/widgets";
import UserProfileHeader from "./elements/userprofile/UserProfileHeader";
import UserProfileLastAvatars from "./elements/userprofile/UserProfileLastAvatars";

const UserProfile = () => {
  const { data, isLoading } = userApi.useGetMeQuery();
  const t = useTranslations();
  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="z-1233 flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-white scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserProfileHeader />
        <div className="w-full flex flex-col items-start justify-center p-2 gap-3">
          {/* avatar */}
          <div className="flex flex-col items-center w-full gap-3 cursor-pointer p-3">
            <RenderAvatarElement
              hasAvatar={!!data.avatars}
              size={130}
              avatar={data.avatars[data.avatars.length - 1]}
            />
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-white/50 text-[.85rem]">
                {t("settings.online")}
              </p>
            </div>
          </div>

          {/* short infop */}
          <UserSettingsShortInfo
            number={data.number}
            username={data.username}
            email={data.email}
          />

          <hr className="w-full border-3 border-black/15" />

          <div className="flex flex-col items-start justify-center text-start px-2 gap-1">
            <h2 className="text-white/50 text-[1.1rem]">{t("profile.bio")}:</h2>
            <p className="text-[.9rem]">{data.bio ? data.bio : t("profile.noBioYet")}</p>
          </div>

          <hr className="w-full border-3 border-black/15" />

          <UserProfileLastAvatars avataras={data.avatars} />
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
