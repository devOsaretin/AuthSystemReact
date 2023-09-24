import React, { useEffect } from "react";
import { useLoginMutation } from "../../services/authentication";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../features/thunks/auth";

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { authUser, isAuthenticated, isLoading } = useAppSelector(
		state => state.auth
	);

	const handleLogin = async () => {
		dispatch(login({ email: "ezra@email.com", password: "password123" }));
	};

	if (isLoading) return <h1>Loading</h1>;

	if (isAuthenticated) return <Navigate to="/profile" />;

	return (
		<div>
			<h2>Login</h2>
			<button onClick={handleLogin}>Login</button>
			<button onClick={() => dispatch(logout())}>Logout</button>
		</div>
	);
};

export default Login;
