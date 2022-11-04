import { Progress } from '@/models/progress';
import { fetcher } from '@/packages/request';
import { StandardResponse } from '@/types';

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
