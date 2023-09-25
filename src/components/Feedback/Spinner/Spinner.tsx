import clsx from "clsx";
import { CircleNotch } from "phosphor-react";

const Spinner = ({ className }: { className?: string }) => {
	return (
		<CircleNotch
			data-testid="spinner"
			size={32}
			className={clsx(
				"absolute top-0 bottom-0 left-0 right-0 m-auto animate-spin",
				className && className
			)}
		/>
	);
};

export default Spinner;
