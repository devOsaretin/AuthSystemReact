import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Profile = () => {
	const dispatch = useAppDispatch();
	const { authUser, isAuthenticated, isLoading } = useAppSelector(
		state => state.auth
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <div>Profile for: {authUser && authUser.fullName}</div>;
};

export default Profile;
