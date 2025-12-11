import { mainApi } from "@/shared";
import { SignInType, SignUpType } from "../model";
import { FindUserType } from "@/entities/user";
import { url } from "inspector";

export const sessionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<void, SignInType>({
      query: ({ number, cloudPassword, code }) => ({
        url: "/session/login",
        method: "POST",
        body: { number, cloudPassword, code },
      }),
    }),
    signUp: builder.mutation<void, SignUpType>({
      query: ({ number, firstName, lastName, username, code }) => ({
        url: "/session/register",
        method: "POST",
        body: { number, firstName, lastName, username, code },
      }),
    }),
    logout: builder.query<void, void>({
      query: () => "/session/logout",
    }),
    getMyAccountSessions: builder.query<Array<FindUserType>, void>({
      query: () => "/session/get/all",
      providesTags: ['sessions'],
    }),
    getMySession: builder.query<Array<FindUserType>, void>({
      query: () => "/session/get/all",
      providesTags: ['sessions'],
    }),
    removeSessionById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/session/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_,__, id) => [{type: "sessions", id}],
    }),
    clearAllSessionsWithoutMy: builder.mutation<void, void>({
      query: () => ({
        url: "/session/clear/all",
        method: "DELETE",
      }),
      invalidatesTags: ['sessions', 'users'],
    }),
    coockieClear: builder.mutation<void, void>({
      query: () => ({
        url: "/session/coockie/clear",
        method: "DELETE",
      }),
      invalidatesTags: ['sessions', 'users'],
    }),

    resendCode: builder.mutation<void, string>({
      query: (number) => ({
        body: {number},
        url: "/session/resend/code",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});
