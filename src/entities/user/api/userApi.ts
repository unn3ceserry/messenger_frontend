import { mainApi } from "@/shared";
import {
  UserCompleteData,
  UserType,
  VisibilityField,
  WhoCanSeen,
} from "../model";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
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
    removePassowrd: builder.mutation<boolean, string>({
      query: (password) => ({
        url: "/account/remove-password",
        method: "DELETE",
        body: { password },
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
      }
    ),
    changeUsername: builder.mutation<boolean, string>({
      query: (username) => ({
        url: "/account/change-username",
        method: "PATCH",
        body: { username },
      }),
      invalidatesTags: (_, __, username) => [
        { type: "sessions", id: username },
      ],
    }),
    // BLOCK USERS REQUESTS
    blockUsers: builder.mutation<boolean, string>({
      query: (id) => ({
        url: "/account/block-user",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (_, __, id) => [{ type: "users", id }],
    }),
    unBlockUsers: builder.mutation<boolean, string>({
      query: (id) => ({
        url: "/account/unblock-user",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (_, __, id) => [{ type: "users", id }],
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
    getUserData: builder.query<boolean, string>({
      query: (username) => `/account/get-user-data?${username}=username`,
      providesTags: ["users"],
    }),
  }),
  overrideExisting: true,
});
