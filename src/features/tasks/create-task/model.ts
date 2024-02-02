import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';

import { tasksInRoomModel } from '@/entities/tasks';

import {
	CreateTaskParams,
	Task,
	tasksApi,
	task,
	TaskStatus
} from '@/shared/api';
import { getParams, i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel, createQueryModel } from '@/shared/lib';
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

export const popupControls = createPopupControlModel({
	name: popupsMap.createTask,
});

export const status = createQueryModel<TaskStatus | null>({
	name: getParams.taskStatus,
	defaultValue: null,
});
export const openPopup = createEvent<TaskStatus>();

const { reset, formValidated, } = form;

sample({
	clock: openPopup,
	target: popupControls.open,
});

sample({
	clock: openPopup,
	target: status.set,
});

sample({
	clock: popupControls.closed,
	target: status.reset,
});

sample({
	clock: popupControls.closed,
	target: status.reset,
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
	source: status.$value,
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
