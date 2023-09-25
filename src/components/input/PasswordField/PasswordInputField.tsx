import clsx from "clsx";
import { Eye, EyeSlash } from "phosphor-react";
import { forwardRef, useState } from "react";

/** This is just a styled input with some mandatory props */
type PasswordInputFieldProperties = React.HTMLProps<HTMLInputElement> & {
	/** Disabled state */
	disabled?: boolean;
	/** ID of the input field. Used to match with label */
	id: string;
	/** Label to display with the input */
	label?: string;
	/** Name of the field */
	name: string;
	/** Placeholder to display when the field is empty */
	placeholder?: string;

	error?: boolean;

	/** Error description */
	errorText?: string;
};
// eslint-disable-next-line react/display-name
const PasswordInputField = forwardRef<
	HTMLInputElement,
	PasswordInputFieldProperties
>(
	(
		{
			disabled,
			id,
			label,
			name,
			placeholder,
			error,
			errorText,
			...rest
		}: PasswordInputFieldProperties,
		ref
	): JSX.Element => {
		const [passwordShown, setPasswordShown] = useState(false);
		const showPassword = () => {
			setPasswordShown(!passwordShown);
		};
		const [isFocused, setIsFocused] = useState(false);

		return (
			<>
				<div
					className={clsx(
						"flex h-12 rounded-sm bg-input-grey px-2 border",
						{ "border-grey": !error },
						{ "h-12": disabled },
						{ "border border-error": error }
					)}>
					<input
						disabled={disabled}
						id={name}
						name={name}
						placeholder={placeholder}
						type={passwordShown ? "text" : "password"}
						autoComplete="off"
						{...rest}
						ref={ref}
						value={undefined}
						onFocusCapture={() => setIsFocused(true)}
						onBlurCapture={() => setIsFocused(false)}
						className="flex-1 bg-input-grey pr-2 text-grey focus:border-none focus:outline-none"
					/>
					<button
						className={clsx("bg-input-grey text-grey", {
							"opacity-40": disabled,
						})}
						disabled={disabled}
						type="button"
						onMouseDown={showPassword}
						aria-label="show and hide password toggle">
						{passwordShown ? (
							<EyeSlash size={24} weight="bold" />
						) : (
							<Eye size={24} weight="bold" />
						)}
					</button>
				</div>
				{error && errorText && (
					<span className="text-[0.75rem] text-error inline-block my-1">
						{errorText}
					</span>
				)}
			</>
		);
	}
);

export default PasswordInputField;
