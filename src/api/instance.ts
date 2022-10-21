import { SSEListener } from '@/packages/eventSource';
import { baseURL } from '@/const/api';

export const sseListener = new SSEListener({
	baseURL,
	withCredentials: true,
});
