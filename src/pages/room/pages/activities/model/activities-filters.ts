import { querySync } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';
import { activitiesFiltersModel } from '@/features/activities';
import {
	activitiesInRoomModel,
	activityActionsModel,
	activitySpheresModel
} from '@/entities/activities';
import { GetActivitiesInRoomParams } from '@/shared/api';
import { routes, controls, getParams } from '@/shared/configs';
import { loaded, loadedWithRouteState } from './page-load';

const currentRoute = routes.room.activities;

const $page = createStore<null | string>(null);
export const pageChanged = createEvent<null | number>();

const { fields, setForm, formValidated, reset, $values, } =
	activitiesFiltersModel.form;

const formApplied = createEvent<void>();

sample({
	clock: [formValidated, reset],
	target: formApplied,
});

sample({
	clock: pageChanged,
	fn: (page) => page as string | null,
	target: $page,
});

sample({
	clock: formApplied,
	fn: () => null,
	target: $page,
});

sample({
	clock: [formApplied, pageChanged],
	source: {
		params: currentRoute.$params,
		page: $page,
		values: $values,
	},
	fn: ({ params, values, page, }): GetActivitiesInRoomParams => {
		return {
			roomId: params.id,
			...values,
			page: page ? Number(page) : 1,
		};
	},
	target: activitiesInRoomModel.query.start,
});

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	fn: ({ params, query, }): GetActivitiesInRoomParams => ({
		roomId: params.id,
		activistIds: query[getParams.userId],
		actionIds: query[getParams.actionId],
		after: query[getParams.after],
		before: query[getParams.before],
		sphereIds: query[getParams.sphereId],
		count: query[getParams.count],
		page: query[getParams.page],
	}),
	target: activitiesInRoomModel.query.start,
});

sample({
	clock: currentRoute.closed,
	target: activitiesFiltersModel.form.reset,
});

querySync({
	controls,
	source: {
		[getParams.page]: $page,
	},
	route: currentRoute,
});

querySync({
	controls,
	source: {
		[getParams.userId]: fields.activistIds.$value,
		[getParams.actionId]: fields.actionIds.$value,
		[getParams.after]: fields.after.$value,
		[getParams.before]: fields.before.$value,
		[getParams.sphereId]: fields.sphereIds.$value,
	},
	clock: formApplied,
	route: currentRoute,
});

sample({
	clock: loaded,
	source: controls.$query,
	fn: (query) =>
		({
			activistIds: query[getParams.userId],
			actionIds: query[getParams.actionId],
			after: query[getParams.after],
			before: query[getParams.before],
			sphereIds: query[getParams.sphereId],
			count: query[getParams.count],
			page: query[getParams.page],
		} as activitiesFiltersModel.ActivitiesFiltersForm),
	target: setForm,
});

sample({
	clock: activitiesInRoomModel.query.start,
	target: [activityActionsModel.query.start, activitySpheresModel.query.start],
});
