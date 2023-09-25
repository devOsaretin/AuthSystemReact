import clsx from "clsx";
import React from "react";

const LeftPageBanner = ({ className }: { className?: string }) => {
	return (
		<div
			className={clsx(
				"relative md:bg-[url('https://res.cloudinary.com/osaretin-dev/image/upload/v1695546844/bg_y3na05.jpg')] md:bg-cover md:bg-center md:h-screen",
				className
			)}>
			<div className="absolute w-full h-full top-0 left-0 bg-black opacity-80 z-0"></div>
			<div className="grid place-items-center h-full z-50 relative">
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
			</div>
		</div>
	);
};

export default LeftPageBanner;
