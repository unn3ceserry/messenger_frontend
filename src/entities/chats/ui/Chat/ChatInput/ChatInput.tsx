"use client";

import { Forward, Paperclip, Smile } from "lucide-react";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getSocket } from "@/shared";
import { useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";

interface Props {
  userId: string;
}

const ChatInput: FC<Props> = ({ userId }) => {
  const t = useTranslations();
  const [value, setValue] = useState<string>("");

  const currentChat = useAppSelector(getCurrentChat);
  const socket = getSocket(userId);

  const handleSendMsg = () => {
    socket.emit("sendMessage", {
      chatId: currentChat?.id,
      text: value,
    });
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMsg();
    }
  };
  return (
    <div className="flex w-full items-center justify-center gap-3 mb-5">
      {/* INPUT */}
      <div className="flex w-full backdrop-blur-xl p-3 gap-3 px-4 rounded-2xl bg-chatui-bg">
        <Smile className="text-input-icons-color cursor-pointer hover:text-accent duration-300" />
        <div className="w-full relative">
          <AnimatePresence>
            {!!!value && (
              <motion.label
                htmlFor="inputForMessage"
                initial={{ x: 30, opacity: 0 }}
                exit={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 origin-left pointer-events-none text-app-inputs-placeholder"
              >
                {t("chat.messagePlaceholder")}
              </motion.label>
            )}
          </AnimatePresence>
          <input
            id="inputForMessage"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autoComplete="off"
            type="text"
            onKeyDown={handleKeyDown}
            className="outline-0 w-full"
          />
        </div>
        <Paperclip className="text-input-icons-color cursor-pointer hover:text-accent duration-300" />
      </div>

      {/* SEND */}
      <div
        onClick={handleSendMsg}
        className="flex items-center justify-center p-3 bg-chatui-bg rounded-2xl cursor-pointer"
      >
        <Forward className="text-input-icons-color hover:text-accent duration-300" />
      </div>
    </div>
  );
};

export default ChatInput;
