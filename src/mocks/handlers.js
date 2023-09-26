import { rest } from "msw";

export const handlers = [
	// Handles a POST /login request
	rest.post("/login", null),

	// Handles a GET /user/me request
	rest.get("/users/me", null),
];
