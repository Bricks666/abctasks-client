import { querySync } from 'atomic-router';
import { sample } from 'effector';
import { tasksFiltersModel } from '@/features/tasks';
import { tasksInRoomModel } from '@/entities/tasks';
import { controls, getParams } from '@/shared/configs';
import { currentRoute, loaded, loadedWithRouteState } from './page';

const { formValidated, setForm, reset, fields, } = tasksFiltersModel.form;

/**
 * TODO: Сделать обертку над роутом, чтобы отслеживать отдельно изменения параметров
 */
sample({
	clock: [currentRoute.opened, currentRoute.updated, loadedWithRouteState],
	fn: ({ params, query, }) => ({
		roomId: params.id,
		authorId: query[getParams.userId],
		groupId: query[getParams.userId],
		before: query[getParams.before],
		after: query[getParams.after],
	}),
	target: tasksInRoomModel.query.start,
});

sample({
	clock: [formValidated, reset],
	source: currentRoute.$params,
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: tasksInRoomModel.query.start,
});

sample({
	clock: currentRoute.closed,
	target: reset,
});

querySync({
	controls,
	source: {
		[getParams.userId]: fields.authorId.$value,
		[getParams.groupId]: fields.groupId.$value,
		[getParams.after]: fields.after.$value,
		[getParams.before]: fields.before.$value,
	},
	clock: [formValidated, reset],
	route: currentRoute,
});

sample({
	clock: loaded,
	source: controls.$query,
	fn: (query) => ({
		authorId: query[getParams.userId],
		groupId: query[getParams.userId],
		before: query[getParams.before],
		after: query[getParams.after],
	}),
	target: setForm,
});
