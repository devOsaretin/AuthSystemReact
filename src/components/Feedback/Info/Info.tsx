import clsx from "clsx";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface InfoProps {
	text: string;
	type?: "success" | "error" | "warning";
	className?: string;
}

const Info = ({ text, type = "success", className }: InfoProps) => {
	return (
		<div
			className={clsx(
				"flex w-full items-center gap-2 font-poppins text-[0.75rem] text-grey",
				{
					"text-error": type === "error",
				},
				className
			)}>
			<InformationCircleIcon
				className={clsx(
					"h-6 w-6",
					{ "text-error": type === "error" },
					{ "text-blue": type === "success" }
				)}
			/>

			<span className={clsx({ "text-error": type === "error" })}>{text}</span>
		</div>
	);
};

export default Info;
