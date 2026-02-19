import { CircleSlash, Trash } from "lucide-react";
import { AppDispatch } from "@/app/store/store";
import { chatsApi } from "@/entities/chats";
import { userApi } from "../api";

export const userActionsMenuElements = (
  dispatch: AppDispatch,
  chatId: string,
  userId: string,
  isBlocked: boolean,
) => [
  {
    icon: <CircleSlash size={20} className="text-icons-color" />,
    title: isBlocked ? "chat.user.unblockUser" : "chat.user.blockUser",
    isMain: true,
    isRed: false,
    isLast: false,
    isFirst: true,
    onClick: () => {
      if(isBlocked) {
        dispatch(userApi.endpoints.unBlockUsers.initiate(userId))
      } else {
        dispatch(userApi.endpoints.blockUsers.initiate(userId))
      }
    },
  },
  {
    icon: <Trash size={20} />,
    title: "chat.deleteChat",
    isMain: false,
    isRed: true,
    isLast: true,
    isFirst: false,
    onClick: () => dispatch(chatsApi.endpoints.deleteChat.initiate(chatId)),
  },
];
