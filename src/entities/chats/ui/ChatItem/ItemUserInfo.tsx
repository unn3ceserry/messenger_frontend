"use client";

import { RenderAvatarElement } from "@/shared";
import { isUserOnline, Message } from "../../model";
import { useAppSelector } from "@/app";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  userId: string,
  avatar?: string,
  hasAvatar: boolean,
  firstName?: string,
  lastName?: string,
  lastMessage?: Message
}

const ItemUserInfo: FC<Props> = ({avatar, firstName, hasAvatar, lastName, userId, lastMessage}) => {
  const t = useTranslations();
  const isOnline = useAppSelector((state) => isUserOnline(userId, state));

  return (
    <div className="flex w-full items-center justify-start gap-3">
      <div className="flex items-center justify-center relative">
        <RenderAvatarElement hasAvatar={hasAvatar} size={50} avatar={avatar} />
        {isOnline && (
          <div className="absolute bottom-1 right-0 w-4 aspect-square bg-green-400 border-bg-chat border-2 rounded-full" />
        )}
      </div>
      <div className="flex flex-col items-start justify-center min-w-0">
        <h2 className="shortText">
          {firstName} {lastName}
        </h2>
        <p className="text-icon text-[0.85rem] shortText">
          {lastMessage ? lastMessage.text : t("searchUsers.noResult")}
        </p>
      </div>
    </div>
  );
};

export default ItemUserInfo;
