import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
}

const initialState: AuthState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state) {},

		logout(state) {},

		register(state) {},
	},
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
