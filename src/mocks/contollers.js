import { mockUser } from "./mockData/authUser";

const mockToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const mockLoginController = (req, res, ctx) => {
	const { email, password } = req.body;

	if (email === "mock@email.com" && password === "password123") {
		return res(ctx.status(200), ctx.json({ token: mockToken }));
	} else {
		return res(
			ctx.status(401),
			ctx.json({ message: "Invalid credentials", error: "Unauthorized" })
		);
	}
};

export const mockGetAuthUserController = (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(mockUser));
};

export const mockRegisterController = (req, res, ctx) => {
	return res(ctx.status(201));
};
