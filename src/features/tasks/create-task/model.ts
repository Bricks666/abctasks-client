import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, createEvent, createStore, sample } from 'effector';

import { createPopupControlModel } from '@/entities/popups';
import { tasksInRoomModel } from '@/entities/tasks';

import {
	CreateTaskParams,
	Task,
	tasksApi,
	task,
	TaskStatus
} from '@/shared/api';
import { controls, getParams, i18n, popupsMap, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { taskFormModel } from '../form';

const createTaskDomain = createDomain();

const handlerFx = createTaskDomain.effect<
	CreateTaskParams,
	StandardResponse<Task>,
	Error
>(tasksApi.create);

export const mutation = createMutation<
	CreateTaskParams,
	StandardResponse<Task>,
	StandardResponse<Task>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(task)),
});

export const form = taskFormModel.create();

export const popupControls = createPopupControlModel(popupsMap.createTask);

export const $status = createStore<TaskStatus | null>(null);
export const openPopup = createEvent<TaskStatus>();

const { reset, formValidated, } = form;

querySync({
	controls,
	source: {
		[getParams.taskStatus]: $status,
	},
});

sample({
	clock: openPopup,
	target: popupControls.open,
});

sample({
	clock: openPopup,
	target: $status,
});

sample({
	clock: popupControls.closed,
	target: $status.reinit!,
});

sample({
	clock: popupControls.closed,
	target: tasksInRoomModel.$status.reinit!,
});

sample({
	clock: popupControls.closed,
	target: reset,
});

sample({
	clock: mutation.finished.success,
	target: popupControls.close,
});

sample({
	clock: formValidated,
	source: routes.room.tasks.$params,
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: mutation.start,
});

sample({
	clock: popupControls.opened,
	source: tasksInRoomModel.$status,
	filter: Boolean,
	fn: (status) => ({ status, }),
	target: form.setInitialForm,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.create_task.notifications.success', {
			ns: 'tasks',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.create_task.notifications.error', { ns: 'tasks', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
