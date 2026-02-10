"use client";

import { useEffect } from "react";
import {
  Chat,
  closeCurrentChat,
  deleteChat,
  setNewDm,
  setUserOffline,
  setUserOnline,
} from "@/entities/chats/model";
import { useSocketConnection } from "@/shared";
import { useAppDispatch } from "@/app";

export const useChatSocket = (userId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;

    const socket = useSocketConnection(userId);

    const handleNewDm = (chat: Chat) => {
      dispatch(setNewDm(chat));
      socket.emit("joinChat", { chatId: chat.id });
    };

    const handleUserOnline = (data: {userId: string}) => {
      dispatch(setUserOnline(data.userId))
      console.log('online', data.userId)
    };

    const handleUserOffline = (data: {userId: string, lastSeen: string}) => {
      dispatch(setUserOffline({userId: data.userId}));
      console.log('offline', data.userId)
    };

    const handleChatDeleted = (data: string) => {
      dispatch(deleteChat(data));
      dispatch(closeCurrentChat());
    };

    socket.on("newDm", handleNewDm);
    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);
    socket.on("chatDeleted", handleChatDeleted);

    return () => {
      socket.off("newDm", handleNewDm);
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
      socket.off("chatDeleted", handleChatDeleted);
    };
  }, [userId]);
};
