import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

const LOADING = "loading";

describe("Button", () => {
	it("renders", () => {
		// Setup
		render(<Button />);

		// Assert
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("can be disabled", () => {
		// Setup
		render(<Button disabled />);

		// Assert
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("can have text", () => {
		// Setup
		const buttonText = "Test";
		render(<Button text={buttonText} />);

		// Assert
		expect(screen.getByRole("button")).toContainHTML(buttonText);
	});

	it("triggers a callback on click", async () => {
		// Setup
		const onClickMock = jest.fn();
		render(<Button onClick={onClickMock} />);

		// Act
		await userEvent.click(screen.getByRole("button"));

		// Assert
		expect(onClickMock).toHaveBeenCalled();
	});

	it("creates a screenreader friendly alter when loading", async () => {
		// Setup
		render(<Button isLoading />);

		// Assert
		expect(screen.getByText(LOADING)).toBeInTheDocument();
	});
});
