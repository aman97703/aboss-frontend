import type { IUserInfo } from "../features/authSlice";
import { USERS_URL } from "../redux-constants";
import { apiSlice } from "./apiSlice";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserInfo, ILoginUser>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation<IUserInfo, IRegisterUser>({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation<IUserInfo, IUpdateUser>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: {
          name: data.name,
          email: data.email,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query<IUserInfo, void>({
      query: () => ({
        url: `${USERS_URL}/current`,
        method: "GET",
        credentials:"include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
} = userApiSlice;
