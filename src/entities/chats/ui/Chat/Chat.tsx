"use client";

import { DragEvent, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EllipsisVertical, X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";
import {
  getMyData,
  openComponent,
  selectOpenComponent,
  setOpenComponentOtherUsersProfile,
  UserActionsMenu,
} from "@/entities/user";
import { DrogOnDrop, Spinner, useSocketConnection } from "@/shared";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatUserInfo from "./ChatUserInfo/ChatUserInfo";

const Chat = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(getMyData);
  const currentChat = useAppSelector(getCurrentChat);
  const whoIsOpenWithUi = useAppSelector(selectOpenComponent);

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<File>>([]);

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

  const { id: otherUserId, username } = otherMember;

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

  // dragging handlers

  const handleOnDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDrag(false);
    }
  };
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
    Array.from(e.dataTransfer.files).map((file) => {
      setFiles((prev) => [...prev, file]);
    });
    console.log(files)
  };

  return (
    <div
      onDragStart={(e) => handleOnDragStart(e)}
      onDragOver={(e) => handleOnDragStart(e)}
      onDragLeave={(e) => handleOnDragLeave(e)}
      onDrop={(e) => handleOnDrop(e)}
      className="flex flex-col items-center justify-between h-screen w-full text-default-text-color z-1231 relative"
    >
      <div
        onClick={handleOpenProfile}
        className="flex w-full items-center justify-between bg-chatui-bg p-1.5 px-3 cursor-pointer"
      >
        <ChatUserInfo member={otherMember} />

        <div
          onClick={toggleUserActionsMenu}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300 text-icons-color"
        >
          <EllipsisVertical size={22} />
        </div>
      </div>

      <div className="relative flex flex-col flex-1 w-full items-center justify-between gap-5 py-5 overflow-y-auto">
        <ChatMessages userId={otherUserId} />
        <div className="flex w-full items-center justify-center px-5 max-w-175">
          <ChatInput />
        </div>

        <AnimatePresence>
          {whoIsOpenWithUi === "userActionsMenu" && <UserActionsMenu />}
          {isDrag && <DrogOnDrop />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;
