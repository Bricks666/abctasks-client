import { PaginationResponse, StandardResponse } from '@/shared/types';
import { instance, normalizeQuery } from '../request';
import {
	Activity,
	ActivityAction,
	ActivitySphere,
	GetActivitiesInRoomParams
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
