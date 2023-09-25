import { CircleNotch } from "phosphor-react";
import clsx from "clsx";

const FullPageSpinner = ({
	withLogo = true,
	withSpinner = true,
	isOpaque = false,
}: {
	withLogo?: boolean;
	withSpinner?: boolean;
	isOpaque?: boolean;
}) => {
	return (
		<>
			{isOpaque && (
				<div
					className={clsx(
						"absolute top-0 left-0 z-[180] min-h-[calc(100vh)] w-[100%] bg-[#111111] font-poppins",
						{ "bg-opacity-50": isOpaque }
					)}
				/>
			)}
			<div
				className={clsx(
					"absolute top-0 left-0 z-[200] min-h-[calc(100vh)] w-[100%] bg-black font-poppins"
				)}>
				<div className="flex h-[100vh] flex-col items-center justify-center gap-2">
					{withSpinner && (
						<CircleNotch
							data-testid="spinner"
							size={withLogo ? 32 : 64}
							className={clsx(" animate-spin text-error")}
						/>
					)}
					{withLogo && (
						<div>
							<span className=" text-white font-bold text-6xl">
								Cobble
								<span className=" inline-block p-3 h-[100px] bg-error ml-2">
									web
								</span>
							</span>
							<div className="text-white text-center my-4">
								Custom Online Marketplace Solutions
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default FullPageSpinner;
