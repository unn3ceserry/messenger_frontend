"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useSocketConnection } from "@/shared";
import { Message } from "../types/chatsTypes";
import {
  addNewMessage,
  deleteMessage,
  editMessage,
  getCurrentChat,
} from "../stores/chatsSlice";

export function useMessageSocket(userId: string) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(getCurrentChat);

  useEffect(() => {
    if (!userId) return;

    const socket = useSocketConnection(userId);

    const handleAddMessage = (message: Message) => {
      console.log('handleAddMessage')
      dispatch(addNewMessage({ chatId: message.chatId, message }));
    };

    const handleEditMessage = (message: Message) => {
      dispatch(editMessage(message));
    };

    const handleDeleteMessage = (message: Message) => {
      console.log('handleDeleteMessage')
      dispatch(
        deleteMessage({ chatId: message.chatId, messageId: message.id }),
      );
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
}
