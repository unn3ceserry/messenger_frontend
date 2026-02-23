"use client";

import { useAppSelector } from "@/app";
import { createRipple, RenderAvatarElement, Spinner } from "@/shared";
import { useTranslations } from "next-intl";
import { FC, MouseEvent } from "react";
import { getCurrentChat, isUserOnline, Message } from "../../model";
import { getMyData } from "@/entities/user";
import ItemUserInfo from "./ItemUserInfo";
import { useFormattedChatDate } from "../../lib";

interface Props {
  hasAvatar: boolean;
  avatar?: string;
  messages: Array<Message>;
  firstName?: string;
  lastName?: string;
  onClick: () => void;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  userId: string;
}

const ChatItem: FC<Props> = ({
  hasAvatar,
  avatar,
  firstName,
  lastName,
  messages,
  onClick,
  onContextMenu,
  userId,
}) => {
  const myUserId = useAppSelector(getMyData);
  const lastMessage = messages.at(-1);
  const noReadMessages = messages.filter(
    (msg) => msg.senderId !== myUserId && !msg.isRead,
  );
  const formattedCreatedTime = useFormattedChatDate(
    new Date(lastMessage?.createdAt ?? new Date()).getTime() ?? 0,
  );

  return (
    <div
      onClick={(e) => {
        (onClick(), createRipple(e));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e);
      }}
      className="flex w-full items-start justify-between cursor-pointer relative hover:bg-checkbox-hover rounded-2xl p-2.5 overflow-hidden text-default-text-color"
    >
      <div className="flex-1 min-w-0">
        <ItemUserInfo
          avatar={avatar}
          firstName={firstName}
          hasAvatar={hasAvatar}
          lastName={lastName}
          lastMessage={lastMessage}
          userId={userId}
        />
      </div>

      <div className="flex flex-col items-end justify-center gap-2 shrink-0">
        <p className="text-icons-color text-[.65rem]">{formattedCreatedTime}</p>
        {noReadMessages.length ? (
          <p className="flex items-center justify-center rounded-full bg-accent p-[1.5px] px-2 text-[.85rem]">
            {noReadMessages.length}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ChatItem;
