import React from "react";
import Button from "../../components/input/Button/Button";
import { CheckCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full h-screen grid place-items-center bg-new-grey">
			<div className="flex flex-col shadow-lg max-w-[400px] gap-3 px-4 items-center rounded-lg bg-white py-4 w-[90%]">
				<CheckCircle size={68} className="text-red inline-block mb-11" />
				<div className="text-grey font-extrabold font-poppins">
					Registration was successful!
				</div>
				<div className="my-3 w-full">
					<Button
						text="Login"
						variant="primary"
						size="compact"
						fullWidth
						onClick={() => navigate("/login")}
						type="submit"
					/>
				</div>
			</div>
		</div>
	);
};

export default RegistrationSuccess;
