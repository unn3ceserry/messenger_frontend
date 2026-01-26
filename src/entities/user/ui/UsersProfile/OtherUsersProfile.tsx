"use client";

import { FC, useState } from "react";
import { userApi } from "../../api";
import { motion } from "framer-motion";
import { UserSettingsShortInfo } from "@/widgets";
import OtherUsersProfileHeader from "./OtherUsersProfileHeader";
import SwapUsersAvatars from "./SwapUsersAvatars/SwapUsersAvatars";

type Props = {
  username: string;
};

const OtherUsersProfile: FC<Props> = ({ username }) => {
  const { data, isLoading } = userApi.useGetUserDataQuery({
    username: username,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start">
        <OtherUsersProfileHeader username={username} setIsOpen={setIsOpen} />
        <motion.div
          className="w-full flex flex-col items-start justify-center  gap-3"
          exit={{ opacity: 0, scale: 0.8, x: 300 }}
          initial={{ opacity: 0, scale: 0.8, x: 300 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* avatar */}
          <SwapUsersAvatars
            hasAvatar={!!data?.avatars?.length}
            avatars={data.avatars}
            firstName={data.firstName ?? ""}
            lastName={data.lastName ?? ""}
            status="settings.online"
            size={130}
          />

          <div className="flex flex-col items-start justify-center p-2 gap-3 w-full py-2">
            {/* short infop */}
            <UserSettingsShortInfo
              number={data.number}
              username={data.username}
              bio={data.bio}
              email={data.email}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default OtherUsersProfile;
