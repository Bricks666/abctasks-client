import { fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import { Progress } from './types';

const progressFetcher = fetcher.create({
	baseURL: 'progress',
});

export const getAll = async (roomId: number) => {
	return progressFetcher.get<StandardResponse<Progress[]>>({
		path: {
			url: roomId,
		},
	});
};
