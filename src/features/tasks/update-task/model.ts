import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { combine, createDomain, createEvent, sample } from 'effector';
import { not } from 'patronum';

import { taskModel, tasksInRoomModel } from '@/entities/tasks';

import { UpdateTaskParams, Task, tasksApi, task } from '@/shared/api';
import { getParams, i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel, createQueryModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { taskFormModel } from '../form';

const updateTaskDomain = createDomain();

const handlerFx = updateTaskDomain.effect(tasksApi.update);

export const mutation = createMutation<
	UpdateTaskParams,
	StandardResponse<Task>,
	StandardResponse<Task>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(task)),
});

export const popupControls = createPopupControlModel(popupsMap.updateTask);
export const taskId = createQueryModel<number | null>({
	name: getParams.taskId,
	defaultValue: null,
});
export const openPopup = createEvent<number>();

const $routeParams = combine(
	taskId.$value,
	routes.room.tasks.$params,
	(id, params) => ({ id: Number(id), roomId: params.id, })
);

export const form = taskFormModel.create();

const { formValidated, setInitialForm, reset, } = form;

sample({
	clock: openPopup,
	target: popupControls.open,
});

sample({
	clock: openPopup,
	target: taskId.set,
});

sample({
	clock: popupControls.closed,
	target: taskId.reset,
});

sample({
	clock: popupControls.close,
	target: [taskId.reset!, reset],
});

sample({
	clock: mutation.finished.success,
	target: popupControls.close,
});

sample({
	clock: popupControls.opened,
	source: $routeParams,
	target: taskModel.query.start,
});

sample({
	clock: formValidated,
	source: $routeParams,
	filter: not(taskId.$isEmpty),
	fn: (routeParams, values) => {
		return { ...values, ...routeParams, };
	},
	target: mutation.start,
});

sample({
	clock: taskModel.query.finished.success,
	fn: ({ result, }) => {
		const { tags, ...rest } = result;

		return {
			...rest,
			tagIds: tags.map((tag) => tag.id),
		};
	},
	target: setInitialForm,
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
		message: i18n.t('actions.update_task.notifications.success', {
			ns: 'tasks',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.update_task.notifications.error', { ns: 'tasks', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
