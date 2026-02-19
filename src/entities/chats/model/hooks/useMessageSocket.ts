"use client";

import { useEffect, useRef } from "react";
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioInChatRef = useRef<HTMLAudioElement | null>(null);
  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/message.mp3");
    audioInChatRef.current = new Audio("/sounds/messageInChat.mp3");
  }, []);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    if (!userId) return;

    const socket = useSocketConnection(userId);

    const handleAddMessage = (message: Message) => {
      const isValidUser = message.senderId !== userId;
      const isInCurrentChat = currentChatRef.current?.id === message.chatId;
      if (isValidUser) {
        if (isInCurrentChat) {
          audioInChatRef.current?.play();
        } else {
          audioRef.current?.play();
        }
      }

      dispatch(addNewMessage({ chatId: message.chatId, message }));
    };

    const handleEditMessage = (message: Message) => {
      dispatch(editMessage(message));
    };

    const handleDeleteMessage = (message: Message) => {
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
  }, [userId, dispatch]);
}
