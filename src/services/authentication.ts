import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	AuthUser,
	LoginBody,
	RegisterBody,
} from "../interfaces/authentication";
import { logout } from "../features/auth/authSlice";

export const authenticationApi = createApi({
	reducerPath: "authentication",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api",
		prepareHeaders: headers => {
			const token = sessionStorage.getItem("token") || "";
			headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),

	endpoints: builder => ({
		login: builder.mutation<{ token: string }, LoginBody>({
			query: body => {
				return {
					url: "/login",
					method: "post",
					body,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					sessionStorage.setItem("token", data.token);
				} catch (error) {
					dispatch(logout());
				}
			},
		}),

		register: builder.mutation({
			query: (body: RegisterBody) => {
				return {
					url: "/register",
					method: "post",
					body,
				};
			},
		}),

		fetchAuthUser: builder.query<AuthUser, void>({
			query: () => {
				return `/users/me`;
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
				} catch (error) {
					dispatch(logout());
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useFetchAuthUserQuery,
} = authenticationApi;
