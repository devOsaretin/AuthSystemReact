import React from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { login } from "./features/auth/authSlice";

function App() {
	const token = useAppSelector(state => state.auth.token);
	return (
		<div>
			<h2>Authentication System</h2>
		</div>
	);
}

export default App;
