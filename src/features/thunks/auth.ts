import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUser, LoginBody } from "../../interfaces/authentication";
import { AxiosError } from "axios";
import api from "../../client";
import { RootState } from "../../app/store";

export const getAuthUser = createAsyncThunk(
	"auth/authUser",
	async (_, thunkAPI) => {
		const rootState = thunkAPI.getState() as RootState;
		try {
			const response = await api.get<AuthUser>("/users/me", {
				headers: {
					Authorization: `Bearer ${rootState.auth.token}`,
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(error.response?.data.message);
			}
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (data: LoginBody, thunkAPI) => {
		try {
			const response = await api.post<{ token: string }>("/login", data);
			if (response.data.token) {
				localStorage.setItem("token", response.data.token);
			}

			return response.data.token;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(error.response?.data.message);
			}
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const register = createAsyncThunk(
	"auth/register",
	async (data: FormData, thunkAPI) => {
		try {
			const response = await api.post("/register", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.status;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(error.response?.data.message);
			}
			return thunkAPI.rejectWithValue(error);
		}
	}
);
