import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../interfaces/authentication";
import { getAuthUser, login } from "../thunks/auth";

interface AuthState {
	authUser: AuthUser | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	errorMessage?: string;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	authUser: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	errorMessage: undefined,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.authUser = null;
			sessionStorage.removeItem("token");
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
			state.isLoading = false;
			state.isError = true;
			state.isAuthenticated = false;
			state.errorMessage = action.error.message;
		});

		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuthenticated = true;
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
			state.errorMessage = action.error.message;
		});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
