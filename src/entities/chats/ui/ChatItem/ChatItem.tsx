"use client";

import { useAppSelector } from "@/app";
import { createRipple, RenderAvatarElement } from "@/shared";
import { useTranslations } from "next-intl";
import { FC, MouseEvent } from "react";
import { isUserOnline } from "../../model";

interface Props {
  hasAvatar: boolean;
  avatar?: string;
  size: number;
  message: string;
  firstName?: string;
  lastName?: string;
  onClick: () => void;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  userId: string;
}

const ChatItem: FC<Props> = ({
  hasAvatar,
  size,
  avatar,
  message,
  firstName,
  lastName,
  onClick,
  onContextMenu,
  userId,
}) => {
  const t = useTranslations();

  const isOnline = useAppSelector((state) => isUserOnline(userId, state));

  return (
    <div
      onClick={(e) => {
        (onClick(), createRipple(e));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e);
      }}
      className="flex w-full items-start gap-3 cursor-pointer relative hover:bg-checkbox-hover rounded-2xl p-2.5 overflow-hidden text-default-text-color"
    >
      <div className="flex items-center justify-center relative">
        <RenderAvatarElement
          hasAvatar={hasAvatar}
          size={size}
          avatar={avatar}
        />
        {isOnline && (
          <div className="absolute bottom-1 right-0 w-4 aspect-square bg-green-400 border-chatui-bg border-2 rounded-full" />
        )}
      </div>
      <div className="flex flex-col items-start justify-center min-w-0">
        <h2 className="shortText">
          {firstName} {lastName}
        </h2>
        <p className="text-icons-color text-[0.85rem] shortText">
          {message ? message : t("searchUsers.noResult")}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
