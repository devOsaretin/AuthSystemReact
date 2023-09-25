import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuthUser, login } from "../../features/thunks/auth";
import TextInputField from "../../components/input/TextInput/TextInputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInputField from "../../components/input/PasswordField/PasswordInputField";
import Button from "../../components/input/Button/Button";
import Info from "../../components/Feedback/Info/Info";

type LoginFormValues = {
	email: string;
	password: string;
};

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, isLoading, isError, errorMessage } = useAppSelector(
		state => state.auth
	);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated]);

	const handleLogin = async (data: LoginFormValues) => {
		dispatch(login({ email: data.email, password: data.password }));
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: yupResolver(loginSchema),
	});

	if (isLoading) return <h1>Loading</h1>;

	//if (isAuthenticated) return <Navigate to="/profile" />;

	return (
		<div className="w-full h-screen md:grid md:grid-cols-2">
			<div className="relative md:bg-[url('https://res.cloudinary.com/osaretin-dev/image/upload/v1695546844/bg_y3na05.jpg')] bg-cover bg-center h-screen">
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
			<div className="">
				<h2>LOGIN</h2>
				<div className="mb-4">
					<TextInputField
						id="email-input"
						type="email"
						placeholder="Email"
						{...(errors.email && { error: true })}
						{...register("email")}
						errorText={errors.email && errors.email.message}
					/>
				</div>
				<div className="mb-8">
					<PasswordInputField
						id="password-input"
						placeholder="password"
						{...(errors.password && { error: true })}
						{...register("password")}
						errorText={errors.password && errors.password.message}
					/>
				</div>
				<div>
					{isError && errorMessage && <Info type="error" text={errorMessage} />}
				</div>

				<div className="my-3">
					<Button
						text="Sign In"
						variant="primary"
						size="compact"
						fullWidth
						onClick={handleSubmit(handleLogin)}
						isLoading={isLoading}
					/>
				</div>

				<div>
					<Button
						text="Create an account"
						variant="secondary"
						size="compact"
						fullWidth
						onClick={() => navigate("/register")}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
