import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../interfaces/authentication";
import { getAuthUser, login, register } from "../thunks/auth";

const token = localStorage.getItem("token") ?? null;

interface AuthState {
	authUser: AuthUser | null;
	isLoading: boolean;
	isError: boolean;
	errorMessage?: string;
	isAuthenticated: boolean;
	token: string | null;
}

const initialState: AuthState = {
	authUser: null,
	isLoading: false,
	isError: false,
	errorMessage: undefined,
	isAuthenticated: false,
	token,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			localStorage.removeItem("token");
			state.authUser = null;
			state.isAuthenticated = false;
			state.isError = false;
			state.errorMessage = undefined;
			state.isLoading = false;
			state.token = null;
		},
		clearErrors(state) {
			state.errorMessage = undefined;
			state.isError = false;
		},
	},

	extraReducers: builder => {
		builder.addCase(
			getAuthUser.fulfilled,
			(state, action: PayloadAction<AuthUser>) => {
				state.authUser = action.payload;
				state.isAuthenticated = true;
				state.errorMessage = undefined;
				state.isError = false;
				state.isLoading = false;
			}
		);

		builder.addCase(getAuthUser.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(getAuthUser.rejected, (state, action) => {
			localStorage.removeItem("token");
			state.isLoading = false;
			state.isError = true;
			state.isAuthenticated = false;
			state.errorMessage = action.error.message;
			state.token = null;
		});

		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload;
			state.errorMessage = undefined;
			state.isError = false;
			state.isLoading = false;
		});

		builder.addCase(login.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isAuthenticated = false;
			state.errorMessage = action.payload as string;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			state.isAuthenticated = false;
			state.token = null;
			state.errorMessage = undefined;
			state.isError = false;
			state.isLoading = false;
		});

		builder.addCase(register.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(register.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.isAuthenticated = false;
			state.errorMessage = action.payload as string;
		});
	},
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
