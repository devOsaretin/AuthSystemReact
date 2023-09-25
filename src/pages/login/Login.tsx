import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../features/thunks/auth";
import TextInputField from "../../components/input/TextInput/TextInputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInputField from "../../components/input/PasswordField/PasswordInputField";
import Button from "../../components/input/Button/Button";
import Info from "../../components/Feedback/Info/Info";
import { clearErrors } from "../../features/auth/authSlice";
import LeftPageBanner from "../../components/commons/LeftPageBanner/LeftPageBanner";

type LoginFormValues = {
	email: string;
	password: string;
};

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const Login = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, isLoading, isError, errorMessage } = useAppSelector(
		state => state.auth
	);

	useEffect(() => {
		dispatch(clearErrors());
	}, [location, clearErrors]);

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

	return (
		<div className="w-full h-screen md:grid md:grid-cols-2">
			<LeftPageBanner />
			<div className=" grid place-items-center pt-14 md:pt-0">
				<div className=" w-full md:max-w-[400px] md:w-full px-4">
					<h2 className="mb-8 font-poppins font-bold text-grey text-xl">
						WELCOME BACK
					</h2>
					<h2 className="mb-8 font-poppins font-bold text-grey text-sm">
						LOGIN
					</h2>
					<div className="my-3">
						{isError && errorMessage && (
							<Info type="error" text={errorMessage} />
						)}
					</div>
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
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
