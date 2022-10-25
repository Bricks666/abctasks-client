import { SSEListener } from '@/packages/eventSource';
import { api } from '@/const';

export const sseListener = new SSEListener({
	baseURL: api.api,
	withCredentials: true,
});
