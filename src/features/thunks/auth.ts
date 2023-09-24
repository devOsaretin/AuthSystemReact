import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUser, LoginBody } from "../../interfaces/authentication";
import { AxiosError } from "axios";
import api from "../../client";

export const getAuthUser = createAsyncThunk(
	"auth/authUser",
	async (_, thunkAPI) => {
		try {
			const response = await api.get<AuthUser>("/users/me");
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(error.message);
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
			sessionStorage.setItem("token", response.data.token);
			thunkAPI.dispatch(getAuthUser());
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue(error);
		}
	}
);
