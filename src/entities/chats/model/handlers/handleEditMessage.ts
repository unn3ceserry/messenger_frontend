import { makeStore } from "@/app";
import { Socket } from "socket.io-client";
import { chatsSlice } from "../stores/chatsSlice";

export const handleEditMessage = (
  socket: Socket,
  messageId: string,
  newText: string,
) => {
  socket.emit("editMessage", {
    messageId,
    newText,
  });
  makeStore.dispatch(chatsSlice.actions.removeEditingMessage());
};
