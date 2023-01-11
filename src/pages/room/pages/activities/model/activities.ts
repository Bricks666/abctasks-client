import { querySync } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';
import { debounce, debug } from 'patronum';
import { activitiesFiltersModel } from '@/features/activities';
import { activitiesModel } from '@/entities/activities';
import { GetActivitiesInRoomParams } from '@/shared/api';
import { routes, controls } from '@/shared/configs';
import { loaded, loadedWithRouteState } from './page';

const currentRoute = routes.room.activities;

const $page = createStore<null | string>(null);
export const pageChanged = createEvent<null | number>();

const { $values, fields, setForm, } = activitiesFiltersModel.form;
const activitiesFiltersChanges = debounce({
	source: $values,
	timeout: 250,
});

sample({
	clock: pageChanged,
	fn: (page) => page as string | null,
	target: $page,
});

sample({
	clock: activitiesFiltersChanges,
	fn: () => null,
	target: pageChanged,
});

sample({
	clock: [activitiesFiltersChanges, pageChanged],
	source: {
		params: currentRoute.$params,
		values: $values,
		page: $page,
	},
	fn: ({ params, values, page, }): GetActivitiesInRoomParams => ({
		roomId: params.id,
		page: page ? Number(page) : 1,
		...values,
	}),
	target: activitiesModel.query.start,
});

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	fn: ({ params, query, }): GetActivitiesInRoomParams => ({
		roomId: params.id,
		activistId: query.activistId,
		action: query.action,
		after: query.after,
		before: query.before,
		count: query.count,
		page: query.page,
		sphereName: query.sphereName,
	}),
	target: activitiesModel.query.start,
});

sample({
	clock: currentRoute.closed,
	target: activitiesFiltersModel.form.reset,
});

querySync({
	controls,
	source: {
		page: $page,
	},
	clock: pageChanged,
	route: currentRoute,
});

querySync({
	controls,
	source: {
		activistId: fields.activistId.$value,
		action: fields.action.$value,
		after: fields.after.$value,
		before: fields.before.$value,
		sphereName: fields.sphereName.$value,
	},
	clock: [activitiesFiltersChanges],
	route: currentRoute,
});

sample({
	clock: loaded,
	source: controls.$query,
	target: setForm,
});

debug($page);
