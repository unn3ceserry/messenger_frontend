"use client";

import { userApi } from "@/entities";
import { RenderAvatarElement } from "@/shared";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface IUserPrivacyAndSecuritySettingsBlockedUsersPain {
  userId: string;
}

const UserPrivacyAndSecuritySettingsBlockedUsersPain: FC<
  IUserPrivacyAndSecuritySettingsBlockedUsersPain
> = ({ userId }) => {
  const { data, isLoading } = userApi.useGetUserDataQuery(userId);
  const [unBlock] = userApi.useUnBlockUsersMutation();

  const t = useTranslations();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleClick = async () => {
    await unBlock(userId);
  };

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
        setIsOpen((prev) => !prev);
      }}
      onClick={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
        setIsOpen((prev) => !prev);
      }}
      className="flex items-center justify-center w-full hover:bg-white/5 rounded-2xl p-3 cursor-pointer gap-3"
    >
      <RenderAvatarElement
        hasAvatar={!!data.avatars?.length}
        size={55}
        avatar={data.avatars ? data.avatars[data.avatars.length - 1] : ""}
      />
      <div className="flex flex-col items-start justify-center w-full">
        <p className="text-[1.1rem]">
          {data.firstName} {data.lastName}
        </p>
        <p className="text-white/50 text-[.9rem]">@{data.username}</p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ top: position.y, left: position.x }}
            className="fixed p-0.5 backdrop-blur-lg rounded-xl w-max shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)] z-50 cursor-pointer"
          >
            <div
              onClick={handleClick}
              className="flex items-center justify-start hover:bg-black/30 p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
            >
              <CircleOff size={19} />
              <p>{t("settings.privacyAndSecurity.unblock")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPrivacyAndSecuritySettingsBlockedUsersPain;
