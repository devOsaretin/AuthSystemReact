import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { useAppDispatch } from "./app/hooks";
import { getAuthUser } from "./features/thunks/auth";
import NotFound from "./pages/404/NotFound";
import MswToggler from "./mocks/MswToggler";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(getAuthUser());
		}
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute redirect="/login">
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<MswToggler />
		</>
	);
}

export default App;
