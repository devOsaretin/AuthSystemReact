import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

const Profile = () => {
	const dispatch = useAppDispatch();

	const { authUser, isLoading } = useAppSelector(state => state.auth);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className=" max-w-5xl m-auto">
			<div>
				<img src={authUser?.avatar} />
			</div>
			<div>Profile for: {authUser && authUser.fullName}</div>

			<button onClick={() => dispatch(logout())}>Logout</button>
		</div>
	);
};

export default Profile;
