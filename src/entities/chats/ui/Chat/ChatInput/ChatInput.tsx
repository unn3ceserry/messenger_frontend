"use client";

import { Paperclip, Smile } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSocketConnection } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/app";
import { getCurrentChat, getEditingMessage, removeEditingMessage } from "@/entities/chats/model";
import { getMyData } from "@/entities/user";
import EditingMessage from "./EditingMessage";

const ChatInput = () => {
  const t = useTranslations();
  const userId = useAppSelector(getMyData);
  const currentChat = useAppSelector(getCurrentChat);
  const editingMessage = useAppSelector(getEditingMessage);

  const [value, setValue] = useState("");
  const dispatch = useAppDispatch()
  const socket = useSocketConnection(userId);

  useEffect(() => {
    if (editingMessage && currentChat?.id === editingMessage.chatId) {
      setValue(editingMessage.text);
    } else {
      setValue("");
    }
  }, [editingMessage, currentChat?.id]);

  const handleSendMsg = () => {
    if (!value.trim()) return;

    if (editingMessage) {
      socket.emit("editMessage", {
        messageId: editingMessage.id,
        newText: value.trim(),
      });
      dispatch(removeEditingMessage())
    } else {
      socket.emit("sendMessage", {
        chatId: currentChat?.id,
        text: value.trim(),
      });
    }

    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMsg();
    }
  };

  const isInputEmpty = !value;

  return (
    <div className="flex w-full items-center justify-center gap-3 mb-5">
      <div className="flex flex-col w-full items-end backdrop-blur-xl p-3 gap-3 px-4 rounded-2xl bg-chatui-bg">
        <AnimatePresence>
          {editingMessage && <EditingMessage />}
        </AnimatePresence>

        <div className="flex w-full items-center justify-between gap-3">
          <Smile className="text-input-icons-color cursor-pointer hover:text-accent duration-300" />

          <div className="w-full relative">
            <AnimatePresence>
              {isInputEmpty && (
                <motion.label
                  htmlFor="inputForMessage"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 origin-left pointer-events-none text-app-inputs-placeholder"
                >
                  {t("chat.messagePlaceholder")}
                </motion.label>
              )}
            </AnimatePresence>

            <input
              id="inputForMessage"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="outline-0 w-full bg-transparent"
            />
          </div>

          <Paperclip className="text-input-icons-color cursor-pointer hover:text-accent duration-300" />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
