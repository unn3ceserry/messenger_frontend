'use client'

import { chatsApi } from "@/entities/chats/api";
import { Spinner } from "@/shared";
import { FC } from "react";
import {motion} from 'framer-motion'
import ChatItem from "../ChatItem/ChatItem";

interface Props {
  userId: string;
}

const ChatsSideBar: FC<Props> = ({userId}) => {
  const { data: dataDms, isLoading } = chatsApi.useGetMyDmsQuery();

  if (isLoading || !dataDms) return <Spinner />;
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col w-full p-2"
    >
      {dataDms.map((el) => {
        const user = el.members?.filter((el) => el.userId !== userId)[0].user;
        return (
          <ChatItem
            firstName={user?.firstName}
            lastName={user?.lastName}
            hasAvatar={!!user?.avatars.length}
            avatar={user?.avatars ? user.avatars[user.avatars.length - 1] : ""}
            size={50}
            key={el.id}
            message={
              el.messages ? el.messages[el.messages.length - 1].text : ""
            }
          />
        );
      })}
    </motion.div>
  );
};

export default ChatsSideBar;