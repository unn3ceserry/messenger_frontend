"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { getSocket } from "@/shared";
import {
  addNewMessage,
  deleteMessage,
  editMessage,
  getCurrentChat,
} from "../stores/currentChatSlice";
import { Message } from "../types/chatsTypes";
import {
  addNewMessageInDm,
  deleteMessageInDm,
  editMessageInDm,
} from "../stores/myDmsSlice";

export function useMessageSocket(userId: string) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(getCurrentChat);

  useEffect(() => {
    if (!userId) return;

    const socket = getSocket(userId);

    const handleAddMessage = (message: Message) => {
      if (currentChat?.id === message.chatId) {
        dispatch(addNewMessage(message));
      }
      dispatch(addNewMessageInDm({ chatId: message.chatId, message }));
    };

    const handleEditMessage = (message: Message) => {
      if (currentChat?.id === message.chatId) {
        dispatch(editMessage(message));
      }
      dispatch(editMessageInDm(message));
    };

    const handleDeleteMessage = (message: Message) => {
      if (currentChat?.id === message.chatId) {
        dispatch(deleteMessage(message.id));
      }
      dispatch(
        deleteMessageInDm({ chatId: message.chatId, messageId: message.id }),
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
