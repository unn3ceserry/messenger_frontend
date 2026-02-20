import { mainApi } from "@/shared";
import {
  UserCompleteData,
  UserType,
  VisibilityField,
  WhoCanSeen,
} from "../model";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    searchUser: builder.query<Array<UserType>, string>({
      query: (searchText) => `/users/search/user?searchText=${searchText}`
    }),
    setCompleteData: builder.mutation<void, UserCompleteData>({
      query: ({ birthday, email, cloudPassword }) => ({
        url: "/account/set-complete-data",
        method: "POST",
        body: { birthday, email, cloudPassword },
      }),
      invalidatesTags: (_, __, { email }) => [{ type: "sessions", id: email }],
    }),
    getMe: builder.query<UserType, void>({
      query: () => "/account/me",
      providesTags: ["users", "sessions"],
    }),
    // PASSWORD REQUESTS
    setPassword: builder.mutation<
      boolean,
      { password: string; confirmPassword: string }
    >({
      query: ({ confirmPassword, password }) => ({
        url: "/account/set-password",
        body: { confirmPassword, password },
        method: "POST",
      }),
      invalidatesTags: ["sessions"],
    }),
    removePassowrd: builder.mutation<boolean, void>({
      query: () => ({
        url: "/account/remove-password",
        method: "DELETE",
      }),
      invalidatesTags: ["sessions"],
    }),
    // EMAIL REQUESTS
    setEmail: builder.mutation<boolean, string>({
      query: (email) => ({
        url: "/account/set-email",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["sessions"],
    }),
    updateEmail: builder.mutation<
      boolean,
      { newEmail: string; cloudPassword?: string }
    >({
      query: ({ newEmail, cloudPassword }) => ({
        body: { newEmail, cloudPassword },
        method: "PATCH",
        url: "/account/update-email",
      }),
      invalidatesTags: ["sessions"],
    }),
    // BIRTHDAY REQUESTS
    setBirthday: builder.mutation<boolean, string>({
      query: (date) => ({
        url: "/account/set-birthday",
        method: "POST",
        body: { date },
      }),
      invalidatesTags: ["sessions"],
    }),
    deleteBirthday: builder.mutation<boolean, void>({
      query: () => ({ url: "/account/remove-birthday", method: "DELETE" }),
      invalidatesTags: ["sessions"],
    }),
    // BIO REQUESTS
    setBio: builder.mutation<boolean, string>({
      query: (bio) => ({
        url: "/account/set-bio",
        method: "POST",
        body: { bio },
      }),
      invalidatesTags: ["sessions"],
    }),
    deleteBio: builder.mutation<boolean, void>({
      query: () => ({ url: "/account/remove-bio", method: "DELETE" }),
      invalidatesTags: ["sessions"],
    }),
    // NAME REQUESTS
    setName: builder.mutation<boolean, { lastname: string; firstname: string }>(
      {
        query: ({ firstname, lastname }) => ({
          url: "/account/set-name",
          method: "POST",
          body: { firstname, lastname },
        }),
        invalidatesTags: ["sessions"],
      },
    ),
    changeUsername: builder.mutation<boolean, string>({
      query: (username) => ({
        url: "/account/change-username",
        method: "PATCH",
        body: { username },
      }),
      invalidatesTags: ["sessions"],
    }),
    // BLOCK USERS REQUESTS
    blockUsers: builder.mutation<boolean, string>({
      query: (id) => ({
        url: "/users/block-user",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["sessions"],
    }),
    unBlockUsers: builder.mutation<boolean, string>({
      query: (id) => ({
        url: "/users/unblock-user",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["sessions"],
    }),
    // VISIBILITY REQUETS
    setVisibility: builder.mutation<
      boolean,
      { field: VisibilityField; whoCanSee: WhoCanSeen }
    >({
      query: ({ field, whoCanSee }) => ({
        url: "/account/set-visibility",
        body: { field, whoCanSee },
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    // USER DATA REQUESTS
    getUserData: builder.query<
      Partial<UserType>,
      { id?: string; username?: string }
    >({
      query: ({ id, username }) =>
        `/users/get-user-data?${id ? `id=${id}` : `username=${username}`}`,
      providesTags: ["users"],
    }),
    isMyContact: builder.query<boolean, string>({
      query: (username) => `/users/is-my-contact?username=${username}`,
      providesTags: ['users', 'contacts']
    }),
    // AVATAR REQUESTS
    featAvatar: builder.mutation<{ url: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          method: "POST",
          body: formData,
          url: "/account/feat-avatar",
        };
      },
      invalidatesTags: ["users"],
    }),
    removeAvatar: builder.mutation<boolean, number>({
      query: (index) => {
        return {
          method: "POST",
          body: { index },
          url: "/account/remove-avatar",
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
  overrideExisting: true,
});
