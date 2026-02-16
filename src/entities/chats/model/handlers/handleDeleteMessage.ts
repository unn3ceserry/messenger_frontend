import { Socket } from "socket.io-client";

export const handleDeleteMessage = (socket: Socket, messageId: string) => {
  socket.emit("deleteMessage", { messageId });
};
