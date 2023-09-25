import { screen, render } from "@testing-library/react";
import PasswordInputField from "./PasswordInputField";
import userEvent from "@testing-library/user-event";

const PLACE_HOLDER_TEXT = "Enter your password";

describe("PasswordInput", () => {
	render(
		<PasswordInputField
			id="password"
			name="password"
			placeholder={PLACE_HOLDER_TEXT}
		/>
	);
	it("renders correctly on the page", () => {
		expect(
			screen.getByLabelText("show and hide password toggle")
		).toBeInTheDocument();

		expect(screen.getByPlaceholderText(PLACE_HOLDER_TEXT)).toBeInTheDocument();
	});

	it("hides the user input by default", () => {
		const password = "Password";
		render(
			<PasswordInputField
				id="password"
				name="password"
				placeholder={PLACE_HOLDER_TEXT}
			/>
		);
		userEvent.type(screen.getByPlaceholderText(PLACE_HOLDER_TEXT), password);
		expect(screen.getByPlaceholderText(PLACE_HOLDER_TEXT)).toHaveAttribute(
			"type",
			"password"
		);
	});
});

describe("Password Visibility Toggle", () => {
	it("is shown at all times", () => {
		render(
			<PasswordInputField
				id="password"
				name="password"
				placeholder={PLACE_HOLDER_TEXT}
			/>
		);
		expect(screen.getByRole("button")).toBeVisible();
	});

	it("makes text visible when clicked", async () => {
		render(
			<PasswordInputField
				id="password"
				name="password"
				placeholder={PLACE_HOLDER_TEXT}
			/>
		);
		await userEvent.click(screen.getByRole("button"));
		expect(screen.getByPlaceholderText(PLACE_HOLDER_TEXT)).toHaveAttribute(
			"type",
			"text"
		);
	});

	it("makes text invisible when clicked again", async () => {
		render(
			<PasswordInputField
				id="password"
				name="password"
				placeholder={PLACE_HOLDER_TEXT}
			/>
		);
		await userEvent.click(screen.getByRole("button"));
		expect(screen.getByPlaceholderText(PLACE_HOLDER_TEXT)).toHaveAttribute(
			"type",
			"text"
		);

		await userEvent.click(screen.getByRole("button"));
		expect(screen.getByPlaceholderText(PLACE_HOLDER_TEXT)).toHaveAttribute(
			"type",
			"password"
		);
	});
});
