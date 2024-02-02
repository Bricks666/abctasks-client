import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, createStore, sample } from 'effector';
import { Literal } from 'runtypes';

import { tasksInRoomModel } from '@/entities/tasks';

import { RemoveTaskParams, tasksApi } from '@/shared/api';
import { i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeTaskDomain = createDomain();

const handlerFx = removeTaskDomain.effect<
	RemoveTaskParams,
	StandardResponse<boolean>,
	Error
>(tasksApi.remove);

const $id = createStore<number | null>(null);

export const popupControls = createPopupControlModel({
	name: popupsMap.removeTask,
	sync: false,
});

export const openConfirm = createEvent<number>();
export const remove = createEvent();

export const mutation = createMutation<
	RemoveTaskParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

sample({
	clock: openConfirm,
	target: [popupControls.open, $id],
});

sample({
	clock: remove,
	source: {
		id: $id,
		roomId: routes.room.tasks.$params.map((params) => params.id),
	},
	filter: ({ id, roomId, }) => !!id && !!roomId,
	fn: ({ roomId, id, }) => {
		return {
			roomId,
			id,
		} as RemoveTaskParams;
	},
	target: mutation.start,
});

sample({
	clock: popupControls.closed,
	target: $id.reinit!,
});

sample({
	clock: mutation.finished.finally,
	target: popupControls.close,
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
				result: query.result.filter((task) => task.id !== mutation.params.id),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.remove_task.notifications.success', {
			ns: 'tasks',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.remove_task.notifications.error', { ns: 'tasks', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
