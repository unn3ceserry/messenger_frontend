import { mainApi } from "@/shared";
import type { Chat } from "../model";

export const chatsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDm: builder.query<Chat, string>({
      query: (userId) => `/chat/get/dm?userId=${userId}`,
    }),
    getMyDms: builder.query<Array<Chat>, void>({
      query: () => "/chat/get/my-dms",
      providesTags: ["chats"],
    }),
  }),
  overrideExisting: true,
});
