import { Progress } from '@/shared/models';
import { fetcher } from '@/shared/packages';
import { StandardResponse } from '@/shared/types';

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
