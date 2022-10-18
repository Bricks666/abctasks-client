import { SSEListener } from '@/packages/eventSource';

export const baseURL = `http://${import.meta.env.VITE_API_HOST}:5000/api`;

export const sseListener = new SSEListener({
	baseURL,
	withCredentials: true,
});
