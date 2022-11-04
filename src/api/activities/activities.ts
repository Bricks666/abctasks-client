import { fetcher } from '@/packages/request';
import { Activity } from '@/models/activities';
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
