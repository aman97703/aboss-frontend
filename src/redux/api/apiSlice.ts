import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../redux-constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  tagTypes: ["User", "Donations"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
