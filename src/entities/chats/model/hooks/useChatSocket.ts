"use client";

import { useEffect } from "react";
import { Chat, setNewDm } from "@/entities/chats/model";
import { getSocket } from "@/shared";
import { useAppDispatch } from "@/app";

export const useChatSocket = (
  userId: string,
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userId) return;
    const socket = getSocket(userId);

    const handleNewDm = (chat: Chat) => dispatch(setNewDm(chat));

    socket.on("newDm", handleNewDm);

    return () => {
      socket.off("newDm", handleNewDm);
    };
  }, [userId]);
};