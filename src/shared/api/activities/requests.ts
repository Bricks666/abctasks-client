import { fetcher } from '@/shared/lib';
import { ItemsResponse, StandardResponse } from '@/shared/types';
import {
	Activity,
	GetActivitiesInRoomParams,
	GetLastActivitiesInRoomParams
} from './types';

const activitiesFetcher = fetcher.create({
	baseURL: 'activities',
});

export const getAll = async ({
	roomId,
	...query
}: GetActivitiesInRoomParams) => {
	return activitiesFetcher.get<StandardResponse<ItemsResponse<Activity>>>({
		path: {
			url: roomId,
			query,
		},
	});
};

export const getLast = async ({
	roomId,
	count,
}: GetLastActivitiesInRoomParams) => {
	return activitiesFetcher.get<StandardResponse<ItemsResponse<Activity>>>({
		path: {
			url: roomId,
			query: {
				count,
			},
		},
	});
};
