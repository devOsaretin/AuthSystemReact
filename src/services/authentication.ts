import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginBody, RegisterBody } from "../interfaces/authentication";

export const authenticationApi = createApi({
	reducerPath: "authentication",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://localhost:3000/api",
		prepareHeaders: headers => {
			const token = sessionStorage.getItem("token") || "";
			headers.set("Authorization", token);
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

		getAuthUser: builder.query({
			query: () => {
				return `/users/me`;
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useGetAuthUserQuery,
} = authenticationApi;
