"use client";

import { FC, useState } from "react";
import { userApi } from "../../api";
import { AnimatePresence, motion } from "framer-motion";
import { UserSettingsShortInfo } from "@/widgets";
import OtherUsersProfileHeader from "./header/OtherUsersProfileHeader";
import SwapUsersAvatars from "./swapavatars/SwapUsersAvatars";
import { ModalConstructor } from "@/shared";
import { AddContactModal } from "@/entities/contacts";

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
    <motion.div
      key={username}
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.25 }}
      layout
      className="fixed right-0 top-0 z-12313 h-screen max-w-100 w-full bg-chatui-bg overflow-y-auto text-default-text-color scrollbar-thin otherprofile:border-l border-line-color shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)]"
    >
      <div className="w-full flex flex-col items-center justify-start">
        <OtherUsersProfileHeader username={username} setIsOpen={setIsOpen} />
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

          <div className="flex flex-col items-start justify-center p-2 gap-3 w-full py-2">
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

      {/* add contact modal */}
      <AnimatePresence>
        {isOpen && (
          <ModalConstructor
            setIsOpen={setIsOpen}
            content={
              <AddContactModal
                setIsOpen={setIsOpen}
                username={data.username ?? ""}
                avatar={
                  data.avatars ? data.avatars[data.avatars.length - 1] : ""
                }
                firstName={data.firstName}
                lastName={data.lastName}
              />
            }
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OtherUsersProfile;
