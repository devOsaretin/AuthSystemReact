import React from "react";
import { CloudSlash } from "phosphor-react";

const NotFound = () => {
	return (
		<div className="w-full h-screen grid place-items-center bg-new-grey">
			<div className="flex flex-col shadow-lg max-w-[400px] px-4 items-center rounded-lg bg-white py-4 w-[90%]">
				<CloudSlash size={68} className="text-grey inline-block mb-2" />
				<div className="text-xl font-poppins font-extrabold">404</div>
				<div className="text-grey font-extrabold font-poppins">
					Page not found.
				</div>
			</div>
		</div>
	);
};

export default NotFound;
