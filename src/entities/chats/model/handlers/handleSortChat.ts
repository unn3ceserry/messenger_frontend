import { Chat } from "../types/chatsTypes";

export const handleSortChat = (chats?: Array<Chat>) => {
  return [...chats??[]].sort((a, b) => {
    const getLatest = (chat: Chat) => {
      const timestamps =
        chat.messages?.map((m) => new Date(m.updatedAt).getTime()) || [];
      timestamps.push(new Date(chat.createdAt).getTime());
      return Math.max(...timestamps);
    };

    return getLatest(a) - getLatest(b);
  });
};
