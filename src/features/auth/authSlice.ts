import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../interfaces/authentication";

interface AuthState {
	authUser: AuthUser | null;
}

const initialState: AuthState = {
	authUser: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthUser(state, action: PayloadAction<AuthUser>) {
			state.authUser = action.payload;
		},

		logout(state) {
			state.authUser = null;
			sessionStorage.removeItem("token");
		},
	},
});

export const { logout, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
