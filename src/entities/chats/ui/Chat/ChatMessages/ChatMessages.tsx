'use client'

import { useAppSelector } from "@/app";
import { getCurrentChat, useMessageSocket } from "@/entities/chats/model";
import ChatMessagesItem from "./ChatMessagesItem";
import { FC } from "react";

interface Props {
  userId: string;
}

const ChatMessages: FC<Props> = ({ userId }) => {
  const currentChat = useAppSelector(getCurrentChat);
  useMessageSocket(userId);

  return (
    <div className="flex flex-col w-full max-w-170 gap-2 justify-end h-screen p-3">
      {currentChat?.messages?.map(el => (
        <ChatMessagesItem
          key={el.id}
          message={el.text}
          createdAt={el.createdAt}
          isMy={userId === el.senderId}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
