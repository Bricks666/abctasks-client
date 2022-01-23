import axios from "axios";

export const instance = axios.create({
	baseURL: "http://localhost:5001",
	withCredentials: true,
});

instance.interceptors.response.use(
	(response) => response,
	async (err) => {
		const originalRequest = err.config;

		if (err.response.status === 403) {
			console.log(err);
		}
	}
);
