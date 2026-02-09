"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatItem from "../ChatItem/ChatItem";
import { Chat, setCurrentChat } from "@/entities/chats/model";
import { useAppDispatch } from "@/app";
import ActionPopup from "./ActionPopup/ActionPopup";

interface Props {
  userId: string;
  myDms: Chat[];
}

const ChatsSideBar: FC<Props> = ({ userId, myDms }) => {
  const dispatch = useAppDispatch();

  const [chatId, setChatId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleOnClick = (chat: Chat) => {
    dispatch(setCurrentChat(chat));
  };

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
        const lastMessage =
          chat.messages?.[chat.messages.length - 1]?.text ?? "";

        return (
          <ChatItem
            onContextMenu={(e) => {
              setIsOpen((prev) => !prev);
              setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
              setChatId(chat.id);
            }}
            onClick={() => handleOnClick(chat)}
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

      <AnimatePresence>
        {isOpen && <ActionPopup chatId={chatId} position={position} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatsSideBar;
