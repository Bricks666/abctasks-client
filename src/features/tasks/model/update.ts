import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { combine, createDomain, sample } from 'effector';
import { and } from 'patronum';

import { createPopupControlModel } from '@/entities/popups';
import { taskModel, tasksInRoomModel } from '@/entities/tasks';

import { UpdateTaskParams, Task, tasksApi, task } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

/**
 * @todo create fabric for form and call it in needed places
 */
import { form } from './form';

const updateTaskDomain = createDomain();

const handlerFx = updateTaskDomain.effect<
	UpdateTaskParams,
	StandardResponse<Task>,
	Error
>(tasksApi.update);

export const mutation = createMutation<
	UpdateTaskParams,
	StandardResponse<Task>,
	StandardResponse<Task>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(task)),
});

export const { close, $isOpen, opened, } = createPopupControlModel(
	popupsMap.updateTask
);

const $routeParams = combine(
	tasksInRoomModel.$id,
	routes.room.tasks.$params,
	(id, params) => ({ id: Number(id), roomId: params.id, })
);

const { fields, formValidated, setForm, reset, } = form;

sample({
	clock: close,
	target: [tasksInRoomModel.$id.reinit!, reset],
});

sample({
	clock: mutation.finished.success,
	target: close,
});

sample({
	clock: opened,
	source: $routeParams,
	target: taskModel.query.start,
});

sample({
	clock: formValidated,
	source: $routeParams,
	filter: and($isOpen, tasksInRoomModel.$id),
	fn: (routeParams, values) => {
		return { ...values, ...routeParams, };
	},
	target: mutation.start,
});

sample({
	clock: taskModel.query.finished.success,
	fn: ({ result, }) => result,
	target: setForm,
});

sample({
	clock: taskModel.query.finished.success,
	fn: () => false,
	target: [
		fields.title.$isDirty,
		fields.description.$isDirty,
		fields.tagIds.$isDirty,
		fields.status.$isDirty
	],
});

update(tasksInRoomModel.query, {
	on: mutation,
	by: {
		success: ({ query, mutation, }) => {
			if (!query) {
				return {
					result: [],
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
				};
			}

			return {
				result: query.result.map((task) =>
					task.id === mutation.result.data.id ? mutation.result.data : task
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: 'Task was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: 'Task was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
