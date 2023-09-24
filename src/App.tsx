import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
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
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
