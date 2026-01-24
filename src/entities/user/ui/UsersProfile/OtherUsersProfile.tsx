"use client";

import { FC } from "react";
import { userApi } from "../../api";
import { motion } from "framer-motion";
import { UserSettingsShortInfo } from "@/widgets";
import { useTranslations } from "use-intl";
import OtherUsersProfileHeader from "./header/OtherUsersProfileHeader";
import SwapUsersAvatars from "./swapavatars/SwapUsersAvatars";

type Props = {
  username: string;
};

const OtherUsersProfile: FC<Props> = ({ username }) => {
  const t = useTranslations();

  const { data, isLoading } = userApi.useGetUserDataQuery({
    username: username,
  });

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <motion.div
      key={username}
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25 }}
      layout
      className="fixed right-0 top-0 z-12312312123 h-screen max-w-100 w-full bg-chatui-bg overflow-y-auto text-default-text-color scrollbar-thin otherprofile:border-l border-line-color shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)]"
    >
      <div className="w-full flex flex-col items-center justify-start">
        <OtherUsersProfileHeader />
        <div className="w-full flex flex-col items-start justify-center gap-3">
          {/* avatar */}
          <SwapUsersAvatars
            hasAvatar={!!data?.avatars?.length}
            avatars={data.avatars}
            firstName={data.firstName ?? ""}
            lastName={data.lastName ?? ""}
            status="settings.online"
            size={130}
          />

          <div className="flex flex-col items-start justify-center p-2 gap-3 w-full py-2 ">
            {/* short infop */}
            <UserSettingsShortInfo
              number={data.number}
              username={data.username}
              bio={data.bio}
              email={data.email}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OtherUsersProfile;
