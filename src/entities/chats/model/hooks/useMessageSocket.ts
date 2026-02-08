'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { getSocket } from "@/shared";
import { addNewMessage, deleteMessage, editMessage, getCurrentChat } from "../stores/currentChatSlice";
import { Message } from "../types/chatsTypes";

export function useMessageSocket(userId: string) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(getCurrentChat);

  useEffect(() => {
    if (!userId) return;

    const socket = getSocket(userId);

    const handleAddMessage = (message: Message) => {
      if (currentChat?.id !== message.chatId) return;

      dispatch(addNewMessage(message));
    };

    const handleEditMessage = (message: Message) => {
      if (currentChat?.id !== message.chatId) return;

      dispatch(editMessage(message));
    };

    const handleDeleteMessage = (message: Message) => {
      if (currentChat?.id !== message.chatId) return;

      dispatch(deleteMessage(message.id));
    };

    socket.on("message:created", handleAddMessage);
    socket.on("message:edited", handleEditMessage);
    socket.on("message:deleted", handleDeleteMessage);

    return () => {
      socket.off("message:created", handleAddMessage);
      socket.off("message:edited", handleEditMessage);
      socket.off("message:deleted", handleDeleteMessage);
    };
  }, [userId, currentChat?.id, dispatch]);

  useEffect(() => {
    if (!userId || !currentChat?.id) return;

    const socket = getSocket(userId);

    socket.emit("joinChat", { chatId: currentChat.id });

  }, [userId, currentChat?.id]);
}
