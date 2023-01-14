import { querySync } from 'atomic-router';
import { sample } from 'effector';
import { debounce } from 'patronum';
import { tasksFiltersModel } from '@/features/tasks';
import { tasksInRoomModel } from '@/entities/tasks';
import { routes, controls, getParams } from '@/shared/configs';
import { loaded, loadedWithRouteState } from './page';

const { $values, setForm, reset, fields, } = tasksFiltersModel.form;
const currentRoute = routes.room.tasks;
/**
 * TODO: Вынести в модель уведомлений
 */

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	fn: ({ params, query, }) => ({
		roomId: params.id,
		authorId: query[getParams.userId],
		groupId: query[getParams.userId],
		before: query[getParams.before],
		after: query[getParams.after],
	}),
	target: tasksInRoomModel.query.start,
});

const valuesChanged = debounce({
	source: $values,
	timeout: 250,
});

sample({
	clock: valuesChanged,
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
	clock: [valuesChanged],
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
