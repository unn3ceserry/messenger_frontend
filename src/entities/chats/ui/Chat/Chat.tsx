"use client";

import { useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";
import {
  openComponent,
  selectOpenComponent,
  setOpenComponentOtherUsersProfile,
  UserActionsMenu,
} from "@/entities/user";
import { RenderAvatarElement, Spinner } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useFormattedChatDate } from "../../lib";
import { EllipsisVertical } from "lucide-react";
import { AnimatePresence } from "framer-motion";

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
  const lastSeenDate = useFormattedChatDate(user.lastSeen ?? 0);
  const whoIsOpenWithUi = useAppSelector(selectOpenComponent);

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
        className="flex w-full items-center justify-between bg-chatui-bg p-1.5 px-3 cursor-pointer"
      >
        {/* short info */}
        <div className="flex items-center justify-center gap-3">
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
              {isOnline ? t("settings.online") : lastSeenDate}
            </p>
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              openComponent(
                whoIsOpenWithUi === "userActionsMenu"
                  ? null
                  : "userActionsMenu",
              ),
            );
          }}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300 text-icons-color"
        >
          <EllipsisVertical size={22} />
        </div>
      </div>

      <ChatMessages userId={user.id} />

      <div className="flex w-full items-center justify-center px-5 max-w-175">
        <ChatInput />
      </div>
      <AnimatePresence>
        {whoIsOpenWithUi === "userActionsMenu" && <UserActionsMenu />}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
