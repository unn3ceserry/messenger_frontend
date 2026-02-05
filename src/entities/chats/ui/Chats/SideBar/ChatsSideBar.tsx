"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import ChatItem from "../ChatItem/ChatItem";
import { Chat } from "@/entities/chats/model";

interface Props {
  userId: string;
  myDms: Chat[];
}

const ChatsSideBar: FC<Props> = ({ userId, myDms }) => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col w-full p-2"
    >
      {myDms.map((chat) => {
        const user = chat.members?.find((m) => m.userId !== userId)?.user;
        const lastMessage = chat.messages?.[chat.messages.length - 1]?.text ?? "";

        return (
          <ChatItem
            key={chat.id}
            firstName={user?.firstName}
            lastName={user?.lastName}
            avatar={user?.avatars?.[user.avatars.length - 1] ?? ""}
            hasAvatar={!!user?.avatars?.length}
            size={50}
            message={lastMessage}
          />
        );
      })}
    </motion.div>
  );
};

export default ChatsSideBar;
