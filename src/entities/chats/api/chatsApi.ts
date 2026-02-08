import { mainApi } from "@/shared";
import type { Chat, Message } from "../model";

export const chatsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDm: builder.query<Chat, string>({
      query: (userId) => `/chat/get/dm?userId=${userId}`,
    }),
    getMyDms: builder.query<Array<Chat>, void>({
      query: () => "/chat/get/my-dms",
      providesTags: ["chats"],
    }),
    getMessages: builder.query<Array<Message>, string>({
      query: (chatId) => `/chat/get/messages?chatId=${chatId}`
    })
  }),
  overrideExisting: true,
});
