import { fetcher } from '@/shared/lib';
import { PaginationResponse, StandardResponse } from '@/shared/types';
import {
	Activity,
	ActivityAction,
	ActivitySphere,
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
	return activitiesFetcher.get<StandardResponse<PaginationResponse<Activity>>>({
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
	return activitiesFetcher.get<StandardResponse<PaginationResponse<Activity>>>({
		path: {
			url: roomId,
			query: {
				count,
			},
		},
	});
};

export const getActions = async () => {
	return activitiesFetcher.get<StandardResponse<ActivityAction[]>>({
		path: {
			url: 'actions/all',
		},
	});
};

export const getSpheres = async () => {
	return activitiesFetcher.get<StandardResponse<ActivitySphere[]>>({
		path: {
			url: 'spheres/all',
		},
	});
};
