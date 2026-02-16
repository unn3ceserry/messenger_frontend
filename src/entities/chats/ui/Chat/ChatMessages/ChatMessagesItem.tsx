"use client";

import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import MessagePopup from "./MessagePopup/MessagePopup";
import { Message } from "@/entities/chats/model";

interface Props {
  message: Message;
  isMy: boolean;
  createdAt: Date;
}

const ChatMessagesItem: FC<Props> = ({
  isMy,
  message,
  createdAt,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <div
      className={`flex text-default-text-color w-full ${isMy ? "justify-end" : "justify-start"}`}
    >
      <div
        onContextMenu={(e) => {
          if (isMy) {
            e.preventDefault();
            setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
            setIsOpen((prev) => !prev);
          }
        }}
        className={`p-2.5 py-1.5 rounded-t-2xl flex flex-col ${isMy ? "items-end" : "items-start"} justify-center
        ${isMy ? "rounded-bl-2xl bg-accent-chat-bg-color" : "rounded-br-2xl bg-chatui-bg"}
        w-max max-w-[70%] break-all
      `}
      >
        <p>{message.text}</p>
        <p
          className={`text-[.75rem] shrink-0 ${!isMy ? "text-message-time-color" : "text-my-message-time-color"}`}
        >
          {new Date(createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MessagePopup
            setIsOpen={setIsOpen}
            position={position}
            message={message}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessagesItem;
