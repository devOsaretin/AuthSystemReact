import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import FullPageSpinner from "../../components/Feedback/Spinner/FullPageSpinner";
import { SignOut } from "phosphor-react";
import ImageCarousel from "../../components/ImageCarousel/ImageCorousel";

const Profile = () => {
	const dispatch = useAppDispatch();

	const { authUser, isLoading } = useAppSelector(state => state.auth);

	if (isLoading) {
		return <FullPageSpinner />;
	}

	return (
		<div className="w-full h-screen grid place-items-center bg-new-grey relative">
			<div className="absolute top-12 right-12">
				<button
					onClick={() => dispatch(logout())}
					className="rounded-full bg-error p-2 shadow-md">
					<SignOut size={24} className="text-white" />
				</button>
			</div>
			<div className="flex flex-col max-w-[400px] gap-3 px-4 items-center py-4 w-[90%]">
				<div>
					<img
						src={authUser?.avatar}
						className="rounded-full border-4 border-white w-32 h-32"
					/>
				</div>
				<div className="font-poppins text-base font-medium text-grey">
					{authUser && authUser.fullName}
				</div>
				{authUser?.photos.length && (
					<div className="flex flex-col items-center">
						<p className="my-2 text-sm font-extrabold font-poppins">PHOTOS</p>
						<ImageCarousel photos={authUser.photos} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
