import { fetcher } from '@/shared/lib';
import { InRoomParams, StandardResponse } from '@/shared/types';
import { Progress } from './types';

const progressFetcher = fetcher.create({
	baseURL: 'progress',
});

export const getAll = async ({ roomId, }: InRoomParams) => {
	return progressFetcher.get<StandardResponse<Progress[]>>({
		path: {
			url: roomId,
		},
	});
};
