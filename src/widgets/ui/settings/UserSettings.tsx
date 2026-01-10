"use client";

import { userApi } from "@/entities";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import UserSettingsHeader from "./elements/UserSettingsHeader";
import UserSettingsShortInfo from "./elements/UserSettingsShortInfo";
import UserSettingsCategories from "./elements/UserSettingsCategories";

interface IUserSettings {
  width: number;
}

const UserSettings: FC<IUserSettings> = ({ width }) => {
  const { data, isLoading } = userApi.useGetMeQuery();

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div
      style={{ width }}
      className="z-123123123 flex flex-col items-center justify-start gap-5 bg-[#212121] h-screen text-white p-2"
    >
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-center gap-3"
      >
        <UserSettingsHeader />

        {/* avatar & names */}
        <div className="flex flex-col items-center w-full gap-3 cursor-pointer p-3">
          {data.avatars ? (
            <Image
              src={data.avatars[0]}
              alt={data.username}
              width={30}
              height={30}
            />
          ) : (
            <div className="w-30 aspect-square bg-linear-190 from-accent to-accent/20 rounded-full"></div>
          )}

          <div className="flex flex-col items-center justify-center">
            <p className="text-xl">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-white/50 text-[.8rem]">тут будет статус</p>
          </div>
        </div>

        <UserSettingsShortInfo
          number={data.number}
          username={data.username}
          email={data.email}
        />
        <hr className="w-full border-3 border-black/15" />

        <UserSettingsCategories/>
      </motion.div>
    </div>
  );
};

export default UserSettings;
