import queryString from 'query-string';

import { instance } from '../request';

import {
	GetActivitiesInRoomRequestParams,
	GetActivitiesInRoomResponseData,
	GetActivityActionsResponseData,
	GetActivitySpheresResponseData
} from './types';

export const getAll = async (
	{ roomId, ...query }: GetActivitiesInRoomRequestParams,
	options?: globalThis.RequestInit
): GetActivitiesInRoomResponseData => {
	return instance
		.get(`activities/${roomId}`, {
			...options,
			searchParams: new URLSearchParams(queryString.stringify(query)),
		})
		.json();
};

export const getActions = async (
	options?: globalThis.RequestInit
): GetActivityActionsResponseData => {
	return instance.get('activities/actions/all', options).json();
};

export const getSpheres = async (
	options?: globalThis.RequestInit
): GetActivitySpheresResponseData => {
	return instance.get('activities/spheres/all', options).json();
};
