/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { SSEListener } from '@/packages/eventSource';

export const baseURL = 'http://localhost:5000/api';
export let accessToken = '';

export const instance = axios.create({
	baseURL,
	withCredentials: true,
});

const setAccessToken = (token: string) => {
	accessToken = `Bearer ${token}`;
};

instance.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = accessToken;
	}

	return config;
});

instance.interceptors.response.use(
	(response) => {
		const { data } = response;
		if ('accessToken' in data) {
			setAccessToken(data.accessToken);
		}
		return response;
	},
	async (err) => {
		const request = err.config;
		if (err?.response?.status === 403 && !request._isRetry) {
			request._isRetry = true;
			const { data } = await instance.get('/auth/refresh');
			if ('accessToken' in data) {
				setAccessToken(data.accessToken);
				request.headers.Authorization = `Bearer ${data.accessToken}`;
				return instance.request(request);
			}
		}

		throw err;
	}
);

export const sseListener = new SSEListener({
	baseURL,
	withCredentials: true,
});

sseListener.interceptors.beforeOpening.use((config) => {
	config.headers.Authorization = accessToken;

	return config;
});

sseListener.interceptors.beforeError.use(async ({ event, reconnect }) => {
	if (event.status === 403) {
		const { data } = await instance.get('/auth/refresh');
		if ('accessToken' in data) {
			setAccessToken(data.accessToken);
		}
	}
	return { event, reconnect };
});
