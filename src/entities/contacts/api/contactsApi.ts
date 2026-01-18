import { mainApi } from "@/shared";
import { ContactsType, CreatedContactType } from "../model";

export const contactsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyContacts: builder.query<ContactsType, void>({
      query: () => "/contacts/get-contacts",
      providesTags: ["contacts"],
    }),
    addToContact: builder.mutation<CreatedContactType, string>({
      query: (username) => ({
        url: "/contacts/add-to-contact",
        method: "POST",
        body: { username },
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation<boolean, string>({
      query: (username) => ({
        url: "/contacts/delete-contact",
        method: "DELETE",
        body: { username },
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
  overrideExisting: true,
});
