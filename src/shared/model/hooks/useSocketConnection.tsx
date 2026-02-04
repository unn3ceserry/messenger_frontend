"use client";

import { io, Socket } from "socket.io-client";

let socketApi: Socket | null = null;

export const getSocket = (userId: string): Socket => {
  if (!socketApi) {
    socketApi = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      auth: { userId },
    });

    socketApi.on("connect", () => console.log("Socket connected!", socketApi?.id));
    socketApi.on("disconnect", () => console.log("Socket disconnected"));
  }

  return socketApi;
};
