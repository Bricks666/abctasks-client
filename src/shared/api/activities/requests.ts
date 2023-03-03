import { PaginationResponse, StandardResponse } from '@/shared/types';
import { instance, normalizeQuery } from '../request';
import {
	Activity,
	ActivityAction,
	ActivitySphere,
	GetActivitiesInRoomParams,
	GetLastActivitiesInRoomParams
} from './types';

export const getAll = async ({
	roomId,
	...query
}: GetActivitiesInRoomParams) => {
	return instance
		.get(`activities/${roomId}`, {
			searchParams: new URLSearchParams(normalizeQuery(query)),
		})
		.json<StandardResponse<PaginationResponse<Activity>>>();
};

export const getLast = async ({
	roomId,
	...query
}: GetLastActivitiesInRoomParams) => {
	return instance
		.get(`activities/${roomId}`, {
			searchParams: query,
		})
		.json<StandardResponse<PaginationResponse<Activity>>>();
};

export const getActions = async () => {
	return instance
		.get('activities/actions/all')
		.json<StandardResponse<ActivityAction[]>>();
};

export const getSpheres = async () => {
	return instance
		.get('activities/spheres/all')
		.json<StandardResponse<ActivitySphere[]>>();
};
