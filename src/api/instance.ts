import axios from "axios";

export const instance = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

const setAccessToken = (accessToken: string) => {
	instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

instance.interceptors.response.use(
	(response) => {
		const data = response.data;
		if ("accessToken" in data) {
			setAccessToken(data.accessToken);
		}
		return response;
	},
	async (err) => {
		const request = err.config;
		if (err?.response?.status === 403 && !request._isRetry) {
			request._isRetry = true;
			const { data } = await instance.get("/auth/refresh");
			if ("accessToken" in data) {
				setAccessToken(data.accessToken);
				request.headers.Authorization = `Bearer ${data.accessToken}`;
				return instance.request(request);
			}
		}

		throw err;
	}
);
