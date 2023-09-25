import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAuthUser } from "../../features/thunks/auth";

interface ProtectedRoute {
	redirect?: string;
	children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: FC<ProtectedRoute> = ({ redirect, children }) => {
	const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getAuthUser());
		}
	}, [isAuthenticated]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated && !isLoading) {
		return <Navigate to={{ pathname: redirect }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
