import { useState } from "react";
import clsx from "clsx";
import { worker } from "./browser";
import { Switch } from "@headlessui/react";

const MswToggler = () => {
	const [mockingEnabled, setMockingEnabled] = useState(
		localStorage.getItem("mswEnabled") === "true"
	);

	const toggleMocking = () => {
		if (mockingEnabled) {
			setMockingEnabled(false);
			localStorage.setItem("mswEnabled", "false");
			worker.stop();
		} else {
			setMockingEnabled(true);
			localStorage.setItem("mswEnabled", "true");
			worker.start({ onUnhandledRequest: "bypass", waitUntilReady: true });
		}
	};

	return (
		<div className="fixed bottom-4 right-4  flex items-center gap-2">
			<span className="text-grey font-poppins">
				{mockingEnabled ? "Mocking ✅" : "Mocking ❌"}
			</span>
			<Switch
				checked={mockingEnabled}
				onChange={toggleMocking}
				className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
				<span className="sr-only">Mocking</span>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute h-full w-full rounded-md "
				/>
				<span
					aria-hidden="true"
					className={clsx(
						mockingEnabled ? "bg-red" : "bg-black",
						"pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
					)}
				/>
				<span
					aria-hidden="true"
					className={clsx(
						mockingEnabled ? "translate-x-5" : "translate-x-0",
						"pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-red shadow ring-0 transition-transform duration-200 ease-in-out"
					)}
				/>
			</Switch>
		</div>
	);
};

export default MswToggler;
