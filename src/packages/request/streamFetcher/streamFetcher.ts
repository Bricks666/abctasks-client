import { baseURL } from '@/const';
import { BaseFetcher } from '../base';

export class StreamFetcher extends BaseFetcher {}

export const streamFetcher = new StreamFetcher({
	baseURL,
});
