import { Socket } from "socket.io-client";
import { handleEditMessage } from "./handleEditMessage";
import { makeStore } from "@/app";

export const handleSendMessage = (socket: Socket, value: string, setValue: (v: string) => void, chatId: string) => {
  if(!value) return;
  const editingMessage = makeStore.getState().chats.editMessage;

  if (editingMessage) {
    handleEditMessage(socket, editingMessage.id, value);
  } else {
    socket.emit("sendMessage", {
      chatId,
      text: value,
    });
  }

  setValue("");
};
