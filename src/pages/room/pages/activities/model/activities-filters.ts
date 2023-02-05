import { querySync } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';
import { activitiesFiltersModel } from '@/features/activities';
import { activitiesInRoomModel } from '@/entities/activities';
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
		activistId: query[getParams.userId],
		action: query[getParams.action],
		after: query[getParams.after],
		before: query[getParams.before],
		sphereName: query[getParams.sphereName],
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
		[getParams.userId]: fields.activistId.$value,
		[getParams.action]: fields.action.$value,
		[getParams.after]: fields.after.$value,
		[getParams.before]: fields.before.$value,
		[getParams.sphereName]: fields.sphereName.$value,
	},
	clock: formApplied,
	route: currentRoute,
});

sample({
	clock: loaded,
	source: controls.$query,
	fn: (query) => ({
		activistId: query[getParams.userId],
		action: query[getParams.action],
		after: query[getParams.after],
		before: query[getParams.before],
		sphereName: query[getParams.sphereName],
		count: query[getParams.count],
		page: query[getParams.page],
	}),
	target: setForm,
});
