import { makeStore } from "@/app";
import { closeCurrentChat, removeEditingMessage } from "@/entities";

export const handleKeyDown = (e: KeyboardEvent) => {
  const isEditingMessage = makeStore.getState().chats.editMessage;
  const currentChat = makeStore.getState().chats.currentChat;

  switch (e.key) {
    case "Escape":
      e.preventDefault();
      if (!!isEditingMessage) {
        makeStore.dispatch(removeEditingMessage());
      } else if (!!currentChat) {
        makeStore.dispatch(closeCurrentChat());
      }
      break;
    default:
      break;
  }
};
