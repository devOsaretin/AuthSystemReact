/* eslint-disable react/require-default-props */
import clsx from "clsx";
import type { MouseEventHandler, ReactElement } from "react";
import { forwardRef } from "react";
import Spinner from "../../Feedback/Spinner/Spinner";

export interface ButtonProperties
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** The text displayed on the button */
	text?: string;
	/** The button variant */
	variant?: "primary" | "secondary";
	/** The size of the button */
	size?: "compact" | "regular";
	/** Makes the button fill the full width of its parent */
	fullWidth?: boolean;
	/** The event which will trigger when the button is activated */
	onClick?: MouseEventHandler<HTMLButtonElement>;
	/** Determines whether the button is disabled */
	isDisabled?: boolean;
	/** Sets the type of the button to submit, so that it can be used to submit a form */
	submit?: boolean;
	/** Allows extra classes to be added to the button, such as margins */
	className?: string;
	/** The loading state of the button */
	isLoading?: boolean;
}

export const getButtonClasses = (
	variant: "primary" | "secondary",
	size: "compact" | "regular",
	isDisabled?: boolean,
	fullWidth?: boolean,
	className?: string,
	isLoading?: boolean
): string =>
	clsx(
		"items-center justify-center gap-x-3  text-center inline-block relative font-medium rounded ",
		{
			"py-2 px-8 sm:py-2 min-h-[2.125rem] sm:min-h-14": size === "regular",
			"px-3 py-[0.375rem] text-subhead h-auto": size === "compact",
			"bg-red text-white": variant === "primary",
			"box-border border-2 border-red bg-white text-red":
				variant === "secondary",
			"hover:border-red hover:bg-red hover:text-white hover:not-focused:ring-1 hover:not-focused:ring-inset hover:not-focused:ring-red":
				variant === "secondary" && !isDisabled,
			"block w-full": fullWidth,
			"cursor-default opacity-60 ": isLoading || isDisabled,
		},
		className
	);

const Button = forwardRef<HTMLButtonElement, ButtonProperties>(
	(
		{
			text,
			onClick,
			isDisabled = false,
			submit = false,
			variant = "primary",
			size = "regular",
			fullWidth = false,
			className,
			isLoading = false,
			...restProperties
		},
		reference
	): ReactElement => {
		return (
			<button
				type={submit ? "submit" : "button"}
				className={getButtonClasses(
					variant,
					size,
					isDisabled,
					fullWidth,
					className,
					isLoading
				)}
				onClick={onClick}
				disabled={isDisabled || isLoading}
				ref={reference}
				{...restProperties}>
				{isLoading ? <Spinner className="opacity-70" /> : undefined}

				<span className={clsx({ invisible: isLoading })}>{text}</span>
				{isLoading ? (
					<span className="sr-only" role="alert">
						loading
					</span>
				) : undefined}
			</button>
		);
	}
);

export default Button;
