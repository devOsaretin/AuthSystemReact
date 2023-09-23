import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authenticationApi } from "../services/authentication";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authenticationApi.reducerPath]: authenticationApi.reducer,
	},

	middleware: curryGetDefaultMiddleware =>
		curryGetDefaultMiddleware().concat(authenticationApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
