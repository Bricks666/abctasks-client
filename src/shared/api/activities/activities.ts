import { fetcher } from '@/shared/packages';
import { StandardResponse } from '@/shared/types';
import { Activity } from './types';

const activitiesFetcher = fetcher.create({
	baseURL: 'activities',
});

export const getAll = async (roomId: number) => {
	return activitiesFetcher.get<StandardResponse<Activity[]>>({
		path: {
			url: roomId,
		},
	});
};
