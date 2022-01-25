import axios from "axios";

export const instance = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

instance.interceptors.response.use(
	(response) => {
		const data = response.data;
		if ("accessToken" in data) {
			instance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
		}
		return response;
	},
	async (err) => {
		if (err.response.status === 403) {
			debugger;
			console.log(err);
		}

		return err;
	}
);
