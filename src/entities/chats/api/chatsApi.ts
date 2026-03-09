import { mainApi } from "@/shared";
import type { Chat, Message } from "../model";

export const chatsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDm: builder.query<Chat, string>({
      query: (userId) => `/chat/dm?userId=${userId}`,
    }),
    getMyDms: builder.query<Array<Chat>, void>({
      query: () => "/chat/dms",
      providesTags: ["chats"],
    }),
    getMessages: builder.query<Array<Message>, string>({
      query: (chatId) => `/chat/messages?chatId=${chatId}`
    }),
    deleteChat: builder.mutation<boolean, string>({
      query: (chatId) => ({url: '/chat/delete', method: 'DELETE', body: {chatId}}),
      invalidatesTags: ['chats']
    })
  }),
  overrideExisting: true,
});
