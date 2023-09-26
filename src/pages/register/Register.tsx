import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInputField from "../../components/input/TextInput/TextInputField";
import Button from "../../components/input/Button/Button";
import PasswordInputField from "../../components/input/PasswordField/PasswordInputField";
import DropZone from "../../components/DropZone/DropZone";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register as actionRegister } from "../../features/thunks/auth";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";
import { clearErrors } from "../../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";
import LeftPageBanner from "../../components/commons/LeftPageBanner/LeftPageBanner";
import Info from "../../components/Feedback/Info/Info";
import { generateUniqueId } from "../../utils";

type RegisterFormValues = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
};
type ExtendedFile = File & {
	thumbnail?: string;
	id: string;
};

const schema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, "First Name must be at least 2 characters")
		.max(25, "First Name must not exceed 25 characters")
		.required("First Name is required"),
	lastName: yup
		.string()
		.min(2, "Last Name must be at least 2 characters")
		.max(25, "Last Name must not exceed 25 characters")
		.required("Last Name is required"),
	role: yup.string().required(),
	email: yup
		.string()
		.email("Invalid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must not exceed 50 characters")
		.matches(/^(?=.*\d)/, "Password must contain at least one numeric digit")
		.required("Password is required"),
});

const Register = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const { isLoading: stateLoading, isError, errorMessage } = useAppSelector(
		state => state.auth
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: yupResolver(schema),
	});

	const [files, setFiles] = useState<ExtendedFile[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
	const [uploadValidationError, setUploadValidationError] = useState<
		string | undefined
	>(undefined);

	const isFileUploadValid = files.length >= 4;
	const hasErrors = Object.keys(errors).length > 0;

	const removeFileHandler = (fileId: string) => {
		setFiles(files => files.filter((file, _index) => file.id !== fileId));
	};

	useEffect(() => {
		dispatch(clearErrors());
	}, [location, clearErrors]);

	useEffect(() => {
		if (hasErrors && !isFileUploadValid) {
			setUploadValidationError("Please upload atleast 4 images");
		}
		if (isFileUploadValid) {
			setUploadValidationError(undefined);
		}
	}, [hasErrors, isFileUploadValid, removeFileHandler]);

	useEffect(() => {
		return () =>
			files.forEach(file => URL.revokeObjectURL(file.thumbnail as string));
	}, [files]);

	const onDropFileHandler = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles?.length) {
			setFiles(previousFiles => [
				...previousFiles,
				...acceptedFiles.map(file =>
					Object.assign(file, {
						thumbnail: URL.createObjectURL(file),
						id: generateUniqueId(),
					})
				),
			]);
		}
	}, []);

	const registerHandler = (data: RegisterFormValues) => {
		if (!isFileUploadValid) {
			setUploadValidationError("Please upload atleast 4 images");
			return;
		}

		setIsLoading(true);
		let formData = new FormData();
		files.forEach(file => {
			formData.append("files", file, file.name);
		});

		formData.append("firstName", data.firstName);
		formData.append("lastName", data.lastName);
		formData.append("email", data.email);
		formData.append("role", data.role);
		formData.append("password", data.password);

		dispatch(actionRegister(formData)).then(response => {
			if (response.payload === 201) {
				setIsRegistrationSuccess(true);
			}
			setIsLoading(false);
		});
	};

	if (isRegistrationSuccess) {
		return <RegistrationSuccess />;
	}

	return (
		<div className="w-full h-screen md:grid md:grid-cols-2">
			<LeftPageBanner className="md:bg-[url('https://res.cloudinary.com/osaretin-dev/image/upload/v1695565623/markus-spiske-wL7pwimB78Q-unsplash_lcca7c.jpg')]" />
			<div className=" grid place-items-center pt-14 md:pt-0 md:overflow-y-scroll">
				<div className=" w-full md:max-w-[400px] md:w-full px-4">
					<h2 className="mb-8 font-poppins font-bold text-grey text-xl">
						DON'T HAVE AN ACCOUNT?
					</h2>
					<h2 className="mb-8 font-poppins font-bold text-grey text-sm">
						REGISTER
					</h2>
					<div className="my-3">
						{isError && errorMessage && (
							<Info type="error" text={errorMessage} />
						)}
					</div>
					<div>
						<div className="mb-4">
							<TextInputField
								id="firstname-input"
								type="text"
								placeholder="First Name"
								{...(errors.firstName && { error: true })}
								{...register("firstName")}
								errorText={errors.firstName && errors.firstName.message}
							/>
						</div>
						<div className="mb-4">
							<TextInputField
								id="lastname-input"
								type="text"
								placeholder="Last Name"
								{...(errors.lastName && { error: true })}
								{...register("lastName")}
								errorText={errors.lastName && errors.lastName.message}
							/>
						</div>

						<div className="mb-4">
							<TextInputField
								id="role-input"
								type="text"
								placeholder="Role"
								{...(errors.role && { error: true })}
								{...register("role")}
								errorText={errors.role && errors.role.message}
							/>
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
						<div className="mb-8">
							<DropZone
								className="p-4"
								onDrop={onDropFileHandler}
								onRemove={removeFileHandler}
								files={files}
								multiple
							/>
							{uploadValidationError && (
								<Info text={uploadValidationError} type="error" />
							)}
						</div>
					</div>
					<div className="my-3">
						<Button
							text="Register"
							variant="primary"
							size="compact"
							fullWidth
							onClick={handleSubmit(registerHandler)}
							isLoading={isLoading || stateLoading}
							type="submit"
						/>
					</div>
					<div className="mb-8">
						<Link to="/login" className="text-sm underline">
							Already registered? Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
