import { mainApi } from "@/shared";
import { UserCompleteData } from "../model";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    setCompleteData: builder.mutation<void, UserCompleteData>({
      query: ({ birthday, email, cloudPassword }) => ({
        url: "/account/set-complete-data",
        method: "POST",
        body: { birthday, email, cloudPassword },
      }),
      invalidatesTags: (_,__, {email}) => [{type: 'sessions', id: email}]
    }),
  }),
  overrideExisting: true,
});
