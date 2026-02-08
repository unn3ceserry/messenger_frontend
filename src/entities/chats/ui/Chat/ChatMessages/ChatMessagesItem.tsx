'use client'

import { FC } from "react";

interface Props {
  message: string;
  isMy: boolean;
  createdAt: Date;
}

const ChatMessagesItem: FC<Props> = ({ isMy, message, createdAt }) => {
  return (
    <div className={`flex text-white w-full ${isMy ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2.5 rounded-t-2xl 
        ${isMy ? 'rounded-bl-2xl bg-accent' : 'rounded-br-2xl bg-chatui-bg'}
        w-max max-w-[70%] break-all
      `}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessagesItem;
