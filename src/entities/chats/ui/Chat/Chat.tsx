"use client";

import { useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";
import { setOpenComponentOtherUsersProfile } from "@/entities/user";
import { RenderAvatarElement, Spinner } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";

interface Props {
  userId: string;
}

const Chat: FC<Props> = ({ userId }) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const currentChat = useAppSelector(getCurrentChat);

  if (!currentChat) return <Spinner />;

  const user = currentChat.members?.find(
    (member) => member.userId !== userId,
  )?.user;

  if (!user) return <Spinner />;

  const isOnline = user.isOnline;
  const lastAvatar = user.avatars.at(-1);

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full text-default-text-color gap-5">
      <div
        onClick={() =>
          dispatch(
            setOpenComponentOtherUsersProfile({
              openComponent: "userProfile",
              username: user.username,
            }),
          )
        }
        className="flex w-full items-center justify-start bg-chatui-bg p-2 px-5 gap-3 cursor-pointer"
      >
        <RenderAvatarElement
          hasAvatar={!!user.avatars.length}
          size={40}
          avatar={lastAvatar}
        />
        <div className="flex flex-col items-start justify-center w-full">
          <h2 className="">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-icons-color text-[.85rem]">
            {isOnline
              ? t("settings.online")
              : new Date(user.lastSeen ?? Date.now()).toLocaleString()}
          </p>
        </div>
      </div>

      <ChatMessages userId={user.id} />

      {/* input */}
      <div className="flex w-full items-center justify-center px-5 max-w-175">
        <ChatInput userId={user.id} />
      </div>
    </div>
  );
};

export default Chat;
