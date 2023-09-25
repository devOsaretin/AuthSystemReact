import clsx from "clsx";
import { forwardRef } from "react";

/** This is just a styled input with some mandatory props */
type TextInputFieldProps = React.HTMLProps<HTMLInputElement> & {
	/** Used to pass custom styles onto component */
	className?: string;
	/** Dirty field state */
	disabled?: boolean;
	/** Error state */
	error?: boolean;
	/** Error description */
	errorText?: string;
	/** ID of the input field. Used to match with label */
	id: string;
	/** Name of the field.  */
	name: string;
	/** RegEx pattern for limiting to numbers (useful for invoking keypad on mobile) */
	pattern?: string;
	/** Placeholder to display when the field is empty */
	placeholder?: string;
	/** type of the field */
	type: string;
	/** Field value */
	value?: string;
};

const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
	(
		{
			className,
			disabled,
			error,
			errorText,
			id,
			name,
			pattern,
			placeholder,
			type,
			value,
			...rest
		}: TextInputFieldProps,
		ref
	): JSX.Element => {
		return (
			<>
				<div
					className={clsx(
						"flex h-12 rounded-sm bg-input-grey  text-grey border",
						{ "border-grey": !error },
						{ "h-14": disabled },
						{ "border border-error": error }
					)}>
					<input
						data-testid={`${id}-test`}
						aria-invalid={error}
						disabled={disabled}
						id={id}
						name={name}
						pattern={pattern}
						placeholder={placeholder}
						type={type}
						{...rest}
						ref={ref}
						value={value}
						autoComplete="off"
						className={clsx(
							"flex-1 border-none px-2 text-grey focus:outline-none",
							{
								"border-mid-gray border-none bg-input-grey": !error,

								"opacity-40": disabled,
							},
							className
						)}
					/>
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

export default TextInputField;
