import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextInputField from "./TextInputField";

describe("TextInputField", () => {
	it("renders", () => {
		render(
			<TextInputField
				id="input"
				name="text"
				type="text"
				placeholder="Enter Text"
			/>
		);
		expect(screen.getByPlaceholderText("Enter Text")).toBeInTheDocument();
	});

	it("accepts input", async () => {
		render(
			<TextInputField
				id="input"
				name="text"
				type="text"
				placeholder="Enter Text"
			/>
		);

		await userEvent.type(screen.getByPlaceholderText("Enter Text"), "Hello");

		expect(screen.getByPlaceholderText("Enter Text")).toHaveValue("Hello");
	});

	it("is disabled when disable is set to true", () => {
		render(
			<TextInputField
				id="input"
				name="text"
				type="text"
				placeholder="Enter Text"
				disabled={true}
			/>
		);
		expect(screen.getByPlaceholderText("Enter Text")).toBeDisabled();
	});
});
