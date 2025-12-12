import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  createApi,
  FetchBaseQueryError,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch({ type: "session/coockie/clear" });
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["users", "sessions"],
  endpoints: () => ({}),
});
