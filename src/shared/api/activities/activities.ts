import { Activity } from '@/shared/models';
import { fetcher } from '@/shared/packages';
import { StandardResponse } from '@/shared/types';

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
