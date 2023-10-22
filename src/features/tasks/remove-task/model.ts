import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Literal } from 'runtypes';

import { tasksInRoomModel } from '@/entities/tasks';

import { RemoveTaskParams, tasksApi } from '@/shared/api';
import { i18n } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeTaskDomain = createDomain();

const handlerFx = removeTaskDomain.effect<
	RemoveTaskParams,
	StandardResponse<boolean>,
	Error
>(tasksApi.remove);

export const mutation = createMutation<
	RemoveTaskParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
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
