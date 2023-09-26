import { rest } from "msw";
import {
	mockGetAuthUserEndpoint,
	mockLoginEndpoint,
	mockRegisterEndpoint,
} from "./endpoints";
import {
	mockGetAuthUserController,
	mockLoginController,
	mockRegisterController,
} from "./contollers";

export const handlers = [
	// Handles a POST /login request
	rest.post(mockLoginEndpoint, mockLoginController),

	// Handles a GET /user/me request
	rest.get(mockGetAuthUserEndpoint, mockGetAuthUserController),

	// Handles a POST /register request

	rest.post(mockRegisterEndpoint, mockRegisterController),
];
