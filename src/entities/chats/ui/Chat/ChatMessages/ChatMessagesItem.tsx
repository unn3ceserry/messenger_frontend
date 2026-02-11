"use client";

import { FC } from "react";

interface Props {
  message: string;
  isMy: boolean;
  createdAt: Date;
}

const ChatMessagesItem: FC<Props> = ({ isMy, message, createdAt }) => {
  return (
    <div
      className={`flex text-default-text-color w-full ${isMy ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-2.5 py-1.5 rounded-t-2xl flex flex-col items-end justify-center
        ${isMy ? "rounded-bl-2xl bg-accent-chat-bg-color" : "rounded-br-2xl bg-chatui-bg"}
        w-max max-w-[70%] break-all
      `}
      >
        <p>{message}</p>
        <p
          className={`text-[.75rem] shrink-0 ${!isMy ? "text-message-time-color" : "text-my-message-time-color"}`}
        >
          {new Date(createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessagesItem;
