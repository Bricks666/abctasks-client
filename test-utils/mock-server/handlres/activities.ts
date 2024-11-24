/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { actions, activities, spheres } from '../../fixtures';
import { BASE_URL } from '../constants';
import {
	createPaginationResponse,
	createStandardResponse,
	createUrl
} from '../utils';

const baseUrl = createUrl(BASE_URL, 'activities');
const getAllUrl = createUrl(baseUrl, ':roomId');
const getActionsUrl = createUrl(baseUrl, 'actions', 'all');
const getSpheresUrl = createUrl(baseUrl, 'spheres', 'all');

function filterActivities(
	roomId: string,
	actionIds: string[],
	sphereIds: string[],
	activistIds: string[]
) {
	return activities.filter((activity) => {
		return (
			activity.roomId === +roomId &&
			(actionIds.length
				? actionIds.includes(activity.action.id.toString())
				: true) &&
			(sphereIds.length
				? sphereIds.includes(activity.sphere.id.toString())
				: true) &&
			(activistIds.length
				? activistIds.includes(activity.activist.id.toString())
				: true)
		);
	});
}

export const success = {
	getActions: http.get(getActionsUrl, () => {
		return createStandardResponse(actions);
	}),
	getSpheres: http.get(getSpheresUrl, () => {
		return createStandardResponse(spheres);
	}),
	getAll: http.get(getAllUrl, ({ params, request, }) => {
		const { roomId, } = params;
		const url = new URL(request.url);
		const actionIds = (url.searchParams.getAll('actionIds') ?? []) as string[];
		const sphereIds = (url.searchParams.getAll('sphereIds') ?? []) as string[];
		const activistIds = (url.searchParams.getAll('activistIds') ??
			[]) as string[];

		const filtered = filterActivities(
			roomId as string,
			actionIds,
			sphereIds,
			activistIds
		);

		return createPaginationResponse(filtered);
	}),
};

export const standard = Object.values(success);
