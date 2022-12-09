import { fetcher } from '@/packages';
import { Progress } from '@/models';
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
