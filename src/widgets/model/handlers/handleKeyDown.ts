import { makeStore } from "@/app";
import {
  closeCurrentChat,
  closeOtherProfile,
  openComponent,
  removeEditingMessage,
} from "@/entities";

export const handleKeyDown = (e: KeyboardEvent) => {
  const isEditingMessage = makeStore.getState().chats.editMessage;
  const currentChat = makeStore.getState().chats.currentChat;
  const currentOpenComponent =
    makeStore.getState().userUiOpenComponent.openComponent;
  const usersProfileStastus = makeStore.getState().usersProfileStastus.openComponent;

  switch (e.key) {
    case "Escape":
      e.preventDefault();
      if (!!usersProfileStastus) {
        makeStore.dispatch(closeOtherProfile());
      } else if (!!currentOpenComponent) {
        makeStore.dispatch(openComponent(null));
      } else if (!!isEditingMessage) {
        makeStore.dispatch(removeEditingMessage());
      } else if (!!currentChat) {
        makeStore.dispatch(closeCurrentChat());
      }
      break;
    default:
      break;
  }
};
