import { mainApi } from "@/shared";
import type { Chat } from "../model";

export const chatsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDm: builder.query<Chat, string>({
      query: (userId) => `/chat/get/dm?userId${userId}`,
      providesTags: ['chats']
    }),
    getMyDms: builder.query<Array<Chat>,void>({
      query: () => '/chat/get/my-dms'
    })
  }),
  overrideExisting: true
})