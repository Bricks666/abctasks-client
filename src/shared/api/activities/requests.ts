import { PaginationResponse, StandardResponse } from '@/shared/types';

import { instance, normalizeQuery } from '../request';

import {
	ActivityDto,
	ActivityActionDto,
	ActivitySphereDto,
	GetActivitiesInRoomParams
} from './types';

export const getAll = async (
	{ roomId, ...query }: GetActivitiesInRoomParams,
	signal?: AbortSignal
) => {
	return instance
		.get(`activities/${roomId}`, {
			searchParams: new URLSearchParams(normalizeQuery(query)),
			signal,
		})
		.json<StandardResponse<PaginationResponse<ActivityDto>>>();
};

export const getActions = async (signal?: AbortSignal) => {
	return instance
		.get('activities/actions/all', { signal, })
		.json<StandardResponse<ActivityActionDto[]>>();
};

export const getSpheres = async (signal?: AbortSignal) => {
	return instance
		.get('activities/spheres/all', { signal, })
		.json<StandardResponse<ActivitySphereDto[]>>();
};
