import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/',
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  }
});

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
})