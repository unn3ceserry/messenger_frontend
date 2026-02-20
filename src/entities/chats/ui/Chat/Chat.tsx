"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, EllipsisVertical, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAppSelector } from "@/app";
import {
  closeCurrentChat,
  getCurrentChat,
  setIsFullScreenChat,
} from "@/entities/chats/model";
import {
  closeOtherProfile,
  getMyData,
  openComponent,
  selectOpenComponent,
  setOpenComponentOtherUsersProfile,
  UserActionsMenu,
} from "@/entities/user";
import { RenderAvatarElement, Spinner, useSocketConnection } from "@/shared";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useFormattedChatDate } from "../../lib";

const Chat = () => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const userId = useAppSelector(getMyData);
  const currentChat = useAppSelector(getCurrentChat);
  const whoIsOpenWithUi = useAppSelector(selectOpenComponent);

  const socket = useSocketConnection(userId);

  const unreadMessageIds =
    currentChat?.messages
      .filter((msg) => !msg.isRead && msg.senderId !== userId)
      .map((msg) => msg.id) ?? [];

  useEffect(() => {
    if (!currentChat) return;

    if (unreadMessageIds.length > 0) {
      socket.emit("readMessages", {
        messageIds: unreadMessageIds,
        chatId: currentChat.id,
      });
    }
  }, [currentChat, currentChat?.messages, userId, socket]);

  if (!currentChat) return <Spinner />;

  const otherMember = currentChat.members?.find(
    (m) => m.userId !== userId,
  )?.user;
  if (!otherMember) return <Spinner />;

  const {
    id: otherUserId,
    firstName,
    lastName,
    username,
    avatars,
    isOnline,
    lastSeen,
  } = otherMember;

  const lastAvatar = avatars.at(-1);
  const lastSeenFormatted = useFormattedChatDate(lastSeen ?? 0);

  const handleOpenProfile = () => {
    dispatch(
      setOpenComponentOtherUsersProfile({
        openComponent: "userProfile",
        username,
      }),
    );
  };

  const toggleUserActionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      openComponent(
        whoIsOpenWithUi === "userActionsMenu" ? null : "userActionsMenu",
      ),
    );
  };

  const handleCloseCurrentChat = () => {
    dispatch(closeOtherProfile());
    dispatch(setIsFullScreenChat(false));
    dispatch(closeCurrentChat());
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full text-default-text-color gap-5 z-1231">
      <div
        onClick={handleOpenProfile}
        className="flex w-full items-center justify-between bg-chatui-bg p-1.5 px-3 cursor-pointer"
      >
        <div className="flex items-center justify-start w-full gap-3 truncate">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleCloseCurrentChat();
            }}
            className="resizechat:hidden flex aspect-square cursor-pointer p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300 text-icons-color"
          >
            <ArrowLeft />
          </div>

          {/* инфо юзера */}
          <div className="flex items-center gap-3">
            <RenderAvatarElement
              hasAvatar={!!avatars.length}
              size={40}
              avatar={lastAvatar}
            />
            <div className="flex flex-col items-start justify-center w-full">
              <h2>
                {firstName} {lastName}
              </h2>
              <p className="text-icons-color text-[0.85rem]">
                {isOnline ? t("settings.online") : lastSeenFormatted}
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={toggleUserActionsMenu}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300 text-icons-color"
        >
          <EllipsisVertical size={22} />
        </div>
      </div>

      <ChatMessages userId={otherUserId} />

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
