import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useFetchAuthUserQuery } from "../../services/authentication";
import { useAppSelector } from "../../app/hooks";

interface ProtectedRoute {
	redirect?: string;
	children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: FC<ProtectedRoute> = ({
	redirect = "/login",
	children,
}) => {
	const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to={{ pathname: redirect }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
