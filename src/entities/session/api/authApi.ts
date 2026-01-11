import { mainApi } from "@/shared";
import { SignInType, SignUpType } from "../model";
import { Session } from "@/entities";

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
    getMyAccountSessions: builder.query<Array<Session>, void>({
      query: () => "/session/get/all",
      providesTags: ['sessions'],
    }),
    getMySession: builder.query<Session, void>({
      query: () => "/session/get/current",
      providesTags: ['sessions'],
    }),
    removeSessionById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/session/remove/`,
        method: "DELETE",
        body: {id}
      }),
      invalidatesTags: ['sessions'],
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
