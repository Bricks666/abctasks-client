import { Activity } from '@/models';
import { fetcher } from '@/packages';
import { StandardResponse } from '@/types';

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
