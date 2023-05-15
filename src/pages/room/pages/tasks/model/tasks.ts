import { querySync } from 'atomic-router';
import { sample } from 'effector';
import { dragTaskModel } from '@/widgets/tasks/model';
import { tasksFiltersModel, updateTaskModel } from '@/features/tasks';
import { tasksInRoomModel } from '@/entities/tasks';
import { UpdateTaskParams } from '@/shared/api';
import { controls, getParams } from '@/shared/configs';
import { currentRoute, loaded, loadedWithRouteState } from './page';

const { formValidated, setForm, reset, fields, } = tasksFiltersModel.form;

/**
 * TODO: Сделать обертку над роутом, чтобы отслеживать отдельно изменения параметров
 */
sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	fn: ({ params, query, }) => ({
		roomId: params.id,
		authorIds: query[getParams.userId],
		tagIds: query[getParams.userId],
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
		[getParams.userId]: fields.authorIds.$value,
		[getParams.tagId]: fields.tagIds.$value,
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
		authorIds: query[getParams.userId],
		tagIds: query[getParams.userId],
		before: query[getParams.before],
		after: query[getParams.after],
	}),
	target: setForm,
});

sample({
	clock: dragTaskModel.dropped,
	source: { id: dragTaskModel.$id, params: currentRoute.$params, },
	fn: ({ id, params, }, evt) => {
		const { status, } = evt.currentTarget.dataset;
		return {
			id,
			roomId: params.id,
			status,
		} as UpdateTaskParams;
	},
	target: updateTaskModel.mutation.start,
});
