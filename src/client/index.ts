import axios from "axios";
const token = sessionStorage.getItem("token");
const api = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		Authorization: `Bearer ${token}`,
	},
});

export default api;
