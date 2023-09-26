import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegistrationSuccess from "./RegistrationSuccess";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));
const REGISTRATION_TEXT = "Registration was successful!";

describe("Registration Success", () => {
	it("renders correctly", () => {
		render(
			<MemoryRouter>
				<RegistrationSuccess />
			</MemoryRouter>
		);
		expect(screen.getByText(REGISTRATION_TEXT)).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("navigates to login page when button is clicked", async () => {
		const navigateMock = jest.fn();
		jest
			.spyOn(require("react-router-dom"), "useNavigate")
			.mockReturnValue(navigateMock);
		const loginRoute = "/login";
		render(
			<MemoryRouter initialEntries={["/registration-success"]}>
				<RegistrationSuccess />
			</MemoryRouter>
		);

		await userEvent.click(screen.getByRole("button"));
		expect(navigateMock).toHaveBeenCalledWith(loginRoute);
	});
});
