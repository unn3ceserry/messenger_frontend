"use client";

import { useEffect } from "react";
import { Chat } from "@/entities/chats/model";
import { getSocket } from "@/shared";

export const useChatSocket = (
  userId: string,
  onNewDm: (chat: Chat) => void
) => {
  useEffect(() => {
    if (!userId) return;
    const socket = getSocket(userId);

    const handleNewDm = (chat: Chat) => onNewDm(chat);

    socket.on("newDm", handleNewDm);

    return () => {
      socket.off("newDm", handleNewDm);
    };
  }, [userId, onNewDm]);
};