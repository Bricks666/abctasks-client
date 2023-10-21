import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, sample } from 'effector';
import { Boolean } from 'runtypes';

import { usersInRoomModel } from '@/entities/users';

import { membersApi } from '@/shared/api';
import { i18nModel, notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(membersApi.remove);

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
});

update(usersInRoomModel.query, {
	on: mutation,
	by: {
		success: ({ mutation, query, }) => {
			if (!query) {
				return {
					result: [],
					refetch: true,
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
					refetch: true,
				};
			}

			return {
				result: query.result.filter(
					(user) => user.id !== mutation.params.userId
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('action.remove_user.notifications.success', {
			ns: 'room-users',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('action.remove_user.notifications.error', { ns: 'room-users', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
