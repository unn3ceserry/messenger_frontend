'use client'

import { FC } from "react";

interface Props {
  message: string;
  isMy: boolean;
  createdAt: Date;
}

const ChatMessagesItem: FC<Props> = ({isMy, message, createdAt}) => {
  return (
    <div className={`flex ${isMy ? 'bg-accent' : 'bg-chatui-bg'} p-2.5 rounded-t-2xl rounded-br-2xl rounded-br-0 w-max max-w-full break-all`}>
      <p>{message}</p>
      <p>{new Date(createdAt).getDate()}</p>
    </div>
  );
};

export default ChatMessagesItem;