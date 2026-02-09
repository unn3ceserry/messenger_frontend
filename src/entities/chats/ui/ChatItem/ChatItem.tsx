"use client";

import { createRipple, RenderAvatarElement } from "@/shared";
import { useTranslations } from "next-intl";
import { FC, MouseEvent } from "react";

interface Props {
  hasAvatar: boolean;
  avatar?: string;
  size: number;
  message: string;
  firstName?: string;
  lastName?: string;
  onClick: () => void;
  onContextMenu: ( e: MouseEvent<HTMLDivElement>) => void;
}

const ChatItem: FC<Props> = ({
  hasAvatar,
  size,
  avatar,
  message,
  firstName,
  lastName,
  onClick,
  onContextMenu
}) => {
  const t = useTranslations();

  return (
    <div
      onClick={(e) => {
        onClick(),
        createRipple(e)
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e);
      }}
      className="flex w-full items-start gap-3 cursor-pointer relative hover:bg-checkbox-hover rounded-2xl p-2.5 overflow-hidden text-default-text-color"
    >
      <RenderAvatarElement hasAvatar={hasAvatar} size={size} avatar={avatar} />
      <div className="flex flex-col items-start justify-center">
        <h2>
          {firstName} {lastName}
        </h2>
        <p className="line-clamp-1 text-icons-color text-[0.85rem]">
          {message ? message : t("searchUsers.noResult")}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
